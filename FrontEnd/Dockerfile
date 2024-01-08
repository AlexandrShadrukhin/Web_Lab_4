FROM node
WORKDIR /app/frontEnd
COPY public /app/frontEnd/public
COPY package.json /app/frontEnd
COPY src /app/frontEnd/src
RUN npm install
CMD ["npm", "start"]
