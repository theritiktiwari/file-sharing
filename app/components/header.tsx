import {
    CreditCard,
    Keyboard,
    LifeBuoy,
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

export default async function Header() {
    const session = await getServerSession(authOptions);
    return (
        <>
            <Card className="p-5 w-screen flex justify-between items-center">
                <Link href="/dashboard"><div className="font-bold text-xl">BFS System</div></Link>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">Welcome, &nbsp;<span className="text-primary font-semibold">{session?.user?.name}</span></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem className="cursor-pointer" disabled>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Billing</span>
                                </DropdownMenuItem> */}
                                {/* <DropdownMenuItem className="cursor-pointer" disabled>
                                    <Keyboard className="mr-2 h-4 w-4" />
                                    <span>Statistics</span>
                                </DropdownMenuItem> */}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <LifeBuoy className="mr-2 h-4 w-4" />
                                <span>Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <SignOut />
                            {/* <DropdownMenuItem className="cursor-pointer text-destructive" onClick={SignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Card>
        </>
    )
}
