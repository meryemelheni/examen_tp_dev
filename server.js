const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Autorise les requêtes cross-origin
app.use(express.json()); // Parse les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Parse les données de formulaire

// Servir les fichiers statiques (l'application Angular compilée)
app.use(express.static(path.join(__dirname, 'www')));

// Données mock (simulation de base de données)
const posts = [
  { id: '1', titre: "Premier post", contenu: 'Contenu du premier post' },
  { id: '2', titre: "Deuxième post", contenu: 'Contenu du deuxième post' },
  { id: '3', titre: "Troisième post", contenu: 'Contenu du troisième post' },
];

// Routes API
// GET /api/posts - Récupérer tous les posts
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    data: posts
  });
});

// GET /api/posts/:id - Récupérer un post par ID
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post non trouvé'
    });
  }
  
  res.json({
    success: true,
    data: post
  });
});

// POST /api/posts - Créer un nouveau post
app.post('/api/posts', (req, res) => {
  const { titre, contenu } = req.body;
  
  if (!titre || !contenu) {
    return res.status(400).json({
      success: false,
      message: 'Titre et contenu sont requis'
    });
  }
  
  const newPost = {
    id: (posts.length + 1).toString(),
    titre,
    contenu
  };
  
  posts.push(newPost);
  
  res.status(201).json({
    success: true,
    data: newPost
  });
});

// Route par défaut pour servir l'application Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log(`📊 API disponible sur: http://localhost:${PORT}/api`);
  console.log(`🌐 Application disponible sur: http://localhost:${PORT}`);
});