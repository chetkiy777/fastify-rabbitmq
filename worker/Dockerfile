FROM node:20-alpine AS build
WORKDIR /app

COPY worker/package.json worker/tsconfig.json ./
RUN npm install

COPY worker/src ./src
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY worker/package.json ./
RUN npm install --omit=dev
CMD ["node", "dist/index.js"]
