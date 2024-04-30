import SelectedSegment from "@/components/SelectedSegment";
import Login from "@/components/auth/Login";
import { getAuthSession } from "@/server/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession();

	return (
		<>
			<div className="mt-8">
				<SelectedSegment />
			</div>
			<div className="flex w-full flex-1 items-center justify-center">
				{session ? children : <Login />}
			</div>
		</>
	);
};

export default Layout;
