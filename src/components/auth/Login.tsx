import { cn } from "@/utils";
import UserAuthForm from "./UserAuthForm";

const Login = () => {
	return (
		<div className="py-12">
			<div className="px-4 sm:px-12">
				<h3 className="mt-6 text-center font-bold text-lg sm:text-2xl dark:text-white">
					Create your account
				</h3>

				<div
					className={cn(
						"mt-2 text-center text-base text-zinc-500 dark:text-zinc-300",
					)}
				>
					Please create an account to save your teensies to edit/delete them
					later.
				</div>

				<div className="mt-10">
					<UserAuthForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
