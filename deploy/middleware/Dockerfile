FROM node:22-alpine AS prod

# Can be a branch name or a tag
ARG SELECTED_BRANCH=master

# Leave empty if based on a tag or latest commit of the branch
ARG SELECTED_COMMIT=

WORKDIR /archipelago

RUN apk add --update --no-cache bash alpine-sdk openssh-keygen nano

RUN yarn global add pm2

RUN git clone --branch=${SELECTED_BRANCH} https://github.com/assemblee-virtuelle/archipelago.git /archipelago
RUN if [[ -n "$SELECTED_COMMIT" ]]; then git reset --hard ${SELECTED_COMMIT}; fi

WORKDIR /archipelago/middleware

RUN yarn install --production --frozen-lockfile

COPY app .

RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD [ "pm2-runtime", "ecosystem.config.js" ]
