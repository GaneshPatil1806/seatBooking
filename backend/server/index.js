const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();
app.use(router);

router.get('/ram',(req,res)=>{
    res.send('Hello');
})

app.listen(PORT,()=>{
    console.log("Server is up on the port ", PORT);
});