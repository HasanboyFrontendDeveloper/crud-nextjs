"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-3xl font-bold text-cyan-400 text-center mt-5 ">
        Welcome to Post Uz, <br />
        You can create your own posts and <br />
        Nobody can not see your posts
      </h1>

      <SignedIn>
        <div className="w-full my-5 py-5 flex justify-center ">
          <Link
            href="/posts"
            className="bg-green-500 text-black px-4 py-2 text-center rounded-lg outline hover:opacity-90 hover:outline-green-700 transition-all duration-300 focus:outline-green-700  active:outline-green-700 "
          >
            See you Posts
          </Link>
        </div>
        {/* Display protected content here */}
      </SignedIn>
      <SignedOut>
        <div className="w-full py-5 ">
          <h2 className="text-xl font-bold text-cyan-400  text-center mt-5 ">
            Please Sign In to see your Posts
          </h2>
          <div className="flex justify-center my-5">
            <Link
              href="/sign-in"
              className="bg-green-500 text-black px-4 py-2 text-center rounded-lg outline hover:opacity-90 hover:outline-green-700 transition-all duration-300 focus:outline-green-700 active:outline-green-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
