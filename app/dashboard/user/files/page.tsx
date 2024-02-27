import { Authentication } from "@/app/components/auth"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getAllFiles, getUserByEmail } from "@/app/utils/query";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { CopyFileCode } from "@/app/components/editprofile";
import { Metadata } from "next";
import jwt from "jsonwebtoken";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Files",
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    if(!session) redirect("/auth");

    const user = await getUserByEmail(session?.user?.email as string);
    const files = await getAllFiles(user?.id as string);

    const getEmailsList = async (token: string) => {
        if (!token)
            return;

        const data = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        return <ul>
            {data?.emails.map(async (email: string) => {
                return <li key={email}>{email}</li>
            })}
        </ul>
    }

    return (
        <Authentication>
            <div>
                <h1 className="mt-5 text-3xl text-center font-bold">Your Files</h1>
                <Table className="md:w-[75%] mx-auto mt-10">
                    <TableCaption>A list of your uploaded files.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S.No.</TableHead>
                            <TableHead>Receiver Code</TableHead>
                            <TableHead>Email Address</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!!files && files.map((file, index) => {
                            return <TableRow key={file.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{file.key}</TableCell>
                                <TableCell>{getEmailsList(file?.secretToken)}</TableCell>
                                <TableCell className="text-center">
                                    <CopyFileCode code={file.key} />
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div>
        </Authentication>
    )
}