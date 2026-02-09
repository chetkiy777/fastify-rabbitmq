# Makefile для проекта fastify-rabbitmq

# Переменные
API_DIR = api
WORKER_DIR = worker

# .PHONY указывает, что цели не являются файлами.
.PHONY: all install build start stop down clean logs

# Цель по умолчанию: установить зависимости, собрать образы и запустить контейнеры.
all: install build start

# Установка npm-зависимостей в каждом сервисе.
install:
	@echo "--> Установка зависимостей для 'api'..."
	@cd $(API_DIR) && npm install
	@echo "--> Установка зависимостей для 'worker'..."
	@cd $(WORKER_DIR) && npm install
	@echo "--> Зависимости установлены."

# Сборка Docker-образов с отключенным кэшем для учета всех изменений.
build:
	@echo "--> Сборка Docker-образов..."
	@docker-compose build --no-cache

# Запуск всех сервисов в фоновом режиме (detached mode).
start:
	@echo "--> Запуск сервисов через docker-compose..."
	@docker-compose up -d

# Остановка запущенных контейнеров.
stop:
	@echo "--> Остановка сервисов..."
	@docker-compose stop

# Полная остановка и удаление контейнеров, сетей и томов.
down:
	@echo "--> Полная остановка и удаление контейнеров..."
	@docker-compose down

# Очистка проекта от сгенерированных файлов и зависимостей.
clean: down
	@echo "--> Очистка артефактов сборки и node_modules..."
	@rm -rf $(API_DIR)/dist $(API_DIR)/node_modules
	@rm -rf $(WORKER_DIR)/dist $(WORKER_DIR)/node_modules
	@echo "--> Проект очищен."

# Просмотр логов всех запущенных сервисов.
logs:
	@echo "--> Отображение логов..."
	@docker-compose logs -f

# Просмотр логов конкретного сервиса (например, make logs-api).
logs-api:
	@docker-compose logs -f fastify-api

logs-worker:
	@docker-compose logs -f rabbitmq-worker
