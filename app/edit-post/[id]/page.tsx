"use client";

import { RedirectToSignIn, SignedOut, useAuth } from "@clerk/nextjs";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
} from "../../api/postService";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [values, setValues] = useState({
    body: "",
    title: "",
    id: 0,
  });
  const [isNotFound, setIsNotFound] = useState(false);
  const { userId } = useAuth();
  const params = useParams();
  // Get the dynamic id parameter

  type Post = {
    body: string;
    id: number;
    title: string;
    userId: string;
  };

  const getPost = () => {
    try {
      getPostById(Number(params.id)).then((data) => {
        if (data?.userId === 1) {
          setValues(data);
          console.log("user has permision");
          setIsNotFound(false);
        } else {
          console.log("user has not permision");
          setIsNotFound(true);
        }

        //   setPosts(data.filter((item: Post) => item.userId === userId));
      });
    } catch (error) {
      console.error(error);

      notFound();
    }
  };

  console.log(values);

  useEffect(() => {
    if (userId) {
      getPost();
    }
  }, [userId]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, title: e.target.value }));
  };

  const textareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, body: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: Post = {
      title: values.title,
      id: values.id,
      body: values.body,
      userId: userId || "",
    };

    try {
      updatePost(values.id, user)
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
        {!isNotFound ? (
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
                value={values.title}
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
                value={values.body}
                required
              />
            </div>

            <button className="bg-green-500 text-black w-full py-2 rounded-lg focus:outline-cyan-400 active:outline-cyan-400 ">
              Update
            </button>
          </form>
        ) : (
          <h2 className="text-xl font-bold text-cyan-400  text-center mt-5 ">
            You cannot Edit another's Posts
          </h2>
        )}
      </div>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
