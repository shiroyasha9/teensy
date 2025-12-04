import { headers } from "next/headers";
import Login from "@/components/auth/Login";
import SelectedSegment from "@/components/SelectedSegment";
import { auth } from "@/lib/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

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
