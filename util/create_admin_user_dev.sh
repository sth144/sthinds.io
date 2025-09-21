#!/bin/bash

# Config
DB_NAME="${DB_NAME:-dev}"
COLLECTION="${COLLECTION:-user}"
MONGO_HOST="${MONGODB_HOST:-localhost}"
MONGO_PORT="${MONGODB_PORT:-27017}"
MONGO_USER="${MONGODB_USERNAME:?Please set MONGO_USER}"
MONGO_PASS="${MONGODB_PASSWORD:?Please set MONGO_PASS}"

# Construct URI
MONGO_URI="mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}?authSource=admin"

# Upsert the user
echo "Upserting document into $DB_NAME.$COLLECTION..."
mongosh "$MONGO_URI" --eval "
db.${COLLECTION}.updateOne(
  { _id: ObjectId('6503e1a0b9f1c2d3e4f56789') },
  { \$set: {
      email: 'sthinds144@gmail.com',
      firstName: 'Sean',
      lastName: 'Hinds'
    }
  },
  { upsert: true }
)"
