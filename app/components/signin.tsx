"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast";

export function SignInComponents() {
    return <>
        <div className="flex flex-col gap-2 mt-3 md:flex-row">
            <Button onClick={() => signIn('github', {
                callbackUrl: window.location.origin
            })} className="w-full" variant={"outline"}>Login with GitHub</Button>
            <Button onClick={() => signIn('google', {
                callbackUrl: window.location.origin
            })} className="w-full" variant={"outline"}>Login with Google</Button>
        </div>
    </>
};

export function SignInWithEmail() {
    const [email, setEmail] = useState<null | string>(null);

    const handleSubmit = async () => {
        if (!email) {
            return toast({
                title: "Error",
                description: "Email is required",
                variant: "destructive"
            });
        }
        const result = await signIn('email', {
            email: email,
            callbackUrl: window.location.origin,
            redirect: false
        });

        if(!result?.ok){
            return toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
        }

        return toast({
            title: "Success",
            description: "Email sent to your email address. Please check your inbox.",
        });
    }
    return <>
        <form action={handleSubmit}>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input type="email" name="email" placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" variant={"default"} className="w-full mt-3">Login with Email</Button>
        </form>
    </>
}