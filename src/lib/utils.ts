import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Capitalize = (str: String) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const API_KEY = "01fbae3a73cc9460228ad4905e970191";
export const fetcher = async (params: string, page?: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${params}?page=${page}&api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
