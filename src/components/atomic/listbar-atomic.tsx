"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Category = "movie" | "tvshow";

const ListBarAtmoic = () => {
  const router = useRouter();
  const params = useSearchParams();
  const CurrentPathname = usePathname();
  const currentParamsQuery = params.get("query");
  const categories: Category[] = ["movie", "tvshow"];
  const [prevPathName, setPrevPathName] = useState<string>("/");
  const [category, setCategory] = useState<Category>("movie");

  useEffect(() => {
    if (CurrentPathname !== prevPathName) {
      router.push(
        `${CurrentPathname}?category=${category}${
          currentParamsQuery ? `&query=${currentParamsQuery} ` : ""
        }`
      );
      setPrevPathName(CurrentPathname);
    } else {
      router.push(
        `?category=${category}${
          currentParamsQuery ? `&query=${currentParamsQuery} ` : ""
        }`
      );
    }
  }, [CurrentPathname, prevPathName, category, router]);

  const ChangeCategory = (str: Category) => {
    setCategory(str);
  };

  return (
    <div className="flex gap-5 grow px-10 font-semibold">
      {categories.map((cat, index) => (
        <div
          key={index}
          className={`${
            category === cat && "border-b-2 border-primary text-primary"
          } cursor-pointer`}
        >
          <p onClick={() => ChangeCategory(cat)} className="text-[20px]">
            {cat.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListBarAtmoic;
