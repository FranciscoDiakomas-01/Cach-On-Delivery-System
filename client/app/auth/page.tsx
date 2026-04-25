"use client";
import asideImage from "@/assets/images/loginMan.png";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";

import logo from "@/assets/images/logo.png";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Image src={logo} alt="logo" className="h-7 w-7 dark:invert" />
            Sellify
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={asideImage}
          alt="Image"
          className="absolute  h-full w-full "
        />
      </div>
    </div>
  );
}
