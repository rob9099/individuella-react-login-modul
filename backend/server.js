const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const routesURLs = require ('./routes/routes');
const cors = require ('cors')
const http = require ('http')
dotenv.config()

/*const server = http.createServer((req, res) =>{
    if (req.url == '/'){
        res.write('hello world')
        res.end()
    }
})*/

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected'))



app.use(express.json());
app.use(cors());
app.use('/app', routesURLs);
app.listen(4000, () => console.log('server running on port 4000'));