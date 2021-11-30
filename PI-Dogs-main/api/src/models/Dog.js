const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,//campor requerido sí o sí
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
    },
    // image:{
    //   type:DataTypes.STRING,
    // },
    createdInDb:{// por si quiero hacer llamado sólo a algo de db
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    }
  });
};
