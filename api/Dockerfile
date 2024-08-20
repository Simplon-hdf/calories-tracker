FROM node:slim

EXPOSE 3001

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]