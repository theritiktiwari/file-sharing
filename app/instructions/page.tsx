import Instructions from "@/app/components/instructions";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Instructions",
}

export default function Page() {
    return <>
        <div className="px-10 py-5 md:py-10">
            <div className="flex justify-between">
                <Link href={"/"}><Button variant={"secondary"}>Home</Button></Link>
                <Link href={"/auth"}><Button variant={"default"}>Login</Button></Link>
            </div>
            <Instructions />
        </div>
    </>
}