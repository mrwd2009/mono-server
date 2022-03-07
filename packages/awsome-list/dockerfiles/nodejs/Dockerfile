FROM node:16.14.0

LABEL version=1.0.0
LABEL email=1058215162@qq.com
LABEL description="just simple nodejs demo"

ENV NODE_ENV=production
ENV DATABASE_NAME=demo_api
ENV PORT=7003
ENV APP_JWTSECRET=uTq6sT5KAE6g3Z
ENV APP_PROD_JWTSECRET=uTq6sT5KAE6g3Z

# create directories
RUN mkdir -p /apps/gateway/log && mkdir -p /apps/gateway/demo

WORKDIR /apps/gateway/demo
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
COPY gateway .
RUN yarn install --production --silent
EXPOSE 7003/tcp
# RUN chown -R node /usr/src/app
# USER node
CMD ["node", "app.js"]
