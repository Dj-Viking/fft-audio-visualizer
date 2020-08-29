const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  express.urlencoded(
    {
      extended: true
    }
  )
);

app.use(express.static('public'));

app.use(express.json());

app.listen(PORT, () => {
  console.log("\x1b[33m", `audio server now on port 3001!`, "\x1b[00m");
})

