// postService.ts
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
};

export const createPost = async (data: {
  title: string;
  body: string;
  userId: string;
}) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updatePost = async (
  id: number,
  data: { title: string; body: string }
) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deletePost = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return response.json();
};

export const getPostById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
};
