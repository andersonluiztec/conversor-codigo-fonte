const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Autenticação realizada com sucesso' });
});

module.exports = router