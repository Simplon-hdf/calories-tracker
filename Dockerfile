# Utiliser l'image officielle de Node.js comme base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application va écouter
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "start"]
