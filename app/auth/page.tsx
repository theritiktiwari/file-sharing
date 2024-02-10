import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInComponents, SignInWithEmail } from "@/app/components/signin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session) {
        return redirect("/");
    }

    return <>
        <div className="w-screen h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Please authenticate to access your account for sharing the file.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <SignInWithEmail />
                        <SignInComponents />
                    </div>
                </CardContent>
            </Card>
        </div>
    </>
}