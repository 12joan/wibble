FROM --platform=linux/amd64 node:latest

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

RUN yarn build
CMD yarn start

EXPOSE 3000
