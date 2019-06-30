let express = require('express');
let app = express();
const path = require('path');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const User = require('./models/user')

const adminRoutes = require('./Routes/admin');
const userRoutes = require('./Routes/user');


app.set('view engine','ejs');
app.set('views','views'); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findById('5cf73a343c070116f42d97dc')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use(userRoutes);  
app.use(adminRoutes);


mongoose.connect('mongodb+srv://nucleya:sbbc6NGFsLlQUMUS@cluster0-xvb8k.mongodb.net/test?retryWrites=true')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
              const user = new User({
                name: 'Yash',
                email: 'yashkatiyar14@gmail.com',
                cart: {
                  items: []
                }
              });
              user.save();
            }
          });
        app.listen(3000);
        console.log('Server Started!!')
    })
    .catch(err => {
        console.log(err);
    })

