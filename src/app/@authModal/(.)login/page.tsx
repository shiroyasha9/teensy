import CloseModal from "@/components/CloseModal";
import Login from "@/components/Login";
import { type FC } from "react";

const page: FC = () => {
  return (
    <div className="fixed inset-0 z-10  bg-black/75 backdrop-blur-sm">
      <div className="container mx-auto flex h-full max-w-lg items-center">
        <div className="relative h-fit w-full rounded-lg bg-white px-2 py-2 text-black dark:bg-gray-700 dark:text-white">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>
          <Login bodyClassName="text-gray-500 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default page;
