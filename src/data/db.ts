import { MongoClient , ObjectId } from "mongodb";



export interface User {
    _id?:ObjectId,
    name:string,
    email:string,
    password:string
}

const url:any = process.env.DB_URL

if (!url) {
  throw new Error("DB_URL invalid");
}
const client = new MongoClient(url)

await client.connect();
const db = client.db("fastifyTest")
const usersCollection = db.collection<User>("users");

export default usersCollection