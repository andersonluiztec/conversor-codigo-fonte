const axios = require('axios');
var apiKeyOpenAi = '';
var apiUrlOpenAi = '';

class openaiService {

  constructor() 
  {
      apiKeyOpenAi = Buffer.from(process.env.API_KEY_OPENAI, 'base64').toString('ascii');
      apiUrlOpenAi = process.env.API_URL_OPENAI;
  }

  async convertCode(sourceLanguage, targetLanguage, sourceCode) {



    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKeyOpenAi}`
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

    return await axios.post(apiUrlOpenAi, data, { headers: headers })
      .then(response => {
        return { convertedCode: response.data.choices[0].text.trim() }
      })
      .catch(error => {
        throw error;
      });

  }

}

module.exports = openaiService;