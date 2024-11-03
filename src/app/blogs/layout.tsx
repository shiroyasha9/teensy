const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<article className="prose prose-zinc dark:prose-invert md:prose-lg my-4">
			{children}
		</article>
	);
};

export default Layout;
