const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoute = require('./routes/api');

const app = express();

require('dotenv').config({ path: '.env' });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', apiRoute);

app.use((req,res) =>{  
	res.status(404).render('notFoundPage', { error: `The page you are looking doesn't exist.` }); 
});

app.set('port', process.env.PORT || 2222);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running at PORT ${server.address().port}`);
});