.DEFAULT_GOAL := help
.PHONY: docker-build docker-up build start log stop restart

DOCKER_COMPOSE_TEST=docker-compose -f docker-compose-test.yaml
DOCKER_COMPOSE_PROD=docker-compose -f docker-compose.yaml

# Docker
docker-build-test:
	$(DOCKER_COMPOSE_TEST) build

docker-build-prod:
	$(DOCKER_COMPOSE_PROD) build

docker-up-test:
	$(DOCKER_COMPOSE_TEST) up -d

docker-stop-test:
	$(DOCKER_COMPOSE_TEST) down

docker-stop-prod:
		$(DOCKER_COMPOSE_PROD) down

docker-clean-test:
	$(DOCKER_COMPOSE_TEST) down

docker-start-test:
	$(DOCKER_COMPOSE_TEST) up -d --force-recreate

docker-start-prod:
	$(DOCKER_COMPOSE_PROD) up -d --force-recreate

docker-restart-test:
	$(DOCKER_COMPOSE_TEST) up -d --force-recreate

log-test:
	$(DOCKER_COMPOSE_TEST) logs -f fuseki middleware frontend

log-prod:
	$(DOCKER_COMPOSE_PROD) logs -f fuseki middleware frontend

start-test: docker-start-test

start-prod: docker-start-prod

stop-test: docker-stop-test

stop-prod: docker-stop-prod

restart-test: docker-restart

build-test: docker-build-test

build-prod: docker-build-prod
