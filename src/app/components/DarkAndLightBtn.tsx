/** @format */
"use client";
import React from "react";
import { IoSunnyOutline } from "react-icons/io5";

import { useTheme } from "next-themes";
import { LuMoonStar } from "react-icons/lu";

type Props = {};

export default function DarkAndLightBtn({}: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleDark() {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm">{resolvedTheme === "light" ? "DARK" : "LIGHT"}</p>

      <button onClick={toggleDark} className="text-2xl">
        {resolvedTheme === "light" ? <LuMoonStar /> : <IoSunnyOutline />}
      </button>
    </div>
  );
}
