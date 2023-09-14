import { AiOutlineGithub } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { SiVisualstudio } from "react-icons/si";

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      <a href="/gh" target="_blank" rel="noreferrer">
        <AiOutlineGithub className="h-6 w-6" aria-label="teensy github page" />
      </a>
      <a href="/vscode" target="_blank" rel="noreferrer">
        <SiVisualstudio
          className="h-5 w-5"
          aria-label="teensy vs code extension"
        />
      </a>
      <a href="/ps" target="_blank" rel="noreferrer">
        <IoLogoGooglePlaystore
          className="h-6 w-6"
          aria-label="teensy play store app"
        />
      </a>
    </div>
  );
}
