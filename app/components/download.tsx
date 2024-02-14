"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// TODO: Implement the Receive component
// FIXME: Maybe we can use server side rendering to get the file

export default function Download() {
    const [code, setCode] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { push: redirect } = useRouter();
    
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!code) {
            return toast({
                title: "Error",
                description: "Code is required",
                variant: "destructive"
            });
        }

        // setLoading(true);
        // const result = await signIn('email', {
        //     email: email,
        //     callbackUrl: window.location.origin,
        //     redirect: false
        // });
        // setLoading(false);
        redirect("/dashboard/file");
    }

    return <>
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-y-2">
                <Label>Secret Code</Label>
                <Input type="text" name="code" placeholder="Enter the secret code"
                    onChange={(e) => setCode(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} variant={"default"} className="w-full mt-3">
                {loading ? "Processing..." : "Find the File"}
            </Button>
        </form>
    </>
}