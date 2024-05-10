import React from "react";
import { Capitalize } from "@/lib/utils";

const Titlemenu = ({ title }: { title: String }) => {
  return <p className="text-[15px]">{Capitalize(title)}</p>;
};

export default Titlemenu;
