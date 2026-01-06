FROM node:20-bookworm
RUN npx -y playwright@1.48.0 install --with-deps chromium
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
