import mongoose, {Mongoose} from 'mongoose'

let MongoDBUri=process.env.MONGO_CONNECT_STRING;

interface mongooseConnection{
    conn:Mongoose | null,
    promise: Promise<Mongoose> | null;
}

let cached:mongooseConnection=(global as any).mongoose;

if(!cached){
    cached=(global as any).mongoose={
        conn:null,
        promise:null
    }
}

export const connectToDDatabase=async()=>{
    if(cached.conn) return cached.conn;
    if(!MongoDBUri){
        throw new Error("MongoDb uri not defined")
    }
    cached.promise=cached.promise || mongoose.connect(MongoDBUri)

    cached.conn=await cached.promise
    return cached.conn
}