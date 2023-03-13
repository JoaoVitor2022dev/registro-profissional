const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn'); 
// conecçao de models 

const User = require('./models/User');

const app = express()

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

// rota para criar usuario
// rota para a url no front-end
app.get('/users/create', ( req , res ) => { 
   res.render('adduser');
}); 

// rota para o back-and 
app.post('/users/create', async ( req , res) => {

  const name = req.body.name; 
  const accupation = req.body.accupation; 
  let newsletter = req.body.newsletter;

  // veriicaçao de binario 
  if (newsletter === 'on') {
     newsletter = true;    
  } else {
    newsletter = false;
  }

  console.log(req.body);
 
  // creaçao do dados asycrona , porque pode demorar um pouco para criar os dados na banco...
  await User.create({ name, accupation , newsletter });

  // redirecionar os dados para url home da pagina...

  res.redirect('/');

});

// rota para usaurio com id

app.get("/users/:id", async (req , res) => {
   
  const id  = req.params.id; 

  const user = await User.findOne({ raw: true, where: {id: id }});

  // redicerionar para a url 
 
  res.render("userview", {  user });

});


app.get('/', async (req, res) => {
  
  const users = await User.findAll({ raw: true });

  console.log(users);
   
  res.render('home', { users }); 
});


// rota de delletar... 

app.post('/users/delete/:id', async ( req , res ) => {
   
  const id = req.params.id; 
  
  await User.destroy({ where: { id: id } }); 

  res.redirect('/');

});

// conection...
conn
  .sync()
  .then(() => {
   app.listen(5000, () => {
      console.log('servidor rodando...');
   })
}).catch((err) => {
  console.log(err);
});
