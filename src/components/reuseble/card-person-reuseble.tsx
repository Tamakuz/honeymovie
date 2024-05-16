"use client"
import { FaUser } from "react-icons/fa";
import React from "react";

const CardPersonReuseble = ({
  name,
  poster,
  known_for_department,
}: {
  name: string;
  poster: string | undefined;
  known_for_department: string;
}) => {
  return (
    <div className="hover:bg-primary w-[200px] p-3 rounded-md group">
      {poster ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt=""
          width={200}
          height={200}
          className="rounded-md"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-200 rounded-md w-full h-[264px]">
          <FaUser className="text-6xl text-gray-500" />
        </div>
      )}
      <h2 className="text-2xl font-bold group-hover:text-black duration-200">
        {name}
      </h2>
      <p className="group-hover:text-black duration-200">
        {known_for_department}
      </p>
    </div>
  );
};

export default CardPersonReuseble;
