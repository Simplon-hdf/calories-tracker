# Utiliser l'image officielle de Node.js comme base
FROM node:20-alpine AS api

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY ./api/package.json  ./api/package-lock.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste du code de l'application
COPY ./api ./

# Exposer le port sur lequel l'application va écouter
EXPOSE 3001:3001

# Commande pour démarrer l'application
CMD ["ash", "-c", "npm run build && npm run start"]

# Étape 1 : Construction de l'application
FROM node:20-alpine AS frontend

# Définir le répertoire de travail
WORKDIR /app

# Copier le reste du code source
COPY ./frontend ./

# Installer les dépendances
RUN npm install

# Exposer le port de l'application
EXPOSE 3000:3000

# Démarrer l'application en production
CMD ["ash", "-c", "npm run start"]