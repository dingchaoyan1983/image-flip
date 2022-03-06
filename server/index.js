const express = require('express')
const bodyParser = require('body-parser')
const JPEG = require('jpeg-js')
const jimp = require('jimp')
const multer  = require('multer')
const upload = multer()
const app = express()
const port = 3001
jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, { maxMemoryUsageInMB: 1024 });


app.use(bodyParser.urlencoded())

app.post('/api/file', upload.single('file'), (req, res) => {
  const img = req.file;
  jimp.read(img.buffer).then((image) => {
    // flip the image
    image.flip(true, true);
    // get the buffer and pipe it to http response
    image.getBuffer(jimp.MIME_JPEG, (err, buffer) => {
      res.set("Content-Type", jimp.MIME_JPEG);
      res.send(buffer);
    });
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})