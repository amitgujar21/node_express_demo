const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

// Use static Methods public folder
app.use(express.static('./methods-public'));

// Parse the form data
app.use(express.urlencoded({extended: false}));

// Parse Json
app.use(express.json());

// Use Router
app.use('/api/people', people);
app.use('/login', auth);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);    
})