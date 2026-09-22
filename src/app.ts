import Fastify from "fastify"
import {userRoutes} from "./routes/user_route.js"

const app = Fastify({
    logger:true
})

app.register(userRoutes)

app.listen({port:3000} , function (err,address){
    if (err){
        app.log.error(err)
        process.exit(1)
    }
})