# 🎨 Artist Content Platform

Plateforme complète de gestion de contenu pour artistes - Publication automatisée Instagram & Pinterest avec planification intelligente.

## ✨ Fonctionnalités

- 🎨 **Interface intuitive** : Conçue spécialement pour les artistes
- 📱 **Multi-plateformes** : Instagram, Pinterest (+ TikTok, YouTube Shorts à venir)
- ⏰ **Planification intelligente** : Programmation automatique aux meilleurs créneaux
- 📊 **Analytics détaillés** : Suivi des performances et métriques d'engagement
- 🏷️ **Gestion des hashtags** : Groupes personnalisés et suggestions
- 📚 **Bibliothèque de contenu** : Organisation et réutilisation de vos créations
- 🤖 **Automatisation** : Publication automatique sur plusieurs plateformes

## 🛠️ Stack Technique

- **Frontend** : Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend** : Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentification** : NextAuth.js avec OAuth et Magic Links
- **État** : Zustand pour la gestion d'état globale
- **Upload** : UploadThing pour la gestion des médias
- **UI** : Radix UI avec design system personnalisé
- **DevOps** : Docker, Docker Compose pour le développement

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ 
- Docker Desktop installé et lancé
- Compte Google/GitHub pour l'auth (optionnel pour le dev)

### 1. Cloner le repository

```bash
git clone https://github.com/creach-t/artist-content-platform.git
cd artist-content-platform
```

### 2. Configuration des variables d'environnement

```bash
cp .env.example .env.local
```

Éditez `.env.local` avec vos variables (les valeurs par défaut fonctionnent pour le développement local).

### 3. Démarrer avec Docker

```bash
# Démarrer tous les services (app + base de données + redis + minio)
npm run docker:dev

# Ou en arrière-plan
npm run docker:dev:detached
```

Cela démarre :
- **Application Next.js** : http://localhost:3000
- **PostgreSQL** : localhost:5432
- **Redis** : localhost:6379
- **MinIO** (stockage) : http://localhost:9001 (admin: minioadmin/minioadmin123)
- **MailHog** (emails dev) : http://localhost:8025

### 4. Configuration de la base de données

```bash
# Migrate et seed la base de données
npm run docker:prisma:migrate
npm run docker:seed

# Optionnel : Ouvrir Prisma Studio
npm run docker:prisma:studio
```

### 5. Accéder à l'application

Rendez-vous sur http://localhost:3000

- **Landing page** : Interface publique avec fonctionnalités
- **Connexion** : `/auth/signin` (utilisez Google/GitHub ou email)
- **Dashboard** : Interface principale après connexion

## 🔑 Configuration des APIs Sociales

### Instagram API

1. Allez sur [Facebook Developers](https://developers.facebook.com/)
2. Créez une app → "Consumer" → "Instagram Basic Display"
3. Configurez les redirections : `http://localhost:3000/api/auth/callback/instagram`
4. Ajoutez les clés dans `.env.local` :
   ```
   INSTAGRAM_CLIENT_ID=your_client_id
   INSTAGRAM_CLIENT_SECRET=your_client_secret
   ```

### Pinterest API

1. Allez sur [Pinterest Developers](https://developers.pinterest.com/)
2. Créez une app
3. Configurez les redirections : `http://localhost:3000/api/auth/callback/pinterest`
4. Ajoutez les clés dans `.env.local` :
   ```
   PINTEREST_CLIENT_ID=your_client_id
   PINTEREST_CLIENT_SECRET=your_client_secret
   ```

## 📁 Structure du Projet

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Pages d'authentification
│   │   ├── dashboard/         # Interface principale
│   │   └── globals.css        # Styles globaux
│   ├── components/            # Composants réutilisables
│   │   ├── ui/               # Composants UI de base
│   │   ├── dashboard/        # Composants dashboard
│   │   └── landing/          # Page d'accueil
│   ├── lib/                  # Utilitaires et configurations
│   │   ├── platforms/        # Intégrations plateformes
│   │   ├── database.ts       # Client Prisma
│   │   ├── auth.ts          # Configuration NextAuth
│   │   └── utils.ts         # Fonctions utilitaires
│   ├── hooks/                # Hooks React personnalisés
│   ├── stores/               # Stores Zustand
│   └── types/                # Types TypeScript
├── prisma/                   # Schéma et migrations DB
├── docker-compose.dev.yml    # Configuration Docker dev
└── Dockerfile.dev           # Image Docker dev
```

## 📊 Commandes Utiles

### Développement

```bash
# Démarrer en mode dev (sans Docker)
npm run dev

# Build pour production
npm run build

# Vérification TypeScript
npm run type-check

# Linting
npm run lint
```

### Docker

```bash
# Voir les logs
npm run docker:logs

# Accéder au shell du conteneur
npm run docker:shell

# Arrêter les services
npm run docker:stop

# Nettoyage complet (⚠️ supprime les données)
npm run docker:clean
```

### Base de données

```bash
# Migration de développement
npm run db:migrate

# Reset de la DB
npm run db:reset

# Prisma Studio
npm run db:studio

# Seed avec données de test
npm run db:seed
```

## 🎨 Design System

### Couleurs Principales

```css
/* Palette artistique */
--artist-purple: #a855f7   /* Violet principal */
--artist-gold: #f59e0b     /* Or accent */
--artist-blue: #3b82f6     /* Bleu complémentaire */
```

### Composants UI

- **Button** : 8 variants (default, gradient, instagram, pinterest, etc.)
- **Card** : Avec shadow artistique et bordures arrondies
- **Input/Textarea** : Validation intégrée et états d'erreur
- **Badge** : Pour les statuts et catégories

## 🔌 Architecture Modulaire

### Intégrations Plateformes

Chaque plateforme suit l'interface `PlatformProvider` :

```typescript
interface PlatformProvider {
  name: string
  authenticate(): Promise<boolean>
  schedulePost(post: Post): Promise<ScheduledPost>
  publishPost(post: Post): Promise<PublishedPost>
  getAnalytics(): Promise<Analytics>
  formatContent(content: Content): FormattedContent
}
```

### Ajout d'une Nouvelle Plateforme

1. Créer `src/lib/platforms/nouvelle-plateforme.ts`
2. Implémenter l'interface `PlatformProvider`
3. Ajouter l'enum dans `prisma/schema.prisma`
4. Créer la migration Prisma
5. Ajouter les couleurs et icônes dans les composants

## 🧪 Tests et Qualité

### Scripts de test (à implémenter)

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:coverage
```

### Standards de Code

- **TypeScript strict** : Tous les fichiers typés
- **ESLint + Prettier** : Formatage automatique
- **Conventional Commits** : Messages de commit standardisés
- **Husky** : Pre-commit hooks (à ajouter)

## 🌍 Déploiement

### Variables d'Environnement Production

```bash
# Base
NODE_ENV=production
NEXTAUTH_URL=https://votre-domaine.com
NEXTAUTH_SECRET=your-production-secret

# Database
DATABASE_URL=postgresql://user:password@host:5432/db

# Redis
REDIS_URL=redis://user:password@host:6379

# APIs
INSTAGRAM_CLIENT_ID=prod_instagram_id
INSTAGRAM_CLIENT_SECRET=prod_instagram_secret
PINTEREST_CLIENT_ID=prod_pinterest_id
PINTEREST_CLIENT_SECRET=prod_pinterest_secret

# Storage
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=your_app_id
```

### Docker Production

```bash
# Build image de production
docker build -f Dockerfile.prod -t artist-platform:latest .

# Déployer avec docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'feat: add amazing feature'`)
4. Push la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Convention de Commits

```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage, pas de changement de code
refactor: refactoring du code
test: ajout de tests
chore: maintenance
```

## 🐛 Dépannage

### Problèmes Courants

**Docker ne démarre pas**
```bash
# Vérifier que Docker Desktop est lancé
docker --version
docker-compose --version

# Nettoyer les conteneurs existants
npm run docker:clean
```

**Erreur de base de données**
```bash
# Reset complet de la DB
npm run docker:prisma:migrate
npm run docker:seed
```

**Ports déjà utilisés**
```bash
# Modifier les ports dans docker-compose.dev.yml
# Ou arrêter les services qui utilisent les ports 3000, 5432, 6379
```

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/creach-t/artist-content-platform/issues)
- **Discussions** : [GitHub Discussions](https://github.com/creach-t/artist-content-platform/discussions)
- **Email** : support@artist-platform.com

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Prisma](https://prisma.io/) pour l'ORM
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Radix UI](https://radix-ui.com/) pour les composants
- [Framer Motion](https://framer.com/motion/) pour les animations

---

<div align="center">
  <b>🎨 Créé avec passion pour la communauté artistique 🎨</b>
</div>