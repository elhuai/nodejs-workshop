const fs = require("fs");
const fsPromises = fs.promises;

async function readFile() {
  try {
    let content = await fsPromises.readFile("test.txt", "utf8");
    console.log(content);
  } catch (err) {
    console.error("發生錯誤", err);
  };
};

readFile();