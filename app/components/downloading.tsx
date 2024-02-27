"use client";

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

interface DownloadingProps {
    ipfsHash: String
}
export default function Downloading({ ipfsHash }: DownloadingProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const downloadFile = async () => {
        try {
            setLoading(true);
            const downloadUrl = `https://ipfs.io/ipfs/${ipfsHash}`; // Your file URL
            const responseBlob = await fetch(downloadUrl);
            const blob = await responseBlob.blob();

            // Determine file type based on response header or content type
            const contentType = blob.type;
            const fileExtension = getFileExtension(contentType);

            // Create a temporary URL and trigger download
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `file.${fileExtension}`; // Set filename with dynamic extension
            link.click();
            link.remove();
            setLoading(false);
        } catch (error) {
            toast({
                title: "Success",
                description: "Failed to download the file",
                variant: "destructive"
            });
        }
    };

    // Helper function to extract file extension from content type
    const getFileExtension = (contentType: string) => {
        const typeMap: { [key: string]: string } = {
            "application/pdf": "pdf",
            "image/gif": "gif",
            "image/jpeg": "jpg",
            "image/png": "png",
            "application/msword": "doc",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
            "audio/mpeg": "mp3",
        };

        return typeMap[contentType] || "unknown";
    };


    return <>
        <Button onClick={downloadFile} disabled={loading} variant={"success"} className="w-full mt-3">
            {loading ? "Downloading..." : "Download the File"}
        </Button>
    </>

}