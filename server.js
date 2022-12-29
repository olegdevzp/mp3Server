const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
    },

})

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
//
app.post('/',  upload.single('file'), (req, res) => { 
// console.log('file')
})
app.post('/', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
  });
  
app.listen(port, () => console.log(`listening on port ${port}`));