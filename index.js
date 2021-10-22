import { Client } from "@notionhq/client";
import { App } from "@slack/bolt";
import * as R from "ramda";
import { isToday, parseISO } from "date-fns";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const slack = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

async function getBirthdayUsers() {
  const notionUsers = await notion.databases.query({
    database_id: "c5aba6d2ffb741d7a02a65919818e555",
  });
  const birthdayUsers = R.filter(
    (item) => isToday(parseISO(item.properties.birthday.date.start)),
    notionUsers.results
  );
  return R.map((item) => {
    return {
      id: item.id,
      email: item.properties.email.title[0].plain_text,
    };
  }, birthdayUsers);
}

async function getSlackUsers() {
  const slackUsers = await slack.client.users.list();
  const filteredSlackUsers = R.filter(
    (item) => R.and(R.not(item.is_bot), R.not(item.name === "slackbot")),
    slackUsers.members
  );
  return R.map((item) => {
    return {
      id: item.id,
      email: item.profile.email,
    };
  }, filteredSlackUsers);
}

async function postMessage(text) {
  return await slack.client.chat.postMessage({
    text,
    channel: process.env.SLACK_CHANNEL_ID,
  });
}

async function main() {
  const birthdayUsers = await getBirthdayUsers();
  const slackUsers = await getSlackUsers();

  R.forEach((user) => {
    const slackUser = R.find(
      (item) => R.equals(user.email, item.email),
      slackUsers
    );
    if (R.not(R.isNil(slackUser))) {
      postMessage(`Happy b-day <@${slackUser.id}>`);
    }
  }, birthdayUsers);
}

main();
