# # Utiliser l'image officielle de Node.js comme base
# FROM node:20-alpine AS api

# # Exposer le port sur lequel l'application va écouter
# EXPOSE 3001

# # Définir le répertoire de travail dans le conteneur
# WORKDIR /app/api

# # Copier le fichier package.json et package-lock.json
# COPY ./ ./

# # Installer les dépendances de l'application
# RUN npm install

# # Commande pour démarrer l'application
# # CMD ["npm", "run", "start"]

# # Commande pour démarrer l'application
# CMD ["ash", "-c", "npm run build && npm run start"]
FROM node:slim
EXPOSE 3001
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]