FROM node:12

WORKDIR /usr/src/pharmacy

COPY package*.json ./


COPY . .
RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]


# # ---- Base Node ----
# FROM ubuntu AS base

# ARG DEBIAN_FRONTEND=noninteractive
# # install node
# RUN apt update && curl -fsSL https://deb.nodesource.com/setup_12.x | bash - && apt install nodejs npm -y
# # set working directory
# WORKDIR /usr/src/pharmacy

# # copy project file
# COPY package.json .

# #
# # ---- Dependencies ----
# FROM base AS dependencies
# # install node packages
# RUN npm set progress=false && npm config set depth 0
# RUN npm install --only=production 
# # copy production node_modules aside
# RUN cp -R node_modules prod_node_modules
# # install ALL node_modules, including 'devDependencies'
# RUN npm install && npm run build

# #
# # ---- Release ----
# FROM base AS release
# # copy production node_modules
# COPY --from=dependencies /usr/src/pharmacy/prod_node_modules ./node_modules
# # copy app sources
# COPY . .
# # expose port and define CMD
# EXPOSE 3000

# CMD [ "npm", "start" ]
