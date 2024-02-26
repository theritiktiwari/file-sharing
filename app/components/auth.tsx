import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { redirect } from 'next/navigation';

interface PropsType {
    children: React.ReactNode;
}

export async function Authentication({ children }: PropsType) {
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/auth');

    return <>
        {children}
    </>
}