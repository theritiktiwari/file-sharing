import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/dashboard");
  }

  return <>
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="sm:text-7xl text-5xl font-bold leading-tight text-white text-center sm:leading-tight lg:leading-tight">
          Blockchain{" "}
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative">File Sharing</span>
          </span>{" "}
          System
        </p>
        <p className="mb-4 text-gray-400 text-center mt-4 text-md md:text-xl max-w-2xl font-medium">
          This is a file sharing system using blockchain technology to ease the process of file sharing and increase the security of the files.
        </p>
        <Button asChild size={"lg"} className="text-lg">
          <Link href="/auth">Login</Link>
        </Button>
      </div>
    </div>
  </>
}
