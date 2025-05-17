FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4444

CMD ["sh", "-c", "npm run migrate  && npm run production"]