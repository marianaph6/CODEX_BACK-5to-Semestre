  
/**
 * ARCHIVO PRINCIPAL DEL API
 */

 const express = require("express");
 const cors = require("cors");
 //const fileUpload = require("express-fileupload");
 const router = require("./app/routers/index");
 const app = express();
 
 app.use(express.json());
 app.use(cors());
 //app.use(fileUpload());
 app.use("/", router);
 
 const PORT = 3001;
 app.listen(PORT, () => {
   console.log(`App listening on port: http://localhost:${PORT}`);
 });