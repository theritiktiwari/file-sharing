"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOut() {
    return <>
        <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => signOut({
            callbackUrl: `${window.location.origin}`
        })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
    </>
}