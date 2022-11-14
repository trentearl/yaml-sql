const yaml = require("js-yaml");
const fs = require("fs");
const express = require("express");
const DB = require("mysql2");

const app = express();
const [_, __, YAML_FILE, PORT] = process.argv;

if (!YAML_FILE) {
  console.error("Missing arguments. node index.js [YAML file] [Port]");
  process.exit(1);
}

if (!PORT) {
  console.error(`Missing 2nd argument. node index.js ${YAML_FILE} [Port]`);
  process.exit(1);
}

const connection = DB.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

try {
  const contents = fs.readFileSync(YAML_FILE, "utf8");
  const doc = yaml.load(contents);

  doc.forEach((block) => {
    app.get(block.route, (req, res, next) => {
      connection.query(block.sql, function (err, results, fields) {
        if (err) next(err);
        else res.json(results);
      });
    });
  });

} catch (e) {
  console.error('ERROR');
  console.error(e);
}

app.listen(PORT);

