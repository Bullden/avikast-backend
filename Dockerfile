FROM node:14.0.0-alpine3.11 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY tsconfig.json tsconfig.build.json ./
COPY src src
RUN yarn build

FROM node:12
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod
COPY --from=build /app/dist dist
COPY resources resources
COPY certificates certificates
COPY config/gcloud config/gcloud
COPY config/firebase config/firebase
COPY email email
ENV GOOGLE_APPLICATION_CREDENTIALS=./config/gcloud/application_default_credentials.json
COPY .env .env.development .env.prod .env.staging .env.testing ./
CMD ["yarn", "start:prod"]
