const PORT  = process.env.PORT || 3000;
const express = require('express');
const app = express();

const path = require('path');
const multer = require('multer');
const { Console } = require('console');
const { nextTick } = require('process');

let storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, './subida')
    },
    filename:(req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
    return res.send('this is the home page');
});

app.post('/subir', upload.single('file'), (req, res)=>{
    console.log(`Storage location is ${res.hostname}/${req.file.path}`);
    return res.send(req.file); 
})

app.listen(PORT, ()=> console.log(`Server is up on port: ${PORT}`));