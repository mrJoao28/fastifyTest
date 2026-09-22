import { type FastifyInstance, type FastifySchema } from "fastify";
import { newUser, todosUsers, umUser, atualizaUser, delUser } from "../controller/user.js";

const idParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { 
      type: "string", 
      pattern: "^[0-9a-fA-F]{24}$" 
    }
  }
};

const userBodySchema = {
  type: "object",
  required: ["name", "email", "password"], 
  properties: {
    name: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" }, 
    password: { type: "string", minLength: 6 }
  }
};


const getOrDeleteSchema: FastifySchema = { params: idParamsSchema };
const postSchema: FastifySchema = { body: userBodySchema };
const putSchema: FastifySchema = { params: idParamsSchema, body: userBodySchema };

export async function userRoutes(server: FastifyInstance) {
  server.get("/allUsers", todosUsers);

  server.get("/user/:id", { schema: getOrDeleteSchema }, umUser);

  server.delete("/user/:id", { schema: getOrDeleteSchema }, delUser);

  server.post("/newUser", { schema: postSchema }, newUser);

  server.put("/updateUser/:id", { schema: putSchema }, atualizaUser);
}

