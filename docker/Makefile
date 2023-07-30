include .env

# container names
PHP_FPM=php-fpm-${PHP_VERSION}
#DB_CONTAINER_NAME=$(DOCKER)_mariadb_1
WEB_SERVER=nginx
NODE=node-${NODE_VERSION}

# mysql variables
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

# date
DATE=$(shell date +'%Y-%m-%d')

LIST_OF_CONTAINERS_TO_RUN=${WEB_SERVER} ${PHP_FPM}


# the first target is the one that executed by default
# when uesr call make with no target.
# let's do nothing in this case
.PHONY: nop
nop:
	@echo "Please pass a target you want to run"

# custom targets

# put them here

#--------

# run all containers
.PHONY: up
up:
	docker-compose up -d $(LIST_OF_CONTAINERS_TO_RUN)

.PHONY: up node
upnode:
	docker-compose run $(NODE) sh

# stop all containers
.PHONY: down
down:
	docker-compose down

#run rebuild all containers
.PHONY: rebuild containers
reup:
	docker-compose up -d --no-deps --build $(LIST_OF_CONTAINERS_TO_RUN)

.PHONY: rebuild php-fpm
rephp:
	docker-compose up -d --no-deps --build $(PHP_FPM)

.PHONY: rebuild mariadb
redb:
	docker-compose up -d --no-deps --build $(DB)

.PHONY: rebuild web-server
reweb:
	docker-compose up -d --no-deps --build $(WEB_SERVER)

.PHONY: rebuild node
renode:
	docker-compose up -d --no-deps --build $(NODE)

# show docker log
.PHONY: docker log
log:
	docker-compose logs -f

# JOIN containers targets

.PHONY: join php
jphp:
	docker exec -it $(PHP_FPM) sh

.PHONY: join db
jdb:
	docker exec -it $(DB) mysql -u maks -p

.PHONY: join web-server
jweb:
	docker exec -it $(WEB_SERVER) sh

.PHONY: join node
jnode:
	docker exec -it $(NODE) sh

# events
.PHONY: event php-fpm
ephp:
	docker event ${PHP_FPM}

.PHONY: event web-server
eweb:
	docker event ${WEB_SERVER}

# ports
.PHONY: ports php-fpm
portphp:
	docker port ${PHP_FPM}

.PHONY: ports web-server
portweb:
	docker port ${WEB_SERVER}

# top
.PHONY: top php-fpm
topphp:
	docker top ${PHP_FPM}

.PHONY: top web-server
topweb:
	docker top ${WEB_SERVER}

# diff
.PHONY: diff php-fpm
diffphp:
	docker diff ${PHP_FPM}

.PHONY: diff web-server
diffweb:
	docker diff ${WEB_SERVER}

# remove unused 
.PHONY: remove unused 
rs:
	docker system prune

.PHONY: remove all 
rsa:
	docker system prune -af