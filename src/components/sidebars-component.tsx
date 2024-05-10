"use client";
import React from "react";
import Titlemenu from "./atomic/title-menu-atomic";
import MenuAtomic from "./atomic/menu-atomic";

const SidebarComponent = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <Titlemenu title="menu" />
        <MenuAtomic menu="home" PathnameRoute="/" />
        <MenuAtomic menu="discover" PathnameRoute="/discover" />
        <MenuAtomic menu="awards" PathnameRoute="/awards" />
        <MenuAtomic menu="celebrities" PathnameRoute="/celebrities" />
      </div>
      <div className="flex flex-col gap-2">
        <Titlemenu title="library" />
        <MenuAtomic menu="top rated" PathnameRoute="/top-rated" />
        <MenuAtomic menu="downloaded" PathnameRoute="/downloaded" />
        <MenuAtomic menu="playlist" PathnameRoute="/playlist" />
      </div>
      <div className="flex flex-col gap-2">
        <Titlemenu title="general" />
        <MenuAtomic menu="setting" PathnameRoute="/setting" />
      </div>
    </div>
  );
};

export default SidebarComponent;
