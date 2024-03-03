const {AccountModel} = require('../models/account.model');
const jwt = require("jsonwebtoken");
const getProfile = async (id) => {
    const user = await AccountModel.findById(id);
    return {
        ...generateTokenResponse(user)
    };
}

const loginWithUsernameAndPassword = async ({email, password}) => {
    const user = await AccountModel
        .findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            success: true,
            ...generateTokenResponse(user),
        };
    }

    return {
        success: false,
        code: 400,
        message: 'Invalid email or password',
    };
}

const generateTokenResponse = (user) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
    };
}

module.exports = {
    getProfile,
    loginWithUsernameAndPassword
}


