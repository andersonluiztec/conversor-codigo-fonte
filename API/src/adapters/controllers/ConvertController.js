const express = require('express');
const ConvertService = require('../external-services/openaiService');

const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Convert Code Api is starting')
  });

  router.post('/', async (req, res) => {
    const { sourceLanguage, targetLanguage, sourceCode } = req.body;

    const convertService = new ConvertService();
    const convertedCode = await convertService.convertCode(sourceLanguage, targetLanguage, sourceCode);
    res.json(convertedCode);
  });

  module.exports = router