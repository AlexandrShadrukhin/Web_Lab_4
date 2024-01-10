FROM node
WORKDIR /app/frontEnd
COPY ../web_lab4_front/public /app/frontEnd/public
COPY ../web_lab4_front/package.json /app/frontEnd
COPY ../web_lab4_front/src /app/frontEnd/src
RUN npm install
CMD ["npm", "start"]
