const express = require('express');
const { request, response } = require('express');
const bodyParser = require('body-parser');
const {Client} = require('pg');
const multer = require('multer');
const app = express();
const {DatabaseConfig} = require('./configs/database.config');
const port = 4000;

const client = new Client(DatabaseConfig);
client.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Method', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(__dirname + '/public/img'));

app.get('/catalog', (request, response) =>
{
    client.query('select * from product' , (err, res)=>
    {
        let ltr = JSON.stringify(res.rows);
        response.send(ltr);
    });
});

app.post('/admin', (request, response)=>{
    const {login, password} = request.body;
    console.log('login:', login);
    console.log('password: ', password);
    const data = {log: 'a', pas: 'b'};
    if(login === data.log && password ===data.pas)
    {
        response.send("y");
    }
    else
    {
        response.send("n");
    }
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/img');
    },
    filename: (req, file, cb)=>{
        cb(null, (file.originalname));
    }
});
const upload = multer({storage: storage});
const upfiles = upload.fields([{name: 'img', maxCount: 5}]);
app.post('/addTovar', upfiles, (request, response)=>{
    const dataform = request.body;
    const files = request.files['img'];
    console.log(files);
    const url = files.map((item, index, array)=>{
        return item.originalname;
    });
    if(true)                                          //проверка пароля
    {
        addDB(dataform, url);
        response.send("Добавлено");
    }
    else response.send("Ошибка аутентификации");
});

function addDB(dataform, url_files)
{
    
    const {
        cat, 
        subC, 
        manuf, 
        name, 
        minD, 
        fullD, 
        char,
        price} = dataform;
    
    
    const http = 'http://localhost:4000/';
    const URL = url_files.map((item, index, array)=>{
        return http + item;
    });
    
    const command = 'INSERT INTO PRODUCT (category, subcategory, manufacturer, name_of_product, img_adress, mini_description, full_description, characters, price)' 
                    + 'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);';
    const values = [cat, subC, manuf, name, URL, minD, fullD, char, price];

    console.log("Катеогия: ",cat);
    console.log("Подкатегория: ",subC);
    console.log("Производитель: ",manuf);
    console.log("Название: ",name);
    console.log("Адреса картинок: ",url_files);    
    console.log("Краткое описание: ",minD);
    console.log("Описание: ",fullD);
    console.log("Характеристики: ",char);
    console.log("Цена", price);
    console.log(values);
    
    client.query(command, values, (err, res)=>{
        if(err){
            console.log("ОШИБКА",err);
        }
        else{
            console.log("ДОБАВЛЕНО В БАЗУ");
        }
    });
   
}

app.post('/deleteTovar', (request, response)=>{
    const {login, password} = request.body.user;
    console.log("login: ", login, "password: ", password);
    const {id, category, subcategory, manufacturer, name_of_product} = request.body;
    const command = 'DELETE FROM PRODUCT WHERE ID = $1 AND NAME_OF_PRODUCT = $2';
    const values = [id, name_of_product];
    client.query(command, values, (err, res)=>{
        if(err)
        {
            console.log("ERROR, NOT DELETED", err);
        }
        else{
            console.log("SUCCESFULL DELETED IN DATABASE", "PRODUCT: ", id, ' ', name_of_product);
        }
    });
});

app.listen(port, ()=>{
    console.log('Сервер запущен на порте: ', port);
});