const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/user-manager-web')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/user-manager-web/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
