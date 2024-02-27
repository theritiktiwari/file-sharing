import Link from "next/link";

export default function Instructions() {
    const linkStyle = "text-primary underline";

    return <>
        <div className="text-justify">
            <h1 className="text-left mt-5 text-3xl font-bold">Welcome to this File Sharing Platform</h1>
            <div>
                <ul>
                    <li className="font-bold text-xl mt-3">1. Getting Started:</li>
                    <ul className="ml-5">
                        <li>• You can login with Email, Google or GitHub.</li>
                        <li>• You can edit the name and image in the <Link className={linkStyle} href={"/dashboard/user"}>Profile</Link> section in the dropdown menu.</li>
                    </ul>

                    <li className="font-bold text-xl mt-3">2. Uploading Files:</li>
                    <ul className="ml-5">
                        <li>• Click or Drag and Drop the file you want to upload.</li>
                        <li>• After that enter the email address <span className="underline">(upto 5)</span> of users you want to share the file with. <span className="underline italic">Ensure they also have accounts on this platform.</span></li>
                        <li>• There will be no restrictions on the size and type of file. The upload time will depend on the file size; larger files take longer.</li>
                        <li>• Once uploaded, you will receive a confirmation message and the access code. <span className="italic underline">Copy the code or share the link to the user you want to send the file.</span></li>
                    </ul>

                    <li className="font-bold text-xl mt-3">3. Managing Uploads:</li>
                    <ul className="ml-5">
                        <li>• Access your uploaded files from the <Link className={linkStyle} href={"/dashboard/user/files"}>Your Files</Link> section in the dropdown menu.</li>
                        <li>• Here you can copy the access code, view email address and also <span className="underline italic">open the file directly in the platform.</span></li>
                    </ul>

                    <li className="font-bold text-xl mt-3">4. Downloading Files:</li>
                    <ul className="ml-5">
                        <li>• Enter the access code which you have received from the person who uploads the file, or open the link after login.</li>
                        <li>• If the code is valid and you have permission, the file will be available for download.</li>
                    </ul>

                    <li className="font-bold text-xl mt-3">5. Security and Privacy:</li>
                    <ul className="ml-5">
                        <li>• Never share your access code with anyone you don't trust.</li>
                        <li>• Be cautious when downloading executable files (e.g., .exe, .bat).</li>
                    </ul>
                </ul>
            </div>
        </div>
    </>
}