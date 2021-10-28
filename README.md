# birthday-bot 🤖

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Birthday Bot is a slack app for keeping track of office birthdays.

## Getting started

```
git clone https://github.com/malcodeman/birthday-bot.git
cd birthday-bot
yarn install && yarn start
```

.env

```
NOTION_TOKEN
NOTION_DATABASE_ID
SLACK_SIGNING_SECRET
SLACK_BOT_TOKEN
SLACK_CHANNEL_ID
```

Slack app manifest

```
_metadata:
  major_version: 1
  minor_version: 1
display_information:
  name: Birthday App
features:
  bot_user:
    display_name: birthdaybot
    always_online: true
oauth_config:
  scopes:
    bot:
      - chat:write
      - chat:write.public
      - users:read
      - users:read.email
settings:
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```
