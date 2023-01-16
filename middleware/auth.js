
const isLogin = async (req, res, next) => {

    try {
        if(req.session.user_id){}
        else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error.message)
    }
    next();
}

const isLogout = async (req, res, next) => {

    try {
        if(req.session.user_id){
            res.redirect('/home');
        }
         next();
    } catch (error) {
        console.log(error.message)
    }

}

module.exports = {
    isLogin,
    isLogout
}