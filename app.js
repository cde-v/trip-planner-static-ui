var express = require('express'); 
var morgan = require('morgan'); 
var bodyParser = require('body-parser'); 
var swig = require('swig');
var $ = require("jQuery");
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var app = express();

app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    outputStyle: 'compressed',
    // prefix:  '/stylesheets'  
}));

var port = 3000;

// swig set up 

app.set('views', __dirname + '/views'); 
app.set('view engine', 'html'); 
app.engine('html', swig.renderFile); 
swig.setDefaults({ cache: false });

//logging and bodyparsing 

app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}))


// routing static files 

app.use(express.static(__dirname + '/public'));

app.use("/bootstrap", express.static('node_modules/bootstrap/dist')); 
app.use("/jquery", express.static('node_modules/jquery/dist')); 

// 404 not found error 


app.use(require('./routes'));

// error handling 
app.use(function(err, req, res, next){
  res.status(err.status || 500); 
  // render some error html 
});

app.listen(port, function(){
  console.log('server is now listening for requests on port: ', port)
});
