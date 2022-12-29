const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './',
    filename: function(req,file,cb){
        cb(null,Date.now() + '.' + file.mimetype.split('/')[1])
    },
    
})

const upload = multer({storage:storage})
app.use(cors());
    app.post('/',upload.single('file'),(req,res) => {})
    app.listener(port, ()=> console.log(`listening on port ${port}`));