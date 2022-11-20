# TGBot builder

This is a web app that allows you to create simple telegram bots in UI.

## Concepts
Here in the app we operate on user states. Any user at any point in time 
is in some state. We can define a set of commands that are accessible to 
user in particular state. These commands have actions (e.g., "send message", "change state", etc).

For more information, please check [user manual](https://tgbot-builder.vercel.app/docs).

## Project structure

<img alt="App architecture" src="/images/architecture-diagram.png" width="650">

### Front-end

React + nextjs + MaterialUI.

It also includes simple CRUD functionality on nextjs functions to iteract with MongoDB.

### Bot-management

Node app that subscribes to `bots` collection in MongoDB via [Change Steams](https://www.mongodb.com/docs/manual/changeStreams/). It converts bot document into a spec for execution, sets up Webhook, and saves to Redis.

### Bot-execution

This is a server written in Go. It listens for updates from Telegram and when an update comes, it loads bot from Redis and executes needed actions.

### Chat-history

A separate service that collects info about user-bot conversations. It allows bot administrators watch messages in the conversations.

### Design
Kudos to @leprekonchek for design.

## Local development
### Requirements
- Docker and Docker Compose
- Node 14 or higher, `yarn` 1.x

### Firebase auth
The project relies on Firebase to handle auth. To develop localy, you need to 
create a new firebase project.
To do this, go to [Firebase console](https://console.firebase.google.com/). Create a project, go to project settings, create service account, and save creds locally.

### MongoDB
The project relies on Change Streams to subscribe to updates in MongoDB. Change Streams require replica sets, which are not easy to set up locally. So, as a workaround, 
you can create a free cluster at MongoDB Cloud and save connection string in an env var:
`export MONGODB_URL=<YOUR CONNNECTION STRING>`.

### Front-end
Front end needs to be run without Docker:
1. Copy ENV file: `cp .env.example .env.local`
2. Fill out `.env.local` with Firebase creds and MongoDB URL.
3. Run `yarn` to install deps
4. You can run project as `yarn dev` in dev mode or `yarn build & yarn start` in prod mode.

### Local tunnel
To accept updates from Telegram it is handy to use a local tunnel, such as [ngrok](https://ngrok.com/) or [expose](https://expose.dev/).
Tunnel port `8000` and save the URL to an env var `export TUNNEL_URL=<YOUR URL>`.

### Docker
Everything else can be run in Docker, check `docker-compose.yaml` for configuration.
To avoid errors, spin up Redis and RabbitMQ first: `docker-compose up -d redis rabbitmq`.
When they are up and running you can run all services: `docker-compose up -d`.

### Caveats
- Don't forget to manually clean webhook URL for your test bots, the service won't do it on shut down. Or you can alternatively disable it in UI, which should delete the webhook.
- Scheduled triggers are not stable yet and cannot be run locally.
