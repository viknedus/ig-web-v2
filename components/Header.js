import Image from "next/image";
import IGlogo from "../public/iglogo.svg";
import IGlogo2 from "../public/iglogo2.svg";
import AvatarImg from "../public/profilepic.jpg";

import {
  LogoutIcon,
  MenuIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log(session);

  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-5xl mx-5 lg:mx-auto">
        {/* left */}
        <div className="flex items-center">
          <div className="relative hidden lg:inline-grid w-24 cursor-pointer hover:scale-125 transition-all duration-150 ease-out">
            <Image
              src={IGlogo}
              alt="logo"
              objectFit="contain"
              onClick={() => router.push("/")}
            />
          </div>
          <div className="relative lg:hidden w-7 flex-shrink-0 cursor-pointer hover:scale-125 transition-all duration-150 ease-out">
            <Image
              src={IGlogo2}
              alt="logo"
              objectFit="contain"
              onClick={() => router.push("/")}
            />
          </div>
        </div>

        {/* middle */}
        <div className="relative flex items-center mt-1 p-3 rounded-md max-w-xs">
          <div className="absolute flex items-center pointer-events-none inset-y-0 pl-3">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="search"
            className="block w-full bg-gray-50 pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md hover:border-black"
          />
        </div>

        {/* right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon
            className="hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
            onClick={() => router.push("/")}
          />
          <MenuIcon className="h-5 w-5 md:hidden cursor-pointer" />

          {session ? (
            <>
              <PlusCircleIcon
                className="hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
                onClick={() => setOpen(true)}
              />
              <LogoutIcon
                className="hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
                onClick={signOut}
              />
              <a
                href="https://github.com/viknedus/ig-web-v2"
                className="border-2 p-0 h-10 w-10 rounded-full cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
              >
                <Image
                  src={AvatarImg}
                  alt="avatar"
                  className="rounded-full"
                  layout="responsive"
                />
              </a>
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}
