import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { signOut } from "next-auth/react";
import SignOut from "@/app/components/signout";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">

        {!session && <Button asChild>
          <Link href="/auth">SignIn</Link>
        </Button>}
        {session && <SignOut />}
      </div>
    </>
  );
}
