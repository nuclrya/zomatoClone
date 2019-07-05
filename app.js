let express = require('express');
let app = express();
const path = require('path');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const User = require('./models/user')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const adminRoutes = require('./Routes/admin');
const userRoutes = require('./Routes/user');
const authRoutes = require('./Routes/auth');

const store = new MongoDBStore({
  uri: 'mongodb+srv://nucleya:sbbc6NGFsLlQUMUS@cluster0-xvb8k.mongodb.net/test',
  collection: 'sessions'
});
const csrfProtection = csrf({
  cookie: true
});

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
app.use(
  session({
    secret: 'this should be a long string',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(cookieParser());
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    res.locals.resID = false;
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      res.locals.cart = req.user.cart;
      req.user
        .populate('cart.resID')
        .execPopulate()
        .then(result => {
          res.locals.resID = result.cart.resID;
        })
        .then(() => {
          next();
        })
      })
    .catch(err => console.log(err));
  }
);

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken =  req.csrfToken();
    next();
  }
)

app.use(authRoutes);
app.use(userRoutes);  
app.use(adminRoutes);


mongoose.connect('mongodb+srv://nucleya:sbbc6NGFsLlQUMUS@cluster0-xvb8k.mongodb.net/test?retryWrites=true')
    .then( result => {
      app.listen(3000);

      console.log('Server Started!!')
    })
    .catch( err => {
      console.log( err );
    })
