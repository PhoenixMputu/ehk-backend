# Étape 1: Construire l'image Node pour NestJS
FROM node:18 AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm install
RUN npx prisma generate

# Copier tout le code source de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape 2: Préparer l'image finale pour l'exécution de l'application
FROM node:18-alpine

# Définir le répertoire de travail dans l'image finale
WORKDIR /app

# Copier les dépendances installées et le code compilé depuis l'image de build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/src/templates ./src/templates

# Exposer le port de l'application
EXPOSE 3000

# Lancer l'application avec Node
CMD ["node", "dist/main"]
