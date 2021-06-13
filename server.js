var express = require('express');
var cors = require('cors');
var fileUpload = require('express-fileupload')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload());

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  if (!req.files) {
    res.json({
      error: 'No file received'
    })
  } else {
    const file = req.files.upfile;
    const name = file.name;
    const type = file.mimetype;
    const size = file.size;
    res.json({
      name: name,
      type: type,
      size: size
    })
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
