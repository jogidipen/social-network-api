const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
const http = require('http');
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});
//connect db
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.set('debug', true);

app.listen(PORT, () => console.log('\x1b[33m', `🔮 Server started on http://localhost:${PORT}`, "\x1b[00m"));
