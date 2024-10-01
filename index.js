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

app.get('/ok', (req, res) => {
    res.send('Your app is runing.');
});


app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await hf.textGeneration({
            model: 'meta-llama/Llama-2-7b-chat-hf', // Substitua pelo modelo que você deseja usar
            inputs: message,
        });

        res.json({ response: response.generated_text });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar resposta' });
    }
});

app.post('/chat2', async (req, res) => {
    const { message } = req.body;
    return message;
    try {
        const response = await hf.textGeneration({
            model: 'meta-llama/Llama-2-7b-chat-hf', // Substitua pelo modelo que você deseja usar
            inputs: message,
        });

        res.json({ response: response.generated_text });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar resposta' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
