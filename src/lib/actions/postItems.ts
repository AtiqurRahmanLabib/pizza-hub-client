import type { PostItem, MenuItem } from "../types/menu-item";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const postItem = async (item: PostItem): Promise<MenuItem> => {
  if (!BASE_URL) {
    throw new Error("API URL is not configured");
  }

  const res = await fetch(`${BASE_URL}/menu-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // send the login cookie
    body: JSON.stringify(item),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to add menu item");
  }

  return data;
};