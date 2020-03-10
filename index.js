const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.listen(port, err => {
    if (err) console.log('Server error');
    else console.log(`Server listen on port ${port}`);
});