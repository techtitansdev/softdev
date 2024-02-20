"use client"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/server/uploadthing";
import { UploadButton } from "~/utils/uploadthing";
 
export default function Upload() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
     <UploadButton
              appearance={{
                  button: "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
                  container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                  allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-white",
              }} endpoint={"imageUploader"}/>
    </main>
  );
}