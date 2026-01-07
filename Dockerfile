FROM node:20-bookworm

# Install Playwright and Chromium browsers at build time
RUN npx -y playwright@1.48.0 install --with-deps chromium

WORKDIR /app

# Install your app dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your app (including index.js)
COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
