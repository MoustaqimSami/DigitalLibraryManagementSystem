# Use a slim image
FROM node:22-alpine

# App root in the image
WORKDIR /app

# 1) Copy ONLY backend package manifests, then install
COPY backend/package*.json /app/backend/
WORKDIR /app/backend
RUN npm ci --omit=dev || npm ci

# 2) Copy backend source
COPY backend/ /app/backend/

# 3) Copy static frontend folder so Express can serve it
COPY Login/ /app/Login/

# 4) (Optional) copy other project assets you need at runtime
# COPY ImportDump/ /app/ImportDump/
# COPY database/ /app/database/

# If your backend connects to MySQL on Windows host
ENV DB_HOST=host.docker.internal \
    DB_PORT=3306 \
    DB_USER=root \
    DB_PASSWORD=admin \
    DB_NAME=librarymanagement \
    NODE_ENV=production

EXPOSE 3000
# Make sure backend/package.json has "start": "node index.js"
CMD ["npm","start"]
