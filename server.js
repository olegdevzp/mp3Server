const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer');
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const router = express.Router()
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary

const storage = multer.diskStorage({
  destination: './',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
  },

})

dotenv.config({ path: './config.env' });;

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
)
// mongoose.set("strictQuery", true);
// mongoose
// .connect(DB, {
//   // .connect(process.env.DATABASE_LOCAL, {
//   //
//   useNewUrlParser: true,
//   useUnifiedTopology: true
//   // useCreateIndex: true,
//   // useFindAndModify: false
// }).then((con) => {
//   console.log(con.connections);
//   console.log('DB connection successful');
// })



const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

const upload = multer({ storage: storage })
app.use('*', cors(corsOptions));
app.use(fileUpload())
//
// app.post('/',  upload.single('file'), (req, res) => { 
// console.log('file')
// })
app.post('/', cors(corsOptions), (req, res, next) => {
  res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
});

app.get("/", (req, res) => res.type('html').send(html)

);
app.post("/", (req, res) => {
  console.log(' post /');

})
app.post("/upload", (req, res) => {
  console.log('post file upload');
  let file = { name: req.body.name, file: binary(req.files.uploadedFile.data) }
  insertFile(file, res)
})


function insertFile(file, res) {
  mongoClient.connect(process.env.DATABASE, { useNewUrlParser: true }, (err, client) => {
      if (err) {
          return err
      }
      else {
          let db = client.db('natours')
          let collection = db.collection('audio')
          try {
              collection.insertOne(file)
              console.log('File Inserted')
          }
          catch (err) {
              console.log('Error while inserting:', err)
          }
          client.close()
          res.redirect('/')
      }

  })
}

function getFiles(res) {
  mongoClient.connect(process.env.DATABASE, { useNewUrlParser: true }, (err, client) => {
      if (err) {
          return err
      }
      else {
          let db = client.db('natours')
          let collection = db.collection('audio')
          collection.find({}).toArray((err, doc) => {
              if (err) {
                  console.log('err in finding doc:', err)
              }
              else {
                  let buffer = doc[0].file.buffer
                  fs.writeFileSync('uploadedImage.jpg', buffer)
              }
          })
          client.close()
          res.redirect('/')
      }

  })
}

// app.use("/", router)

app.listen(port, () => console.log(`listening on port ${port}`));















const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`