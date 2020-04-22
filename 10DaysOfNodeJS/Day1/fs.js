const fs = require("fs");
const path = require("path");

// create folder
// fs.mkdir(path.join(__dirname, "test"), {}, err => {
//   if (err) throw err;
//   console.log("Folder Created");
// });

// create and write to a file
// fs.writeFile(
// fs.appendFile(
//   path.join(__dirname, '/test', 'hello.txt'),
//   'Hello nickie',
//   err => {
//     if (err) throw err;
//     console.log(" Auto Folder Created");
//   }
// );

// read to a file
// fs.writeFile(
    fs.readFile(
        path.join(__dirname, '/test', 'hello.txt'),
        'utf8',
        (err, data) => {
          if (err) throw err;
          console.log(" Auto Folder Created", data);
        }
      );