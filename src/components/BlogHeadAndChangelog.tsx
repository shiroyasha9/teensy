import Link from "next/link";
import React from "react";

export const BlogHeadAndChangelog = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className=" text-5xl font-medium text-white opacity-100">
        Teensy v5 <br />
        <span className="font-medium">Beyond Shortening Links 🚀</span>
      </div>
      <div className="font-extralight text-white">
        What's new?&nbsp;
        <Link
          target="_blank"
          className="font-extralight"
          href={
            "https://github.com/shiroyasha9/teensy/compare/teensy@4.1...teensy@5"
          }
        >
          Changelog on GitHub.
        </Link>
      </div>
    </div>
  );
};
