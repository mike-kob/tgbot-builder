# Telegram bot builder

This is a web app that allows you to create simple telegram bots in UI.

## Concepts
Here in the app we operate on user states. Any user at any point in time 
is in some state. We can define a set of commands that are accessible to 
user in particular state. This commands in their turns have actions 
(for now, only "send message" and "change state" actions).


## Project structure

### frontend

React + nextjs + material ui.

### backend

Simple node + express + mongodb server to store user info, bots and to 
conver bots to the format in which they are interpreted.

### runtime

This is a server written in Go. It has access to bot executable schemas 
and receives all updates. When the destination bot for the update is 
determined the update is run through the executable schema of the 
corresponding bot.

Kudos to @leprekonchek for design.