import "dotenv/config"
import app from "./src/app"
import dbConnection from "./common/config/db"
const PORT = process.env.PORT

// 
const start = async ()=>{
    // db connections 
    dbConnection()
    app.listen(PORT,()=>{
        console.log("your server is started",process.env.NODE_ENV);
        
    })
}

start().catch(err) =()=>{
console.error("faild to start ",err);
process.exit(1);
}