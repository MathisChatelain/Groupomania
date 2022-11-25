const bcrypt = require("bcrypt")
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
    const user = new User({
        email: req.body.email,
        userId: new mongoose.Types.ObjectId(),
        password: hash
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ message: error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 exports.getUser = (req, res, next) => {
    console.log("here",req.body)
    User.findOne({ userId: ObjectId(req.body.userId) })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};