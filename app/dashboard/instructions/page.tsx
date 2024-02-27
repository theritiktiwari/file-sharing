import { Authentication } from "@/app/components/auth";
import Instructions from "@/app/components/instructions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Instructions",
}

export default function Page() {
    return <>
        <Authentication>
            <Instructions />
        </Authentication>
    </>
}