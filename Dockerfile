# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# ```
# **What this does:**
# - **Stage 1** — spins up a Node container, installs dependencies, builds your app
# - **Stage 2** — takes only the `build/` output and puts it in a fresh Nginx container (no Node, no source code — small & safe)

# ---

# Also create a `.dockerignore` file in the same root folder:
# ```
# node_modules
# build
# .git
# .env