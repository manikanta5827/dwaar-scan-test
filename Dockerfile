FROM node:26.5.0-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV DB_PASSWORD=root123
EXPOSE 22 3000
CMD ["node", "app.js"]
