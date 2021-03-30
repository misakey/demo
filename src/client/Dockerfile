FROM node:14 AS builder
LABEL stage=intermediate

COPY ./src /app/src
COPY ./public /app/public
COPY ./package.json /app/package.json
# COPY ./jsconfig.json /app/jsconfig.json
# COPY ./config-overrides.js /app/config-overrides.js
COPY ./yarn.lock /app/yarn.lock
# COPY ./.eslintrc /app/.eslintrc
# COPY ./.eslintignore /app/.eslintignore

WORKDIR /app

RUN yarn install
# Disabling inline runtime chunk
# to avoid requiring "script-src 'unsafe-inline'" in CSPs
# (see https://gitlab.misakey.dev/misakey/user-needs/-/issues/294
# and https://create-react-app.dev/docs/advanced-configuration/
# and https://drag13.io/posts/react-inline-runtimer-chunk/index.html)
RUN INLINE_RUNTIME_CHUNK=false yarn run build --env=prod


FROM nginx:1.18.0-alpine
COPY --from=builder /app/build /app/build
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
