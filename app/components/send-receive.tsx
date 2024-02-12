"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function Send() {
    return <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 md:h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Click to upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF, PDF, DOCX (Any type of File)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
        </label>
    </div>
}

// TODO: Implement the Receive component
// FIXME: Maybe we can use server side rendering to get the file

export function Receive() {
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