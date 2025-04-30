#!/bin/sh

# Wait until Mongo is healthy
echo "Waiting for MongoDB to be healthy..."
until nc -z mongo 27017; do
  sleep 1
done

export PYTHONPATH=/app

# Run Mongo init script as module
python -m app.db.init_mongo

# Start the app
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
