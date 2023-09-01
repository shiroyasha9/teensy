import SelectedSegment from "@/components/SelectedSegment";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mt-8">
        <SelectedSegment />
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default Layout;
