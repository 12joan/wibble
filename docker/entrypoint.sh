#!/bin/bash
set -e

export TZ="Europe/London"

rm -f /code/tmp/pids/server.pid

bundle exec rails db:prepare

exec "$@"
