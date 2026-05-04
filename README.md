# Bonheur Nzau Wuma - Portfolio Professionnel

Portfolio full-stack moderne développé avec React, Node.js, Express et MySQL.

## 🚀 Technologies Utilisées

### Frontend
- **React 19** avec TypeScript
- **Vite** comme bundler
- **TailwindCSS** pour le styling
- **GSAP** pour les animations
- **Radix UI** pour les composants

### Backend
- **Node.js** avec Express.js
- **TypeScript**
- **MySQL** pour la base de données
- **Nodemailer** pour les emails
- **Joi** pour la validation

## 📋 Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Formulaire de contact fonctionnel avec envoi d'emails
- ✅ Téléchargement du CV
- ✅ Portfolio de projets interactif
- ✅ Animations fluides avec GSAP
- ✅ Base de données MySQL pour stocker les contacts
- ✅ API REST complète
- ✅ Favicon SVG personnalisé

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js (v18 ou supérieur)
- MySQL (v8 ou supérieur)
- npm ou yarn

### 1. Cloner le projet
```bash
git clone https://github.com/bonheur84/portfolio.git
cd portfolio
```

### 2. Installer les dépendances frontend
```bash
npm install
```

### 3. Installer les dépendances backend
```bash
cd server
npm install
```

### 4. Configurer la base de données
1. Créer une base de données MySQL nommée `portfolio_db`
2. Importer le schéma depuis `server/database/schema.sql`
3. Configurer les variables d'environnement dans `server/.env`

### 5. Configurer les variables d'environnement
Copier `server/.env` et configurer:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=portfolio_db

# Email (optionnel)
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

### 6. Démarrer le serveur backend
```bash
cd server
npm run dev
```

### 7. Démarrer le frontend
```bash
# Dans un autre terminal
npm run dev
```

L'application sera disponible sur:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Structure du Projet

```
portfolio/
├── src/                    # Frontend React
│   ├── components/        # Composants UI
│   ├── sections/          # Sections du portfolio
│   ├── hooks/             # Hooks personnalisés
│   └── lib/               # Utilitaires
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── config/        # Configuration DB/Email
│   │   ├── routes/        # Routes API
│   │   └── app.ts         # Application principale
│   ├── database/          # Schéma SQL
│   └── uploads/           # Fichiers uploadés
├── public/                # Fichiers statiques
└── dist/                  # Build de production
```

## 🗄️ API Endpoints

### Contact
- `POST /api/contact` - Envoyer un message
- `GET /api/contact` - Récupérer tous les messages

### Projects
- `GET /api/projects` - Récupérer tous les projets
- `GET /api/projects/featured` - Projets vedettes
- `POST /api/projects` - Ajouter un projet

### CV
- `GET /api/cv/download` - Télécharger le CV
- `GET /api/cv/info` - Informations du CV

## 📧 Configuration Email (Optionnel)

Pour activer l'envoi d'emails:
1. Configurer un compte Gmail avec mot de passe d'application
2. Mettre à jour les variables `EMAIL_USER` et `EMAIL_PASS` dans `.env`
3. Redémarrer le serveur backend

## 🎨 Personnalisation

### Modifier les informations personnelles
- **Hero**: `src/sections/Hero.tsx`
- **Contact**: `src/sections/Contact.tsx`
- **Projets**: `src/sections/Projects.tsx`
- **Compétences**: `src/sections/Skills.tsx`

### Ajouter votre CV
1. Placer votre fichier PDF dans `server/uploads/cv/`
2. Nommer le fichier `CV_Bonheur_Nzau_Wuma.pdf`

### Personnaliser le style
- Modifier `src/index.css` pour les styles globaux
- Utiliser les classes TailwindCSS pour le styling

## 🚀 Déploiement

### Build de production
```bash
# Frontend
npm run build

# Backend
cd server
npm run build
npm start
```

### Déploiement recommandé
- Frontend: Vercel, Netlify
- Backend: Heroku, Railway, DigitalOcean
- Base de données: PlanetScale, MySQL Cloud

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Bonheur Nzau Wuma**
- Étudiant L1 Informatique
- Université Nouveaux Horizons
- Email: nzaubonheur84@gmail.com
- GitHub: [@bonheur84](https://github.com/bonheur84)

---

⭐ Si vous aimez ce portfolio, n'hésitez pas à le partager !
