'use strict'
let express = require('express');
let exphbs  = require('express-handlebars');
let bp      = require('body-parser');


let app = express();
app.use(bp.urlencoded({extended: true}));
function KV(obj) {
    return Object.entries(obj).map((e) => e.reduce((k,v) => ({k:k, v:v})))
}

let data = {
    'testing': false,
    'submit': false,
    'come up with a crazy idea': true
} // WIll be populated on POST: /create
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=> {
    res.render('todo', {'entries':KV(data)});
});


// Handle Task Creation `k: false`
app.post('/', (req, res ) => {
    data[req.body.create] = false;
    res.render('todo', {'entries':KV(data)});
});

// Handle Task Completion `k: true`
app.post('/complete', (req, res) => {
    data[req.body.entry] = true;
    res.render('todo', {'entries':KV(data)});
});

app.listen(3000, () => console.log('http://localhost:3000'));