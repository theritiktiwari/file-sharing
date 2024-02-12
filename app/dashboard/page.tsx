import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { redirect } from 'next/navigation';
import { Send, Receive } from "@/app/components/send-receive";

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/auth');

    return <>
        <div className="h-[85vh] flex flex-col md:flex-row justify-center md:justify-around items-center gap-20">
            <div className="flex flex-col items-center">
                <Card className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex flex-col items-center">
                    <Send />
                    <p className="mt-2 md:mt-4 font-bold">Send File</p>
                </Card>
            </div>
            <div>
                <Card className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex flex-col justify-center items-center">
                    <CardHeader className="w-full">
                        <CardTitle>Receive File</CardTitle>
                        <CardDescription>Please enter the secret code to get the file.</CardDescription>
                    </CardHeader>
                    <CardContent className="w-full">
                        <Receive />
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
}