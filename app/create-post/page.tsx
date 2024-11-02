"use client";

import { RedirectToSignIn, SignedOut, useAuth } from "@clerk/nextjs";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createPost } from "../api/postService";
import { toast } from "sonner";

type Post = {
  body: string;
  title: string;
  userId: string;
};

export default function Page() {
  const [values, setValues] = useState({
    body: "",
    title: "",
  });

  const { userId } = useAuth();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const textareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: Post = {
      title: values.title,
      body: values.body,
      userId: userId || "",
    };

    try {
      createPost(user)
        .then((data) => {
          console.log(data);
          toast.success("Post Updated Seccessfully", {
            style: {
              background: "green",
              color: "white",
            },
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something Gone Wrong", {
            style: {
              background: "red",
              color: "white",
            },
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="max-w-[500px] mx-auto ">
        <form
          onSubmit={submitHandler}
          className="bg-gray-100 py-3 px-3 rounded-lg "
        >
          <h2 className="text-center text-black font-bold text-lg ">
            Create Post
          </h2>

          <div className="my-3">
            <label htmlFor="title" className=" text-black ">
              Title
            </label>
            <br />
            <input
              type="text"
              id="title"
              name="title"
              className="text-black border mt-2 rounded-lg px-3 py-2 w-full focus:outline-cyan-400 active:outline-cyan-400 "
              required
              onChange={inputHandler}
            />
          </div>

          <div className="my-3">
            <label htmlFor="body" className=" text-black ">
              Description
            </label>
            <br />
            <textarea
              id="body"
              name="body"
              className="text-black border mt-2 rounded-lg px-3 py-2 w-full focus:outline-cyan-400 active:outline-cyan-400 h-[150px] "
              onChange={textareaHandler}
              required
            />
          </div>

          <button className="bg-green-500 text-black w-full py-2 rounded-lg focus:outline-cyan-400 active:outline-cyan-400 ">
            Create
          </button>
        </form>
      </div>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
