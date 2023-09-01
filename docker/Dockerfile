FROM node:18-alpine

WORKDIR /usr

COPY ./package.json ./package-lock.json ./.prettierrc ./.eslintrc.json ./jest.config.js ./tsconfig.json ./tsconfig.release.json ./
RUN npm install

COPY ./src ./src

EXPOSE 8080

RUN npm run build
COPY ./src/templates ./build/src/templates
CMD ["npm", "run", "start"]