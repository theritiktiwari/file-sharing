"use client";

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { XCircle } from 'lucide-react';
import clsx from 'clsx';

const checkEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default function Upload() {
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [CID, setCID] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [emailList, setEmailList] = useState<string[]>([]);

    const handleDrop = async (acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    };

    const handlekeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "," || e.key === " ") {
            e.preventDefault();

            if (emailList.length >= 5) {
                return toast({
                    title: "Error",
                    description: "You can only add 5 email addresses",
                    variant: "destructive"
                });
            }

            if (email) {
                if (checkEmail(email) && !emailList.includes(email)) {
                    setEmailList([...emailList, email]);
                    setEmail("");
                }
            }
        }
    }

    const handleSubmit = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file, file.name);
            const data = {
                emails: JSON.stringify(emailList),
            }

            setLoading(true);
            const req = await axios.post("/api/files", formData, {
                data: data,
            });
            const res = await req.data;
            setLoading(false);

            if (res?.type === "success") {
                setFile(null);
                setCID(res?.data?.IpfsHash);
            }

            console.log(res);

            toast({
                title: res?.type.charAt(0).toUpperCase() + res?.type.slice(1),
                description: res?.message,
                variant: res?.type === "success" ? "success" : "destructive",
            })
        } catch (e: any) {
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive",
            })
        }
    }

    return (
        <>
            <Card className={clsx(
                "w-[320px] h-[320px] md:w-[350px] md:h-[350px] flex flex-col  items-center justify-start",
            )}>
                {!file && <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className='w-full h-[85%]'>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-primary border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-transparent">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    {file ? <>
                                        {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Selected: {file?.name}</p> */}
                                    </> : <>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Click to upload or Drop the file</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF, DOCX (Any type of File)</p>
                                    </>}
                                </div>
                                <input {...getInputProps()} />
                            </label>
                        </div >
                    )}
                </Dropzone>}
                {file && <div className='w-full h-[80%] p-4'>
                    <div className="flex flex-col gap-y-2">
                        <Label>Give Access to email</Label>
                        {emailList?.length < 5 && <Input className={"test-xs"} type="email" value={email} name="code" placeholder="Press enter or comma to add email"
                            onKeyPress={handlekeyPress}
                            onChange={(e) => setEmail(e.target.value)}
                        />}
                    </div>
                    <div className="mt-3 md:mt-2">
                        {emailList.map((email, index) => (
                            <div key={index} className="flex items-center justify-between w-full py-1 md:py-2 px-2 bg-secondary rounded-md mb-2">
                                <span className='text-sm'>{email}</span>
                                <span className="cursor-pointer" onClick={() => setEmailList(emailList.filter((e) => e !== email))}><XCircle className='text-destructive' size={20} /></span>
                            </div>
                        ))}
                    </div>
                </div>}
                <div className={clsx(
                    'flex flex-col justify-center items-center w-full h-[20%]',
                    file && "pb-8 md:pb-5"
                )}>
                    {file ? <>
                        <hr className='w-[90%] mb-1' />
                        <span className="text-sm"><span className='font-semibold'>Selected:</span> {file?.name}</span>
                        <div className='flex justify-center items-center gap-5 mt-1'>
                            <Button disabled={loading} size={"sm"} onClick={() => setFile(null)} variant="destructive">Remove File</Button>
                            {/* <Button disabled={loading} size={"sm"} onClick={() => handleSubmit(file)} variant="default">{loading && "Uploading..." || "Upload File"}</Button> */}
                            <Button size={"sm"} onClick={() => handleSubmit(file)} variant="default">{loading && "Uploading..." || "Upload File"}</Button>
                        </div>
                    </> : <p className="font-bold text-lg md:text-xl">Send File</p>}
                </div>
            </Card>
        </>
    );
};