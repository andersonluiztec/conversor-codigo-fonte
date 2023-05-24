const axios = require('axios');

const config = require('../../../config');

class openaiService {

    constructor() {}

    async convertCode(sourceLanguage, targetLanguage, sourceCode) {

            const apiKey = config.apiKey; 
            const apiUrl = config.apiUrl;
        
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            };
        
            const promptComplete = `Translate the following ${sourceLanguage} code to 
                                                            ${targetLanguage}:\n\n
                                                            ${sourceCode}`;
        
            const data = {
              model: "text-davinci-003",
              prompt: promptComplete,
              temperature: 0,
              max_tokens: 1000,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0
            };
        
        try {
            const response = await axios.post(apiUrl, data, {headers: headers});

            return { convertedCode: response.data.choices[0].text.trim() }

        } catch (error) {
            console.error('Error converting code:', error);
            return response.status(500).json({ error: 'An error occurred while converting the code.' });
        }

        }
        
}

module.exports = openaiService;