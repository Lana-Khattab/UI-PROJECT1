#!/bin/sh
set -e

echo "Waiting for MongoDB to be ready..."
until node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('MongoDB is ready'); process.exit(0); })
  .catch(() => process.exit(1));
" 2>/dev/null; do
  echo "MongoDB not ready, retrying in 2 seconds..."
  sleep 2
done

echo "Running database seeder..."
node seeders/recipeSeeder.js

echo "Starting server..."
exec node server.js

