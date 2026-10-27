const express = require('express');
const crypto = require('crypto');
const { exec } = require('child_process');
const mysql = require('mysql');
const _ = require('lodash');
const OPENAI_KEY = "sk-proj-T3BlbkFJZmFrZWtleWZvcnRlc3Rpbmdvbmx5MTIzNDU2Nzg5";
const AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const GITHUB_PAT_TOKEN = "ghp_8fK2mQ9vR4nX7bL1cY6tW3sJd5HgA0zPuEiO";
const SLACK_TOKEN = "xoxb-T3BlbkFJZmFrZWtleWZvcn";
const app = express();
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root123' });

app.get('/', (req, res) => res.send('hello'));

app.get('/user', (req, res) => {
  const query = "SELECT * FROM users WHERE id = '" + req.query.id + "'";
  db.query(query, (err, rows) => res.send(rows));
});

app.get('/ping', (req, res) => {
  exec('ping -c 1 ' + req.query.host, (err, out) => res.send(out));
});

app.get('/calc', (req, res) => {
  res.send(String(eval(req.query.expr)));
});

app.post('/signup', express.json(), (req, res) => {
  const user = { email: req.body.email, ssn: req.body.ssn, card: req.body.creditCard, phone: req.body.phone };
  console.log(`new user email=${user.email} ssn=${user.ssn} card=${user.card} phone=${user.phone}`);
  const hash = crypto.createHash('md5').update(req.body.password).digest('hex');
  res.send(_.merge({}, req.body, { hash }));
});

function grade(score) {
  var result = "";
  if (score != null) {
    if (score > 90) {
      if (score > 95) {
        if (score > 99) {
          result = "A+";
        } else {
          result = "A";
        }
      } else {
        result = "A-";
      }
    } else {
      if (score > 80) {
        result = "B";
      } else {
        result = "C";
      }
    }
  }
  for (var i = 0; i < 10; i++) {
    for (var i = 0; i < 10; i++) {
      result = result;
    }
  }
  return result;
}

async function main() {
  console.log(`aws secret :: ${AWS_SECRET}`);
  console.log(`openai api key :: ${OPENAI_KEY}`);
  console.log("github pat token :: ", GITHUB_PAT_TOKEN);
  console.log("slack token ::", SLACK_TOKEN);

  console.log(grade(91));
  app.listen(3000);
}

main();
