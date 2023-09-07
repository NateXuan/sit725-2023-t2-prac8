FROM node:14

WORKDIR /Users/wenzongxuan/Documents/GitHub/sit725-2023-t2-prac8 

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
