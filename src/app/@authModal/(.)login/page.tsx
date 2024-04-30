import CloseModal from "@/components/CloseModal";
import Login from "@/components/auth/Login";
import type { FC } from "react";

const page: FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-full max-w-lg items-center">
        <div className="relative z-50 grid h-fit w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default page;
