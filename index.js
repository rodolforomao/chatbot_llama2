const config = require('./config/config'); // Importa a configuração

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { HfInference } = require('@huggingface/inference');

// Substitua pelo seu Token da Hugging Face
const hf = new HfInference(config.token);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

version = '1.00.009'

app.get('/ok', (req, res) => {
    res.send('Your app is runing. version=' + version);
});


app.post('/chat', async (req, res) => {
    const { question } = req.body;
    try {
        const response = await hf.textGeneration({
            //model: 'meta-llama/Llama-2-7b-chat-hf', // Substitua pelo modelo que você deseja usar
            //model: 'EleutherAI/gpt-neo-1.3B', // muito fraco
            //model: 'EleutherAI/gpt-j-6B', // The model EleutherAI/gpt-j-6b is too large to be loaded automatically (24GB > 10GB)
            //model: 'bigscience/bloom-560m', 
            //model: 'EleutherAI/gpt-neo-125M', // Muito fraco 
            model: 'distilgpt2', 
            inputs: question,
            parameters: {
                temperature: 0.7, // Optional, you can adjust model parameters as needed
            },
            headers: {
                Authorization: `Bearer ${config.token}`, // Include your API token in the headers
            }
        });

        res.json({ response: response.generated_text });
    } catch (error) {
        res.status(500).json({ 
            error: error.message || 'An internal server error occurred', 
            details: error 
          });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
