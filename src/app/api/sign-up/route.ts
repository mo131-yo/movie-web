import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from 'svix';


type Event = {
    type: string;
    data:{
        id: string
        first_name: string;
        last_name: string;
        email_address : {email_address: string}[]
    }
}
export async function POST(req:NextRequest){
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if(!webhookSecret){
        return NextResponse.json({ error: "Missing webhookSecret"}, {status: 400})
    }
    const svixId = req.headers.get("svix-id")
    const svixTimestamp = req.headers.get("svix-timestamp")
    const svixSignature = req.headers.get("svix-signature")

    if(!svixId || !svixTimestamp || !svixSignature){
        return NextResponse.json({ error : "missing headers"}, {status: 400})
    }

    const webhook = new Webhook(webhookSecret);
    const body = await req.text()
    
    try{
        const event = webhook.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as Event

        if(event.type !== "user.created"){
            return NextResponse.json({error: "Ignore event"}, {status: 400})
        }

        const { email_address, first_name, last_name, id} = event.data

        await prisma.user.create({
            data:{
                email: email_address[0].email_address,
                name: `${first_name} ${last_name}`,
                clerkId: id,    
            }
        })
    }catch(error){
        return NextResponse.json({ error: "Invald signature"}, {status: 400})
    }
}