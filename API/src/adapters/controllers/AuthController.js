const express = require('express');

const router = express.Router();
const AuthService = require('../providers/authService');

router.post('/', (req, res) => {
    const authService = new AuthService();
    const token = authService.generateToken();
    res.json({ token });
});

router.get('/', (req, res) => {
    res.json({ message: 'Autenticação realizada com sucesso' });
});

module.exports = router