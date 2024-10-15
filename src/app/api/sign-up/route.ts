import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'

import { senVerificationEmail } from "@/app/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect()

    try {
           const {username,email,password} =  await request.json()  
           const existingUserVerifiedByUsername = await UserModel.findOne({
             username,
             isVarified:true
           })

           if(existingUserVerifiedByUsername){
              return Response.json(
                {
                    success:false,
                    message:"Username is already taken"
                },{status:400}
              )
           }
           const existingUserByEmail = await UserModel.findOne({email})

           if(existingUserByEmail){
              true // TODO: Back here
           }else{
            const   await bcrypt.hash(password,10);
           }

    } catch (error) {
        console.log("Error registring user", error)
        return Response.json(
            {
                success: false,
                message: "Error registring user"
            },
            {
                status:500
            }
        )
    }
}