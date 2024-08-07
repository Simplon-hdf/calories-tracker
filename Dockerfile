# Utiliser l'image officielle de Node.js comme base
FROM node:20-alpine as api

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY ./api/package.json  ./api/package-lock.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste du code de l'application
COPY ./api ./

# Exposer le port sur lequel l'application va écouter
EXPOSE 3001:3001

# Commande pour démarrer l'application
CMD ["npm", "start"]
