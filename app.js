let express = require('express');
let app = express();
const path = require('path');
const mongoose = require('mongoose'); 


const adminRoutes = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.set('views','views'); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    res.locals.isLoggedIn = true;
    res.locals.csrfToken =  'sdcsdvsdvsdv'
    next();
  })

app.use(shopRoutes);  
app.use(adminRoutes);


mongoose.connect('mongodb+srv://nucleya:sbbc6NGFsLlQUMUS@cluster0-xvb8k.mongodb.net/test?retryWrites=true')
    .then(result => {
        app.listen(8080);
        console.log('Connected Successfully !!')
    })
    .catch(err => {
        console.log(err);
    })

