const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


mongoose.connect("mongodb+srv://admin:cZ4J9sfLdgD5n1BS@cluster1.wkfjmj1.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;