# Docker Container for Sorghum Metabolic Atlas App
# Author: Oleg Panikarovskiy <oleg.pnk@gmail.com>
# Adapted for Google Cloud by: Garret Huntress <ghuntress@carnegiescience.edu>

# NOTE: From MUST be first command
### Build Stage
# Use Node.js Long Term Support Image for Code Building
FROM node:lts-alpine3.13 as builder

# Get Hosting Configuration Arguments
ARG AUTH_TOKEN
ARG AUTH_MASTERPASS
ARG PGSQL_HOST
ARG PGSQL_PORT=5432
ARG PGSQL_DB
ARG PGSQL_USER
ARG PGSQL_PASS

# Create SMA App Build Directory
WORKDIR /opt/sma_app_build

# Copy SMA App Code to Build Directory
COPY . .

# Work on Client
WORKDIR /opt/sma_app_build/client

# Install SMA App Client Dependencies
RUN npm install

# FIX FOR BUILD ERROR: Cannot find module 'webpack-sources'
RUN npm i --save webpack-sources

# Compile SMA App Client Typescript to Javascript
RUN npm run build

# Work on Server
WORKDIR /opt/sma_app_build

# Install SMA App Server Dependencies
RUN npm install

# Compile SMA App Server Typescript into Javascript
RUN npm run build

# Configure SMA App
RUN ./cloudconfig.sh -t "$AUTH_TOKEN" -m "$AUTH_MASTERPASS" -h "$PGSQL_HOST" -d "$PGSQL_DB" -u "$PGSQL_USER" -p "$PGSQL_PASS" app.prod.json

### Done With Build Stage

### Install Stage
# Use Node.js Long Term Support Image for Install
FROM node:lts-alpine3.13

# Metadata
LABEL name="Sorghum Metabolic Atlas App"
LABEL author="oleg.pnk@gmail.com"
LABEL maintainer="ghuntress@carnegiescience.edu"
LABEL description=""

# Create SMA App System User
RUN adduser --system sma_app
RUN addgroup --system sma_app

# Create and Use SMA App Directory
WORKDIR /opt/sma_app

# Copy SMA App Dependency Manifests
COPY package*.json ./

# Install SMA App production dependencies
RUN npm install --only=production

# Copy Build SMA App Client
COPY --from=builder /opt/sma_app_build/public/ public/

# Copy Built SMA App Server
COPY --from=builder /opt/sma_app_build/dist/ dist/

# Copy SMA App Config
COPY --from=builder /opt/sma_app_build/app.prod.json .

# Change Ownership of SMA App Directory to SMA App System User
RUN chown -R sma_app /opt/sma_app

# Work as App System User
USER sma_app:sma_app

# Expose Container Port 3000
EXPOSE 3000

# Set SMA App Start Command
CMD [ "npm", "start" ]

