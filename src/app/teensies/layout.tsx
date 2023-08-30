import SelectedSegment from "@/components/SelectedSegment";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SelectedSegment />
      {children}
    </>
  );
};

export default Layout;
