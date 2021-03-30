FROM node:alpine3.12

ENV NODE_ENV=development
WORKDIR /api

COPY [ "package.json", "package-lock.json*", "./" ]
RUN apk add --update npm
RUN node -v
RUN [ "npm", "install", "--production" ]

COPY . /api

# RUN rm -rf package-lock.json package-lock.json_backup

EXPOSE 8000
ENTRYPOINT npm run dev