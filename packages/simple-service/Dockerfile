FROM node:16-alpine3.14

LABEL version=1.0.0
LABEL email=wudi.link.me@gmail.com
LABEL description="rule engine modeling ui api"

ENV NODE_ENV=production
ENV APP_ENV=dev
ENV PORT=5700

# create directories
RUN mkdir -p /apps/gateway/log && mkdir -p /apps/gateway/app-service/main && mkdir -p /apps/bin

COPY scripts/ /apps/bin
RUN chmod +x /apps/bin/dumb-init

WORKDIR /apps/gateway/app-service

COPY release ./main
COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production --frozen-lockfile --silent && yarn cache clean

EXPOSE 5700/tcp

ENTRYPOINT ["/apps/bin/dumb-init", "--"]

CMD [ "node", "--max-old-space-size=1024", "--heapsnapshot-signal=SIGUSR2", "--heapsnapshot-near-heap-limit=3", "./main/index.js"]
