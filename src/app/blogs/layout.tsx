const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="prose prose-zinc my-4 dark:prose-invert md:prose-lg">
      {children}
    </article>
  );
};

export default Layout;
