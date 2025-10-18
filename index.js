const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true },
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Lioli API running'));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(process.env.PORT, () =>
      console.log(`✅ API running on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();