import { Client } from "@notionhq/client";
import fs from 'fs'
import { config } from "dotenv"
config()


const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;


async function readCSV(path) {
  let data = [];
  try {
    const fileData = await fs.readFileSync(path, 'utf-8')
    const parsedData = fileData.split('\r\n')
    const header = parsedData.shift().split(',')
    parsedData.forEach((cell) => {
      const content = cell.split(',')
      data.push(content)
    })
    return [header, data]

  } catch (e) {
    console.error(e)
  }

  return [[], data]
}

async function addItem(header, data) {

  data.forEach(async (dataField) => {
    let request = {
      parent: { database_id: databaseId },
      properties: {},
    }

    request.properties[header[0]] = { "title": [{ "text": { "content": dataField[0] } }] }

    for (let i = 1; i < header.length; i++) {
      request.properties[header[i]] = {
        "rich_text": [
          {
            "text": {
              "content": dataField[i]
            }
          }
        ]
      }
    }
    try {
      const response = await notion.pages.create(request);
      console.log(response);
      console.log("Success! Entry added.");
    } catch (error) {
      console.error(error.body);
    }
  })

}

async function main() {
  const args = process.argv.slice(2)
  const [header, data] = await readCSV(args[0])
  addItem(header, data)
}
main()