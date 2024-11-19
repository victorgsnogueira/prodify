const express = require('express');
const multer = require('multer');
const { speechToText } = require('../services/speechToText');
const { textToSpeech } = require('../services/textToSpeech');

const router = express.Router();
const upload = multer();

// Endpoint para conversão de fala em texto
router.post('/speech-to-text', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided', success: false });
    }
    console.log('Received audio file:', req.file.originalname);
    console.log('Audio file size:', req.file.size);

    const audioContent = req.file.buffer.toString('base64');
    const transcription = await speechToText(audioContent);

    res.json({
      text: transcription,
      success: true
    });
  } catch (error) {
    console.error('Speech to text error:', error);
    res.status(500).json({
      error: error.message,
      success: false
    });
  }
});

router.post('/text-to-speech', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided', success: false });
    }

    console.log('Converting text to speech:', text);
    const audioContent = await textToSpeech(text);

    // Enviar como JSON com o conteúdo em base64
    res.json({
      success: true,
      audioContent: audioContent.toString('base64'),
      message: 'Audio generated successfully'
    });
  } catch (error) {
    console.error('Text to speech error:', error);
    res.status(500).json({ error: error.message, success: false });
  }
});

module.exports = router;