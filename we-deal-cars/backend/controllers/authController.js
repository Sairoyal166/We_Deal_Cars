const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password, mobile, address } = req.body;
    try {
        const userId = await User.create(name, email, password, mobile, address);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.getByEmailAndPassword(email, password);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
