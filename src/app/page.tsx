/** @format */

"use client";

import Image from "next/image";
import DarkAndLightBtn from "./components/DarkAndLightBtn";
import SearchAndBtn from "./components/SearchAndBtn";
import Link from "next/link";

import { MdEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import dateFormte from "dateformat";
import { useState } from "react";

type GitHubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: null | string;
  created_at: string;
  email: null | string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: null | string;
  type: string;
  updated_at: string;
  url: string;
  documentation_url: string;
  message: string;
};

export default function Home() {
  const [userName, setUserName] = useState("octocat");

  const { isLoading, error, data, refetch } = useQuery<GitHubUser>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json()
      )
  });
  // console.log("data-", data);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refetch();
  }

  return (
    <div className="flex min-h-screen w-full bg-stone-100 p-1.5 sm:p-4 sm:pt-12 transition-all  dark:bg-slate-900 text-sm pt-20">
      {/* container */}
      <div className="  mx-auto flex w-full max-w-[600px] flex-col gap-8  rounded m-9 p-5">
        <section className="flex  justify-between gap-3 ">
          <p className="text-xl font-semibold">Github User Finder</p>
          <DarkAndLightBtn />
        </section>

        {/* search and main */}
        <section className="flex flex-col gap-6">
          {/* seach and btn  */}
          <SearchAndBtn
            onChange={(e) => setUserName(e.target.value)}
            onSubmit={handleSubmit}
            value={userName}
          />
          {data?.message ? (
            <div className=" flex  w-full  flex-col gap-5 rounded-lg  bg-white px-4 py-8 text-center text-red-400 dark:bg-slate-800">
              User Not Found
            </div>
          ) : (
            <main className="flex w-full flex-col gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8  min-h-[200px]">
              {/* 1 */}
              <section className="flex gap-4">
                {/* user image  */}
                <Image
                  width={200}
                  height={200}
                  className=" h-20 w-20 rounded-full "
                  src={data?.avatar_url ?? ""}
                  alt="user-img"
                />

                <section className="flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row">
                  <div>
                    {/*name  */}
                    <h1>{data?.name}</h1>
                    {/* user id */}
                    <Link
                      target="_blank"
                      className="text-blue-500  hover:underline text-sm transition-all"
                      href={`https://github.com/${data?.login}/`}
                    >
                      @{data?.login}
                    </Link>
                  </div>

                  {/* joined date */}
                  <p className="">
                    <span>Joined : </span>
                    <span> {dateFormte(data?.created_at, "dd mmm yyyy")} </span>
                  </p>
                </section>
              </section>
              {/* 2 */}
              <section className="flex flex-col gap-5">
                <p>
                  {data?.bio ?? (
                    <span className="opacity-60">This profile has no bio</span>
                  )}
                </p>
                {/* repo and follower section */}
                <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900  min-h-[50px]  ">
                  {/* item 1 */}
                  <div className="flex flex-col items-center gap-2 ">
                    <p className="text-xs opacity-60">Repos</p>
                    <p className=" text-sm font-bold sm:text-base">
                      {data?.public_repos}
                    </p>
                  </div>
                  {/* item 2 */}
                  <div className="flex flex-col items-center gap-2 ">
                    <p className="text-xs opacity-60">Followers</p>
                    <p className=" text-sm font-bold sm:text-base">
                      {data?.followers}
                    </p>
                  </div>
                  {/* item 3 */}
                  <div className="flex flex-col items-center gap-2 ">
                    <p className="text-xs opacity-60">Following</p>
                    <p className=" text-sm font-bold sm:text-base">
                      {data?.following}
                    </p>
                  </div>
                </div>
                {/* address and extra links */}
                <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 pt-2">
                  {/* item 1 */}
                  <div className="flex items-center gap-2">
                    {/* icon */}
                    <IoLocationOutline className="text-xl" />
                    <p>
                      {data?.location ?? (
                        <span className="opacity-60">Not Available</span>
                      )}{" "}
                    </p>
                  </div>
                  {/* item 2 */}
                  <div className="flex items-center gap-2 ">
                    {/* icon */}
                    <IoIosLink className="text-xl" />
                    {data?.blog ? (
                      <Link
                        title={data?.blog}
                        className="hover:underline opacity-60 max-w-[220px] overflow-hidden text-ellipsis "
                        href={data?.blog ?? "#"}
                      >
                        {data?.blog}{" "}
                      </Link>
                    ) : (
                      <span className="opacity-60">Not Available</span>
                    )}{" "}
                  </div>
                  {/* item 3 */}
                  <div className="flex items-center gap-2 pt-4">
                    <FaTwitter className="text-xl" />
                    <p>
                      {data?.twitter_username ?? (
                        <span className="opacity-60">Not Available</span>
                      )}
                    </p>
                  </div>
                  {/* Company*/}
                  <div className="flex items-center gap-2 pt-4">
                    <BsFillBuildingsFill className="text-xl" />
                    <p>
                      {data?.company ?? (
                        <span className="opacity-60">Not Available</span>
                      )}
                    </p>
                  </div>
                   {/* E-Mail */}
                  <div className="flex items-center gap-2 pt-4">
                    <MdEmail className="text-xl" />
                    <p>
                      {data?.email ?? (
                        <span className="opacity-60">Not Available</span>
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </main>
          )}
        </section>
      </div>
    </div>
  );
}
