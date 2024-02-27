import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";
import { getUserByEmail, saveFileToDB } from "@/app/utils/query";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

const generateSecretCode = () => {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return randomString;
}

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

// const saveToContract = async (id: string, jwt: string) => {
//     try {
//         const contractAddress = process.env.CONTRACT_ADDRESS as string;

//         const privateKey = process.env.WALLET_PRIVATE_KEY as string;
//         const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL as string);

//         const wallet = new ethers.Wallet(privateKey, provider);
//         const contract = new ethers.Contract(contractAddress, contractABI, wallet);

//         const tx = await contract.uploadData(id, jwt);
//         await tx.wait();

//         return true;
//     } catch (error) {
//         console.error(error);
//     }
// }

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

        const emails = JSON.parse(formData.get("emails") as string);
        if (!emails || emails?.length === 0 || emails?.length === 1) {
            return NextResponse.json({
                type: "error",
                message: "Email is required.",
            }, { status: 400 });
        }

        const userToken = generateSecretCode();
        const saveData = await saveFile(file);

        if (!saveData?.IpfsHash) {
            return NextResponse.json({
                type: "error",
                message: "File not uploaded.",
            }, { status: 500 });
        }

        const jwtToken = saveData?.IpfsHash && jwt.sign({ hash: saveData?.IpfsHash, emails }, process.env.JWT_SECRET as string);

        if (jwtToken && userToken) {
            // add data to the database
            const senderEmail = emails[emails.length - 1];
            const user = await getUserByEmail(senderEmail);
            await saveFileToDB(user?.id as string, userToken, jwtToken);
        }

        return NextResponse.json({
            type: "success",
            message: "File uploaded successfully.",
            data: { userToken }
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            type: "error",
            message: error.message,
        }, { status: 500 });
    }
}