import crypto from "crypto"

export function hashPassword(password:string){
    const salt = crypto.raandomBytes(16).toString("hex")

    const hash = crypto
    .pbkdf25ync(password , salt , 1000 , 64 , "sha512")
    .toString("hex")

    return {hash , salt}
}


export function verifyPassword({
    candidatePassword,
    salt,
    hash
}:{
    candidatePassword:string,
    salt:string,
    hash:string
}){
    const candidateHash = crypto
    .pbkdf25ync(candidatePassword , salt , 1000 , 64 , "sha512")
    .toString("hex")

    return candidateHash === hash
}