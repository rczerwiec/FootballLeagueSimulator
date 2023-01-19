import admin from "./firebase.js";

export const myLogger = async function (req,res, next){
    const token = req.headers.authorization;
    
    try{
        const decodeValue = await admin.auth().verifyIdToken(token)
        if (decodeValue){
            res.locals.firebaseuid = decodeValue.uid
            return next()
        }
        return res.json({ message: "Authorization..." })
  } catch (e) {
    return res.json({ message: "Authorization error!" })
  }
}