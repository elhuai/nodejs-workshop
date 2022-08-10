const fs = require("fs");
const fsPromises = fs.promises;

async function readFile() {
  try {
    let content = await fsPromises.readFile("test   .txt", "utf8");
    console.log(content);
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error("發生錯誤", err);
  };
};

readFile();