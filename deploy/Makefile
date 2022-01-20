.DEFAULT_GOAL := help
.PHONY: docker-build docker-up build start log stop restart

DOCKER_COMPOSE_DEV=docker-compose -f docker-compose-dev.yaml
DOCKER_COMPOSE_PROD=docker-compose -f docker-compose.yaml

# Docker
docker-build-dev:
	$(DOCKER_COMPOSE_DEV) build

docker-build-prod:
	$(DOCKER_COMPOSE_PROD) build

docker-up-dev:
	$(DOCKER_COMPOSE_DEV) up -d

docker-stop-dev:
	$(DOCKER_COMPOSE_DEV) down

docker-stop-prod:
		$(DOCKER_COMPOSE_PROD) down

docker-clean-dev:
	$(DOCKER_COMPOSE_DEV) down

docker-start-dev:
	$(DOCKER_COMPOSE_DEV) up -d --force-recreate

docker-start-prod:
	$(DOCKER_COMPOSE_PROD) up -d --force-recreate

docker-restart-dev:
	$(DOCKER_COMPOSE_DEV) up -d --force-recreate

log-dev:
	$(DOCKER_COMPOSE_DEV) logs -f fuseki middleware frontend

log-prod:
	$(DOCKER_COMPOSE_PROD) logs -f fuseki middleware frontend

start-dev: docker-start-dev

start-prod: docker-start-prod

stop-dev: docker-stop-dev

stop-prod: docker-stop-prod

restart-dev: docker-restart

build-dev: docker-build-dev

build-prod: docker-build-prod
