const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware CORS
app.use(cors());

// Route simple pour les posts
app.get('/api/postList', (req, res) => {
    console.log('✅ Backend: Quelqu\'un a appelé /api/postList!');
    res.json([
        { id: '1', titre: 'Premier post', contenu: 'Contenu du premier post' },
        { id: '2', titre: 'Deuxième post', contenu: 'Contenu du deuxième post' },
        { id: '3', titre: 'Troisième post', contenu: 'Contenu du troisième post' }
    ]);
});

// Route test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend fonctionne!' });
});

// Démarrage
app.listen(PORT, () => {
    console.log('🎉 BACKEND DÉMARRÉ SUR LE PORT ' + PORT);
    console.log('📍 TEST: http://localhost:3000/api/test');
    console.log('📍 POSTS: http://localhost:3000/api/postList');
});