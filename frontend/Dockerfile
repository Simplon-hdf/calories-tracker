# # Étape 1 : Construction de l'application
# FROM node:20-alpine AS frontend

# # Définir le répertoire de travail
# WORKDIR /app/frontend

# # Copier le fichier package.json et package-lock.json du frontend
# COPY ./ ./

# # Installer les dépendances
# RUN npm install

# RUN npm run build

# # Exposer le port de l'application
# EXPOSE 3000

# # Démarrer l'application en production
# # CMD ["npm", "run", "start"]

# # Démarrer l'application en production
# CMD ["ash", "-c", "npm run start"]
FROM node:slim
EXPOSE 3000
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]