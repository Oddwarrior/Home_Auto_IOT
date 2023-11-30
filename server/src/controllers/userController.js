const io = require('../../index')

const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_secret = 'shashank_jagtap';

const register = async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { userId } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ userId, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

const login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Find user by userId
        const user = await User.findOne({ where: { userId } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userId }, jwt_secret);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
}

function verifyUser(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    jwt.verify(token.split(' ')[1], jwt_secret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ error: 'Token is not valid' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = {
    register, login, verifyUser
}