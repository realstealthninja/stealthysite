[![Node.js CI](https://github.com/realstealthninja/stealthysite/actions/workflows/node.js.yml/badge.svg)](https://github.com/realstealthninja/stealthysite/actions/workflows/node.js.yml)

# Stealthy site

Welcome to Stealthy site. This is the repository which contains the source code of my personal website.
I use this website to publish my blogs and host my portfolio.

## Project Structure

The project has a monorepo struture and is divded into loosely coupled softwares.

```
.
├── backend
└── frontend

```

You can find more information about each part in their respective folders.

## Development

Before deployement make sure you have set your environment variables correctly.

```sh
mv template.env .env
```

#### structre of dotenv

```
...
# the admin account for the site
SPRING_ADMIN_EMAIL=
SPRING_ADMIN_USER=
SPRING_ADMIN_PASSWORD=
```

### dependencies

You can find the dependencies for building in their respective folders.
Here are the rough requirments for running both

- [Java 21](https://openjdk.org/projects/jdk/21/)
- [Node.js](https://nodejs.org/en) ^v22

### Source

You can get the source by cloning project locally

```sh
git clone https://www.github.com/realstealthninja/stealthysite.git
```

### Deployment

```sh
docker compose up
```

The above command will start frontend, backend, postgres, and postgres admin
You can also selectively turn on the specified containers. Learn more about [docker compose](https://docs.docker.com/compose)
