"use client";

import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/postService";
import { RedirectToSignIn, SignedOut, useAuth } from "@clerk/nextjs"; // Assuming you have an AuthContext
import Link from "next/link";
import { toast } from "sonner";

const PostsPage = () => {
  const { userId } = useAuth();
  const [posts, setPosts] = useState([]);

  type Post = {
    body: string;
    id: number;
    title: string;
    userId: number;
  };

  const getPost = () => {
    getPosts().then((data) => {
      // setPosts(data);
      setPosts(data.filter((item: Post) => item.userId === 1));
    });
  };

  useEffect(() => {
    if (userId) {
      getPost();
    }
  }, [userId]);

  const deleteHandler = async (id: number) => {
    try {
      await deletePost(id)
        .then(() => {
          console.log("deleted successfully");
          toast.success("Post Deteled Seccessfully", {
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

      getPost();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto ">
        <div className="flex justify-between pb-3 ">
          <h1 className="text-lg mb-2 ">Posts</h1>

          <Link
            href="/create-post"
            className="bg-green-500 text-black px-4 py-2 rounded-lg focus:outline-cyan-400 active:outline-cyan-400"
          >
            Create Post
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="border border-gray-100 shadow-lg rounded-lg bg-white opacity-80 text-black py-2 flex flex-col justify-between "
            >
              <div className="border-gray-100 border-b-2 border-dashed px-3 ">
                <h2 className="text-lg capitalize ">{post.title}</h2>
              </div>
              <div className="border-gray-100 border-b-2 border-dashed p-3 grow ">
                <p>{post.body}</p>
              </div>
              <div className=" p-3 flex gap-2 ">
                <button
                  className="bg-red-500 text-black py-2 w-full rounded-lg focus:outline-cyan-400 active:outline-cyan-400 "
                  onClick={() => deleteHandler(post.id)}
                >
                  Delete
                </button>
                <Link
                  href={`edit-post/${post.id}`}
                  className="bg-green-500 text-black py-2 w-full rounded-lg focus:outline-cyan-400 active:outline-cyan-400 flex justify-center "
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default PostsPage;
