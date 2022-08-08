FROM node:16-alpine AS BUILD_IMAGE
#RUN apk update && apk add yarn curl bash && rm -rf /var/cache/apk/*

#RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
RUN npm set progress=false
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --progress=false

ARG node_env=production
ENV NODE_ENV $node_env

COPY . .

RUN npm run build
WORKDIR /app/dist/apps/backend
RUN npm install --no-audit --progress=false
# run node prune
#RUN /usr/local/bin/node-prune

FROM node:16-alpine 
WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/migrations ./migrations

CMD ["node", "dist/apps/backend/main.js"]
