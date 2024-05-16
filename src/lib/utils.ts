import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Capitalize = (str: String) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const fetcher = async (url: string) => {

  try {
    const response = await fetch(url);

    // Periksa kembalian response dari API
    if (!response.ok) {
      // Jika response tidak ok, lempar error
      throw new Error("Failed to fetch data.");
    }

    // Parse response menjadi JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Tangkap dan lempar error
    console.error("Fetch operation failed:", error);
    throw error;
  }
};


type DebouncedFunction<T extends any[]> = (...args: T) => void;

export const debounce = <F extends DebouncedFunction<any>>(func: F, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
