const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodejs.email.service14@gmail.com',
    pass: '123456789@Yk'
  }
});



// // ********* Protected Route ************************
// exports.getFlag = (req, res, next) => {
//   let message = req.flash('success');
//   if(message.length > 0){
//     message = message[0];
//   }
//   else{
//     message = null;
//   }
//   res.render('flag',{successMessage: message});
// }
// // ************************************************* */



// ************** Login ***********************************************
exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
      if(message.length > 0){
          message = message[0];
      }
      else{
          message = null;
      }

    res.render('auth/login',{
      pageTitle: 'Login',
      errorMessage: message
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if(user){
                bcrypt
                .compare(password, user.password)
                .then( result => {
                    if(result){
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            req.flash('success','User successfully LoggedIn');
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
            }
            else{
                req.flash('error','Email not found');
                res.redirect('/signin');
            }

        })   
    };

// ***************************************************************************




//*************************SignIn Controllers********************************** */
    exports.getSignin = (req, res, next) => {
      let message = req.flash('error');
      if(message.length > 0){
          message = message[0];
      }
      else{
          message = null;
      }
      res.render('auth/signin',{
        errorMessage: message,
        pageTitle: 'SignUp'
      });
  }

exports.postSignin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const cart = {};
    User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error','E-Mail exists already, please pick a different one.');
        return res.redirect('/signin');
      }
       return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            cart: cart
          });
         return user.save();
        })
        .then(result => {
            res.redirect('/login');

            return transporter.sendMail( {      // Part(2/2) - Sending Email
                from: 'singhfake14@gmail.com',
                to: email,
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              }, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            }); 

          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
//****************************************************************************************** */




//************** LogOut Controller********************** */
exports.getLogout = (req, res, next) =>{
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
//******************************************************** */

exports.getReset = (req, res, next) => {
  res.render('auth/reset-password',{
    pageTitle: 'Reset Password'
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset-pwd');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          // req.flash('error', 'No account with that email found.');
          return res.redirect('/reset-pwd');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'shop@node-complete.com',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset-pwd/${token}">link</a> to set a new password.</p>
          `
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
//*********************************************************** */




exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  console.log(token)
  User.findOne({ resetToken: token ,resetTokenExpiration: { $gt: Date.now()} })  //,  
    .then(user => {
      res.render('auth/new-password', {
        pageTitle: 'New Password',
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
const newPassword = req.body.password;
const userId = req.body.userId;
const passwordToken = req.body.passwordToken;
let resetUser;

User.findOne({
  resetToken: passwordToken,
  resetTokenExpiration: { $gt: Date.now() },
  _id: userId
})
  .then(user => {
    resetUser = user;
    return bcrypt.hash(newPassword, 12);
  })
  .then(hashedPassword => {
    resetUser.password = hashedPassword;
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;
    return resetUser.save();
  })
  .then(result => {
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err);
  });
};