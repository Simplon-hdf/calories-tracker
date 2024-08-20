FROM node:slim

# Installer OpenSSL
RUN apt-get update && apt-get install -y openssl

# Exposer le port
EXPOSE 3001

# Copier le code source
COPY . .

# Installer les dépendances
RUN npm install

# Générer le client Prisma avec la bonne cible binaire
RUN npx prisma generate

# Construire l'application
RUN npm run build

# Démarrer l'application
CMD ["npm", "run", "start"]