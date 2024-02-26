"use client";

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast";
import { ArrowUpRightFromSquare, Copy, PencilLine, Trash2 } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateUserProfile, removeAllSessions, getUserByEmail } from "@/app/utils/query";
import Link from "next/link";

interface EditProfileProps {
    email: string;
    name: string;
    data?: string | null | undefined;
}

export function EditProfile({ email, name, data }: EditProfileProps) {
    const [updatedData, setUpdatedData] = useState<string | null | undefined>(data);
    const [loading, setLoading] = useState<boolean>(false);
    const { push: redirect } = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            if (!updatedData) {
                return toast({
                    title: "Error",
                    description: "Please enter a valid value",
                    variant: "destructive",
                });
            }

            if (updatedData === data) {
                return toast({
                    title: "Error",
                    description: "No changes were made",
                    variant: "destructive",
                });
            }

            const newName = (name === "Name" ? updatedData : undefined);
            const newImage = (name === "Image" ? updatedData : undefined);

            setLoading(true);
            const n = await updateUserProfile(email, newName, newImage);
            setLoading(false);

            if ((name === "Name" && n?.name !== updatedData) ||
                (name === "Image" && n?.image !== updatedData)) {
                return toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            }

            toast({
                title: "Success",
                description: "Profile updated successfully",
                variant: "success"
            });

            redirect("/dashboard/user");

        } catch (e: any) {
            toast({
                title: "Error",
                description: e.response?.data?.message || e.message,
                variant: "destructive",
            });
        }
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"secondary"}><PencilLine size={"1rem"} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit {name}</DialogTitle>
                    <DialogDescription>
                        Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            {name}
                        </Label>
                        <Input
                            id={name}
                            defaultValue={data?.toString() || ""}
                            onChange={(e) => setUpdatedData(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={loading} onClick={handleSubmit} type="submit">
                        {loading ? "Saving..." : "Save changes"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}

export function DeleteSession(data: any) {
    const handleDelete = async (e: any) => {
        e.preventDefault();

        const confirmation = confirm("Are you sure you want to remove all sessions?");
        if (!confirmation) {
            return;
        }

        const user = await getUserByEmail(data.data || "");
        const sessions = await removeAllSessions(user?.id || "");

        if ("type" in sessions && sessions.type === "error") {
            return toast({
                title: "Error",
                description: sessions.message,
                variant: "destructive",
            });
        }

        toast({
            title: "Success",
            description: "All sessions removed successfully",
            variant: "success"
        });

        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
    return <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleDelete} size={"sm"} variant={"destructive"}><Trash2 size={"1rem"} /></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete all sessions</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </>
}

export function CopyFileCode(code: any) {
    const handleCopy = async (e: any) => {
        e.preventDefault();
        await navigator.clipboard.writeText(code.code);
        toast({
            title: "Success",
            description: "Code copied to clipboard",
            variant: "success"
        });
    }

    return <>
        <div className="flex justify-center items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={handleCopy} size={"sm"} variant={"secondary"}><Copy size={"1rem"} /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Copy the Code</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href={`/dashboard/file?id=${code.code}`}>
                            <Button className="ml-2" size={"sm"} variant={"secondary"}><ArrowUpRightFromSquare size={"1rem"} /></Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Open the file</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </>

}