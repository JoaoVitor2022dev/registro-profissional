const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize2', 'root', 'vitordev123', { 
     host: 'localhost', 
     dialect: "mysql"
});
 
/* try {
  
  sequelize.authenticate();
  console.log('1 - Conectamos com sucesso com o Sequelize !');

} catch (error) {
   console.log(`Nao foi possivel conectar: ${error}`);
} */

module.exports = sequelize