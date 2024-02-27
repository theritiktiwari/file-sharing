import Header from '@/app/components/header';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-start items-start w-screen h-screen md:overflow-x-hidden">
      <Header />
      <div className="w-[90vw] mx-auto pt-5">{children}</div>
      <Toaster />
    </div>
  )
}