const User = require('../models/User');
const { verifyToken } = require('../helpers/jwtHelper');

const authentication = async (req, res, next) =>
{
    try
    {
        const { access_token } = req.headers;
        console.log(access_token)
        if (!access_token)
        {
            throw { name: "Unauthorized", message: "Invalid token" };
        }
        const data = verifyToken(access_token);

        const user = await User.findById(data.id);

        if (!user)
        {
            throw { name: "Unauthorized", message: "Invalid token" };
        }

        req.user = user;

        next();
    } catch (error)
    {
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = authentication;