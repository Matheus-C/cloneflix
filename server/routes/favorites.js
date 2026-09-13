const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

// GET /api/favorites — lista os favoritos do usuário
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('favorites');
    res.json(user.favorites || []);
  } catch (err) {
    console.error('Erro em GET /favorites:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// POST /api/favorites — adiciona um favorito
router.post('/', async (req, res) => {
  try {
    const { imdbID, Title, Year, Poster, Type } = req.body;
    if (!imdbID || !Title)
      return res.status(400).json({ message: 'Dados do filme incompletos' });

    const user = await User.findById(req.userId);
    const exists = user.favorites.some((f) => f.imdbID === imdbID);
    if (exists)
      return res.status(400).json({ message: 'Já está nos favoritos' });

    user.favorites.push({ imdbID, Title, Year, Poster, Type });
    await user.save();
    res.status(201).json(user.favorites);
  } catch (err) {
    console.error('Erro em POST /favorites:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// DELETE /api/favorites/:imdbID — remove um favorito
router.delete('/:imdbID', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter((f) => f.imdbID !== req.params.imdbID);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error('Erro em DELETE /favorites:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;