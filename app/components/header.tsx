import {
    CreditCard,
    File,
    Keyboard,
    LifeBuoy,
    LogOut,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/components/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import SignOut from "@/app/components/signout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Header() {
    const session = await getServerSession(authOptions);
    const initial = () => {
        if (session?.user?.name) {
            return session?.user?.name.charAt(0).toUpperCase();
        }
    }
    return (
        <>
            <Card className="p-5 w-screen flex justify-between items-center">
                <Link href="/dashboard"><div className="font-bold text-xl">BFS System</div></Link>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="py-7 w-[180px]">
                                <div className="flex justify-between w-full">
                                    <div className="mr-5 flex flex-col justify-start items-start w-full">
                                        Hello!
                                        <span className="text-primary font-semibold">{session?.user?.name}</span>
                                    </div>
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image || "https://i.ibb.co/yWZR9j0/Avatar.png"} />
                                        <AvatarFallback>{initial()}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <Link href={"/dashboard/user"}>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={"/dashboard/user/files"}>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <File className="mr-2 h-4 w-4" />
                                        <span>Your Files</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <Link href={"/dashboard/instructions"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    <span>Instructions</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <SignOut />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Card>
        </>
    )
}
