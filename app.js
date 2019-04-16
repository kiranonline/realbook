//require('dotenv').config();
const PORT = process.env.PORT || 5000
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var cors = require('cors')



//importing routes
var sharingmaster = require('./routes/sharingmaster');
var taxmaster = require('./routes/taxmaster');
var itemmaster = require('./routes/itemmaster');
var ledgermaster = require('./routes/ledgermaster');
var bookingmaster = require('./routes/bookingmaster');
var post = require('./routes/post');
var doc = require('./routes/doc');
var vprofitsharing = require('./routes/vprofitsharing');
var customermaster = require('./routes/customermaster');
var suppliermaster = require('./routes/suppliermaster');
var api = require("./routes/api");

//app
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers:{
    index_modivied : function(value){
      return value+1;
    },
    add: function(value1,value2){
      return parseFloat(value2)+parseFloat(value1);
    },
    greater: function(value1,value2){
      var v1 = parseFloat(value1);
      var v2 = parseFloat(value2);
      if(v1>v2){
        return v1;
      }
      else{
        return v2;
      }
    },
    DateFormate: function(d){
      if(d){
        var date = new Date(d);
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        return String(d)+"-"+String(m)+"-"+String(y);
      }
      else{
        return ""
      }
      
    }
  }

});




app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/',doc);
app.use('/sharingmaster', sharingmaster);
app.use('/taxmaster', taxmaster);
app.use('/itemmaster',itemmaster);
app.use('/ledgermaster',ledgermaster);
app.use('/bookingmaster',bookingmaster);
app.use('/post',post);
app.use('/vprofitsharing',vprofitsharing);
app.use('/customermaster',customermaster);
app.use('/suppliermaster',suppliermaster);
app.use('/api',api);

app.get('/local/booking/*',(req,res,next)=>{
  res.sendFile(path.join(__dirname, './public', 'index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT,(err)=>{
  if(err){
    console.log(err);
  }
  console.log('Running on port = '+PORT);
});
