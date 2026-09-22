import Fastify from "fastify"
import { userRoutes } from "./routes/user_route.js"
import { start } from "./data/db.js";
import "dotenv/config";

const app = Fastify({
    logger:true
})

app.register(userRoutes)

app.listen({port:process.env.PORT} , async (err,address)=>{
    await start()
    if (err){
        app.log.error(err)
        process.exit(1)
    }
})