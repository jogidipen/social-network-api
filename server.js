const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 3001;

//middlware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(apiRoutes);

//connect db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log('\x1b[33m', `🔮 Server started on http://localhost:${PORT}`, "\x1b[00m"));