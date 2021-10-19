import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function main() {
  const users = await notion.databases.query({
    database_id: "c5aba6d2ffb741d7a02a65919818e555",
  });

  console.log("users", users.results);
}

main();
