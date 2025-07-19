import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try{
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if(!file){
            return NextResponse.json({error: "No file provided"}, {status: 400});
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const base64String = buffer.toString('base64')
        const dataURI = `data:${file.type};base64,${base64String}`;

        const result = await new Promise((resolve, reject) => {
           cloudinary.uploader.upload(dataURI, {
            folder: "phongkham",
            resource_type: "auto",
           }, (error, result) => {
            if(error) reject(error);
            resolve(result);
           });
        });
        return NextResponse.json(result);
    }catch(error){
        console.error("Error uploading file to Cloudinary:", error);
        return NextResponse.json({error: "Failed to upload file"}, {status: 500});
    }
}