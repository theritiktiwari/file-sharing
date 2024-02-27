import Link from "next/link";
import { getFileById } from "@/app/utils/query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Downloading from "@/app/components/downloading";
import { Authentication } from "@/app/components/auth";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Receive File",
}

interface PageProps {
    searchParams: {
        id: String;
    }
}

export default async function Page({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions);
    const id = searchParams.id;
    const file = await getFileById(id as string);

    const output = {} as { type: string, message: string };
    let data;

    if (file?.secretToken) {
        data = jwt.verify(file?.secretToken, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        if (!data?.emails?.includes(session?.user?.email)) {
            output["type"] = "destructive";
            output["message"] = "You are not authorized to access this file.";
        } else {
            output["type"] = "success";
            output["message"] = "Your file is ready to download.";
        }
    } else {
        output["type"] = "destructive";
        output["message"] = "File not found.";
    }
    
    return <>
        <Authentication>
            <div className="h-[85vh] flex flex-col md:flex-row justify-center md:justify-around items-center gap-20">
                <Card className="w-[300px] md:w-[350px] flex flex-col justify-start items-center">
                    <CardHeader className="w-full">
                        <CardTitle className={`text-${output?.type}`}>{output?.type === "success" ? "Success" : "Oops"}!</CardTitle>
                        <CardDescription>{output?.message}</CardDescription>
                    </CardHeader>
                    <CardContent className="w-full">
                        {output?.type === "destructive" && <Link href={"/dashboard"}>
                            <Button className="w-full mt-3">
                                Back to Home
                            </Button>
                        </Link>}
                        {output?.type === "success" && <Downloading ipfsHash={data?.hash} />}
                    </CardContent>
                </Card>
            </div >
        </Authentication>
    </>
}