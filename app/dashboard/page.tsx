import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { redirect } from 'next/navigation';
import Upload from "@/app/components/upload";
import Download from "@/app/components/download";

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/auth');

    return <>
        <div className="h-[85vh] flex flex-col md:flex-row justify-center md:justify-around items-center gap-20">
            <div className="flex flex-col items-center">
                <Upload session={session} />
            </div>
            <div>
                <Card className="w-[320px] h-[320px] md:w-[350px] md:h-[350px] flex flex-col justify-center items-center">
                    <CardHeader className="w-full">
                        <CardTitle>Receive File</CardTitle>
                        <CardDescription>Please enter the secret code to get the file.</CardDescription>
                    </CardHeader>
                    <CardContent className="w-full">
                        <Download />
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
}