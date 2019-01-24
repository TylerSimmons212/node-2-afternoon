const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const massive = require('massive');
const  ctrl = require('./products.controller')

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
.then(dbInstance => {app.set('db',dbInstance)})
.catch(err => console.log(err));

app.post( '/api/products', ctrl.create );
app.get( '/api/products', ctrl.getAll );
app.get( '/api/products/:id', ctrl.getOne );
app.put( '/api/products/:id', ctrl.update );
app.delete( '/api/products/:id', ctrl.delete );


const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server is Running on port ${port}.`);
})


