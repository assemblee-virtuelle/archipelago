FROM node:22-alpine AS build-archipelago

# Can be a branch name or a tag
ARG SELECTED_BRANCH=master

# Leave empty if based on a tag or latest commit of the branch
ARG SELECTED_COMMIT=

WORKDIR /archipelago

RUN apk add --update --no-cache bash alpine-sdk openssh-keygen nano

RUN git clone --branch=${SELECTED_BRANCH} https://github.com/assemblee-virtuelle/archipelago.git /archipelago
RUN if [[ -n "$SELECTED_COMMIT" ]]; then git reset --hard ${SELECTED_COMMIT}; fi

WORKDIR /archipelago/frontend

RUN yarn install --frozen-lockfile

# App with source
FROM node:22-alpine AS build-app

COPY --from=build-archipelago /archipelago/frontend /app
WORKDIR /app

COPY app .

ARG VITE_MAPBOX_ACCESS_TOKEN
ARG VITE_MIDDLEWARE_URL
ENV VITE_MAPBOX_ACCESS_TOKEN=${VITE_MAPBOX_ACCESS_TOKEN}
ENV VITE_MIDDLEWARE_URL=${VITE_MIDDLEWARE_URL}

RUN yarn install --frozen-lockfile
RUN yarn build

# App serve (production)
FROM node:22-alpine AS prod
COPY --from=build-app /app/dist /app/dist
RUN yarn global add serve

WORKDIR /app

EXPOSE 4000

CMD sh -c "serve -s dist -l 4000"
