const { hash, compare } = require("bcrypt");
const { Types } = require("mongoose");
const { sign } = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "E-Mail already exists",
        });
      } else {
        hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            console.log(hash);
            user
              .save()
              .then((result) => {
                console.log(user);
                res.status(201).json({ message: "User created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => console.log(err));
};
exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }
      compare(req.body.password, user[0].password, (error, result) => {
        if (result) {
          const token = sign(
            {
              email: user[0].email,
              user: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth succsessfull",
            token: token,
          });
        } else {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.user_delete_user = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "User Deleted !!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
