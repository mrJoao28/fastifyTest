import { FastifyReply , FastifyRequest } from "fastify";
import { verifyPassword } from "../utils/hash.js";
import { CreateUserInput, LoginInput } from "../models/user_schema.js";
import { createUser , allUsers , oneUser ,updateUser ,deleteUser } from "../services/user_services.js";
import type { ObjectId } from "mongodb";
import type { User } from "../data/db.js";
import { brotliDecompressSync } from "node:zlib";

export interface RouteGeneric {
    Params:{
        id:ObjectId
    }
    body ?: User
}

export async function todosUsers(req:FastifyRequest,res:FastifyReply){
    const body = req.body
    try {
        const users = await allUsers()
        return res.code(201).send(users)
    } catch (e){
       return res.code(501).send(e)
    }
}

export async function umUser(req:FastifyRequest<RouteGeneric>,res:FastifyReply){
    const {id} = req.params
    try{
        const foundUser = oneUser(id)
        if (typeof foundUser == undefined) return res.code(404).send({message:"dont found user"})
        return res.code(201).send(foundUser)
    } catch(e){
        return res.code(501).send(e)
    }
}


export async function newUser(req:FastifyRequest<RouteGeneric>,res:FastifyReply){
    const body = req.body
    try {
        const user = await createUser(body)
        return res.code(201).send(user)
    } catch(e){
        return res.code(501).send(e)
    }
}

export async function atualizaUser(req:FastifyRequest<RouteGeneric>,res:FastifyReply){
    const {id} =req.params
    const body = req.body
    try {
        const user = await updateUser(id,body)
        if (typeof user == undefined) return res.code(404).send("Miss the id")
        return user
    } catch(e){
        return res.code(501).send(e)
    }
}

export async function delUser(req:FastifyRequest<RouteGeneric>,res:FastifyReply){
    const {id} = req.params
    try {
        await deleteUser(id)
        return res.code(201).send({message:"User deleted"})
    } catch(e){
        return res.code(501).send(e)
    }
}