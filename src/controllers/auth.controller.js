const jwt = require('jsonwebtoken');

exports.login = (req,res) => {
    const { username } = req.body;
    const payload = { username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
    return res.status(200).json( { token } );
}