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
const { MongoClient } = require('mongodb');
// const mongoClient = new MongoClient()
const binary = mongodb.Binary
const bodyParser = require('body-parser');

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
const client = new MongoClient(DB);




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


async function test() {

  try {
    await client.connect()
    await testdb();
  }
  catch (err) {
    console.log('Error while inserting2:', err)
  }
  finally {
    await client.close();
  }
  // console.log('mongoClient ', client);


  async function testdb() {
    let db = client.db('natours')
    let collection = db.collection('audio')
    collection.insertOne({ 'file': 'res' })
  }


  // if (err) {
  //   console.log('mongoClient error', err);
  //   return err
  // }
  // else {
  // client.close()

}

// test();



async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  // const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";


  const client = new MongoClient(DB);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    // await client.close();
  }
}

// main().catch("client===>", console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  
  collection.insertOne({ 'file': 'res' })
  console.log("Databases:");

  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
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

app.post("/upload", async (req, res) => {
  console.log('post file upload', req);
  if (!req.body) return res.sendStatus(400);

  console.log('req.body.name', req.body['name']);
  // let file = { name: 'audio', file: binary(req.body['audio']) }
  let file = { name: 'audio', file: binary(req.body.data) }
  insertFile(file, res).catch("client===>", console.error);

  // makeFile(req.body.data).then((file)=>{

  // ,(error)=>{
  //   console.log('makeFile',error);
  // }})

})

//  function async makeFile(data) {
//   return await new Promise((resolve, reject) => {

//     resolve(file);
//   })
// }

async function insertFile(file, res) {
  await client.connect();
  let db = client.db('natours')
  let collection = db.collection('audio')
  collection.insertOne(file)

  // client.connect(DB, (err, client) => {
  //   console.log('mongoClient ', client);

  //   if (err) {
  //     console.log('mongoClient error', err);
  //     return err
  //   }
  //   else {
  //     let db = client.db('natours')
  //     let collection = db.collection('audio')
  //     try {
  //       collection.insertOne(file).then(() => {
  //         console.log('File Inserted')
  //         res.send({ success: 'success' })
  //       }, (err) => {
  //         console.log('Error while inserting1:', err)
  //       })


  //     }
  //     catch (err) {
  //       console.log('Error while inserting2:', err)
  //     }
  //     client.close()
  //     res.redirect('/')

  //   }

  // })
  //   .then((res) => {
  //     console.log('mongoClient', res);
  //   },(error)=>{
  //     console.log('mongoClient error', error);
  //   })
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
          fs.writeFileSync('audio.mp3', buffer)
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