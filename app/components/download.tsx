"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Download() {
    const [code, setCode] = useState<null | string>(null);
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

        redirect(`/dashboard/file?id=${code}`);
    }

    return <>
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-y-2">
                <Label>Secret Code</Label>
                <Input type="text" name="code" placeholder="Enter the secret code"
                    onChange={(e) => setCode(e.target.value)} />
            </div>
            <Button type="submit" variant={"default"} className="w-full mt-3">
                Find the File
            </Button>
        </form>
    </>
}