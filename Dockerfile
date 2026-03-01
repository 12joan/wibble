FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY . .
RUN yarn build

FROM node:24-alpine
RUN apk --no-cache add curl
WORKDIR /app
COPY --from=builder /app .
RUN yarn install --frozen-lockfile --non-interactive --production && yarn cache clean
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
CMD yarn start
HEALTHCHECK CMD curl -f http://localhost:3000/ || exit 1
EXPOSE 3000
