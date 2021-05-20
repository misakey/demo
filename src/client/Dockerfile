FROM node:14 AS builder
LABEL stage=intermediate

ARG MISAKEY_SDK_BASE_TARGET_DOMAIN

COPY ./src /app/src
COPY ./public /app/public
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./yarn.lock /app/yarn.lock
COPY ./.eslintrc.js /app/.eslintrc.js
# COPY ./.eslintignore /app/.eslintignore

WORKDIR /app

RUN yarn install
# Disabling inline runtime chunk
# to avoid requiring "script-src 'unsafe-inline'" in CSPs
# (see https://gitlab.misakey.dev/misakey/user-needs/-/issues/294
# and https://create-react-app.dev/docs/advanced-configuration/
# and https://drag13.io/posts/react-inline-runtimer-chunk/index.html)
RUN MISAKEY_SDK_BASE_TARGET_DOMAIN=$MISAKEY_SDK_BASE_TARGET_DOMAIN INLINE_RUNTIME_CHUNK=false yarn run build --env=prod


FROM nginx:1.18.0-alpine
COPY --from=builder /app/build /app/build
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
