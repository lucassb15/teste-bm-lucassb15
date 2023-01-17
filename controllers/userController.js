const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message)
    }
}

const loadRegister = async (req, res) => {
    try {

        res.render('registration');

    } catch (error) {
        console.log(error.message)
    }
}

const insertUser = async (req, res) => {

    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            gender: req.body.gender,
            email: req.body.email,
            password: spassword,
            is_admin: 0,
        });
        const userData = await user.save();

        if (userData) {
            res.render('registration', { message: 'Seu cadastro foi realizado com sucesso! ' })

        }
        else {
            res.render('registration', { message: 'Seu cadastro falhou! ' })
        }
    } catch (error) {
        console.log(error.message)
    }
}

// Login user methods started

const loginLoad = async (req, res) => {

    try {

        res.render('login');

    } catch (error) {
        console.log(error.message)
    }
}

const verifyLogin = async (req, res) => {

    try {

        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });

        if (userData) {

            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                req.session.user_id = userData._id;
                res.redirect('/home')
            } else {
                res.render('login', { message: 'Email ou Senha incorretos!' })
            }

        } else {
            res.render('login', { message: 'Email ou Senha incorretos!' })
        }

    } catch (error) {
        console.log(error.message)
    }

}

const loadHome = async (req, res) => {

    try {

        const userData = await User.findById({ _id: req.session.user_id });
        res.render('home', { user: userData })

    } catch (error) {
        console.log(error.message)
    }

}

const userLogout = async (req, res) => {

    try {

        req.session.destroy();
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }

}

// User profile edit & update

const editLoad = async (req, res) => {

    try {

        const id = req.query.id;

        const userData = await User.findById({ _id:id });

        if (userData) {
            res.render('edit', { user:userData });
        }
        else {
            res.redirect('/home');
        }

    } catch (error) {
        console.log(error.message)
    }

}

const updateProfile = async (req, res) => {

    try {
        if(req.file){
            const userData = await User.findByIdAndUpdate({ _id:req.body._id },{$set:{name: req.body.name,lastName: req.body.lastName,birthday: req.body.birthday,gender: req.body.gender} });

        }
        else{
            const userData = await User.findByIdAndUpdate({ _id:req.body._id },{$set:{name: req.body.name,lastName: req.body.lastName,birthday: req.body.birthday,gender: req.body.gender} });
        }
        res.redirect('/home');

    } catch (error) {
        console.log('Error: ',error.message);
    }

}

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    updateProfile
}