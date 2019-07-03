let express = require('express');
let app = express();
const path = require('path');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const User = require('./models/user')
const multer = require('multer')

const adminRoutes = require('./Routes/admin');
const userRoutes = require('./Routes/user');


app.set('view engine','ejs');
app.set('views','views'); 

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
}); 
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use(bodyParser.urlencoded({extended:true}));
app.use(
  multer({ storage: fileStorage ,fileFilter: fileFilter}).single('image')
);
app.use(express.static(path.join(__dirname,'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/restaurants/images", express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    User.findById('5d19f99870e09c1348c8d84f')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

  app.use((req, res, next) => {
    res.locals.cart = req.user.cart;
    res.locals.resID = false;
    req.user
      .populate('cart.resID')
      .execPopulate()
      .then(result => {
        res.locals.resID = result.cart.resID;
      }).then(() => {
          next();
      })
  })

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



    // exports.getCart = (req, res, next) => {
    //   req.user
    //     .populate('cart.items.productId')
    //     .execPopulate()
    //     .then(user => {
    //       const products = user.cart.items;
    //       res.render('shop/cart', {
    //         path: '/cart',
    //         pageTitle: 'Your Cart',
    //         products: products
    //       });
    //     })
    //     .catch(err => console.log(err));
    // };
    
    