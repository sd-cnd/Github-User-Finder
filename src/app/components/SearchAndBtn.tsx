/** @format */

import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function SearchAndBtn(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className="flex items-center gap-2 w-full shadow-md focus-within:ring-2  dark:focus-within:ring-gray-200 focus-within:ring-slate-800  p-2 rounded-lg  dark:bg-slate-800 bg-white "
    >
      <section className="flex items-center w-full h-full gap-2 ">
        {/* search icon */}
        <IoSearch className="text-2xl text-blue-500" />
        <input
          value={props.value}
          onChange={props.onChange}
          placeholder="Searh GitHub username..."
          className="w-full h-[40px] rounded bg-inherit outline-none px-1 text-sm "
          type="text"
        />
      </section>
      <button className="rounded-lg bg-blue-500 px-5 py-2 text-white hover:opacity-80  transition-all">
        Search
      </button>
    </form>
  );
}
