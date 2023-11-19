import Link from "next/link";

type BlogTitleAndChangelogProps = {
  tabTitle: string;
  blogTitle: string;
  blogSubtitle: string;
  changeLogURL: string;
};

export const BlogTitleAndChangelog = ({
  tabTitle,
  blogTitle,
  blogSubtitle,
  changeLogURL,
}: BlogTitleAndChangelogProps) => {
  return (
    <div className="flex flex-col gap-2">
      <title>{tabTitle}</title>
      <div className=" text-5xl font-medium text-white opacity-100">
        {blogTitle} <br />
        <span className="font-medium">{blogSubtitle}</span>
      </div>
      <div className="font-extralight text-white">
        What&apos;s new?&nbsp;
        <Link target="_blank" className="font-extralight" href={changeLogURL}>
          Changelog on GitHub.
        </Link>
      </div>
    </div>
  );
};
