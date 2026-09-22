
import usersCollection from "../data/db.js";
import { type User } from "../data/db.js";
import { ObjectId } from "mongodb";



export async function createUser(input:any){
    await usersCollection.insertOne(input)
    return input
}

export async function allUsers(){
    const users = await usersCollection.find()
    return users
}

export async function oneUser(id:ObjectId){
    const foundUser = await usersCollection.findOne({id:id})
    if (typeof foundUser == undefined) return undefined
    return foundUser
} 

export async function updateUser(id:ObjectId ,updates:any){
    const updatedUsser = await usersCollection.updateOne({id:id},{$set:updates})
    if (typeof updateUser == undefined) return undefined
    return updateUser
}

export async function deleteUser(id:ObjectId){
    await usersCollection.deleteOne({id:id})
    return true
}
