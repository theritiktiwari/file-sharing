import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteSession, EditProfile } from "@/app/components/editprofile";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';

import type { Metadata } from "next";
import { Authentication } from "@/app/components/auth";

import { getUserByEmail, getAllSessions } from "@/app/utils/query"

export const metadata: Metadata = {
    title: "Profile",
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    const user = await getUserByEmail(session?.user?.email || "");
    const sessions = await getAllSessions(user?.id || "");

    const checkStatus = (date: Date) => {
        const currentDate = new Date();
        const expires = new Date(date);
        if (expires > currentDate) {
            return "Active";
        } else {
            return "Expired";
        }
    }

    const initial = () => {
        if (session?.user?.name) {
            return session?.user?.name.charAt(0).toUpperCase();
        }
    }

    return (
        <Authentication>
            <div>
                <h1 className=" mt-5 text-3xl text-center font-bold">Profile</h1>
                <Table className="md:w-[50%] mx-auto mt-10">
                    <TableCaption>Refresh or Login again for better user experience.</TableCaption>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold">Name</TableCell>
                            <TableCell className="md:pl-24">{session?.user?.name}</TableCell>
                            <TableCell className="text-right">
                                <EditProfile
                                    email={session?.user?.email || ""}
                                    name="Name"
                                    data={session?.user?.name}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Email</TableCell>
                            <TableCell className="md:pl-24">{session?.user?.email}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Image</TableCell>
                            <TableCell className="md:pl-24">
                                <Avatar>
                                    <AvatarImage src={session?.user?.image || "https://i.ibb.co/yWZR9j0/Avatar.png"} />
                                    <AvatarFallback>{initial()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="text-right">
                                <EditProfile
                                    email={session?.user?.email || ""}
                                    name="Image"
                                    data={session?.user?.image}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold">Sessions</TableCell>
                            <TableCell className="md:pl-24">
                                {sessions?.length || 0} Active {sessions?.length > 1 ? "Sessions" : "Session"}
                            </TableCell>
                            <TableCell className="text-right">
                                <DeleteSession data={session?.user?.email} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Authentication>
    )
}