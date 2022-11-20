# TGBot builder

This is a web app that allows you to create simple telegram bots in UI.


## Concepts
Here in the app we operate on user states. Any user at any point in time 
is in some state. We can define a set of commands that are accessible to 
user in particular state. These commands have actions (e.g., "send message", "change state", etc).

For more information, please check [user manual](https://tgbot-builder.vercel.app/docs)

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


Kudos to @leprekonchek for design.
