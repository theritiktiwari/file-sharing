import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";
import { execSync } from "child_process";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

const generateSecretCode = () => {
    const randomString = execSync('openssl rand -hex 32').toString();
    return randomString;
};

export const config = {
    api: {
        bodyParser: false,
    },
};

const saveFile = async (file: any) => {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const readableStream = Readable.from(buffer);

        const options = {
            pinataMetadata: {
                name: file.name,
            },
        };
        const response = await pinata.pinFileToIPFS(readableStream, options);
        return response;
    } catch (error) {
        throw error;
    }
};

export async function POST(request: NextRequest, res: any) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as Blob | null;
        if (!file) {
            return NextResponse.json({
                type: "error",
                message: "File is required.",
            }, { status: 400 });
        }

        console.log({ file, r: request.body.emails });
        // get the emails array from the form data
        // const emails = JSON.parse(formData.get("emails") as string);
        // if (!emails || emails?.length === 0) {
        //     return NextResponse.json({
        //         type: "error",
        //         message: "Email is required.",
        //     }, { status: 400 });
        // }

        // console.log({ file, emails });

        // const userToken = generateSecretCode();
        // const saveData = await saveFile(file);
        // const saveData = {};

        // if (!saveData?.IpfsHash) {
        //     return NextResponse.json({
        //         type: "error",
        //         message: "File not uploaded.",
        //     }, { status: 500 });
        // }

        // console.log({ saveData });

        // const jwtToken = saveData?.IpfsHash && jwt.sign({ hash: saveData?.IpfsHash, emails }, process.env.JWT_SECRET);

        // if (jwtToken && userToken) {
        //     // add the data to smart contract
        // }

        return NextResponse.json({
            type: "success",
            message: "File uploaded successfully.",
            // data: saveData
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            type: "error",
            message: error.message,
        }, { status: 500 });
    }
}