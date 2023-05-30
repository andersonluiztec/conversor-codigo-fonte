const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const validKeys = {};
var secretKey = '';

function validateKey(randomKey) {
    return validKeys[randomKey] === true;
}

class AuthService {

    constructor ()
    {
        secretKey = process.env.SECRET_KEY;
    }

    generateRandomKey() {
        return crypto.randomBytes(32).toString('hex');
    }

    generateToken() {
        const randomKey = this.generateRandomKey();

        validKeys[randomKey] = true;

        return jwt.sign({ randomKey }, secretKey, { expiresIn: '1h' });
    }

    validateToken(req, res, next) {

        if (req.path === '/api/auth') {
            return next();
        } 

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const token = authHeader.substring(7); // Remove o prefixo 'Bearer ' do cabeçalho

        try {
            const decoded = jwt.verify(token, secretKey);

            const { randomKey } = decoded;

            if (!validateKey(randomKey)) {
                return res.status(403).json({ message: 'Chave inválida' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Token inválido' });
        }
    }
}

module.exports = AuthService;