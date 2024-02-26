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

export default async function Page() {
    const session = await getServerSession(authOptions);

    const user = await getUserByEmail(session?.user?.email as string);
    const files = await getAllFiles(user?.id as string);

    return (
        <Authentication>
            <div>
                <h1 className="mt-5 text-3xl text-center font-bold">Your Files</h1>
                <Table className="md:w-[50%] mx-auto mt-10">
                    <TableCaption>A list of your uploaded files.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S.No.</TableHead>
                            <TableHead>Receiver Code</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!!files && files.map((file, index) => {
                            return <TableRow key={file.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{file.key}</TableCell>
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