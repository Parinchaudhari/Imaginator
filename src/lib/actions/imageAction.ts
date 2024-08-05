"use server"

import { revalidatePath } from "next/cache"
import { connectToDDatabase } from "../database/mongoose"
import { handleError } from "../utils"
import User from "../database/models/userModel"
import Image from "../database/models/imageModel"
import { redirect } from "next/navigation"
import {v2 as cloudinary} from 'cloudinary' 

const populateUser=(query:any)=> query.populate({
    //which fued to populate
    path:'author',
    //from where to populate 
    model:User,
    //what to populate fromt he model methioned above
    select:'_id firstName lastName'
})


//ADD the image to database
export async function addImage({image,userId,path}:AddImageParams){
    try {
        await connectToDDatabase()
        const author=await User.findById(userId)
        
        if(!author){
            throw new Error("user not found")
        }

        const newImage=await Image.create({
            ...image,
            author:author._id
        })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(newImage))
    } catch (error) {
        handleError(error)
    }
}

//UPDATE IMAGE
export async function updateImage({image,userId,path}:UpdateImageParams){
    try {
        await connectToDDatabase()

        const imageToUpdate=await Image.findById(image._id)

        if(!imageToUpdate || imageToUpdate.author.toHexString() !==userId){
            throw new Error("Unauthorized or Image not found")
        }

        const udpatedImage=await Image.findByIdAndUpdate(imageToUpdate._id,image,{new:true})

        revalidatePath(path)

        return JSON.parse(JSON.stringify(udpatedImage))

    } catch (error) {
        handleError(error)
    }
}

//DELETE IMAGE
export async function deleteImage(imageId:string){
    try {
        await connectToDDatabase()
        
        await Image.findByIdAndDelete(imageId)

    } catch (error) {
        handleError(error)
    }finally{
        redirect('/')
    }
}

//GET IMAGE BY ID
export async function getImageById(imageId:string){
    try {
        await connectToDDatabase()

        const image=await populateUser(Image.findById(imageId))

        if(!image){
            throw new Error("Image not found")
        }

        return JSON.parse(JSON.stringify(image))

    } catch (error) {
        handleError(error)
    }
}

//GET ALL IMAGES
export async function getAllImages({limit=9,page=1,searchQuery=''}:{limit?:number,page:number,searchQuery?:String}){
    try {
        await connectToDDatabase()
        cloudinary.config({
            cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET,
            secure:true
        })
        let expression= 'folder=Imaginator'

        if(searchQuery){
            expression+=` AND ${searchQuery}`
        }

        const {resources}= await cloudinary.search.expression(expression).execute()

        const resourceIds=resources.map((resource:any)=> resource.public_id)

        let query={}

        if(searchQuery){
            query={
                publicId:{$in : resourceIds}
            }
        }

        const skipAmount=(Number(page) -1 )*limit;

        const images=await populateUser(Image.find(query)).sort({updatedAt:-1}).skip(skipAmount).limit(limit)

        const totalImages=await Image.find(query).countDocuments()
        const savedImages=await Image.find().countDocuments()

        return {
            data:JSON.parse(JSON.stringify(images)),
            totalPages:Math.ceil(totalImages/limit),
            savedImages,
        }
        
    } catch (error) {
        handleError(error)
    }
}