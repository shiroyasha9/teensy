import { cn } from "@/utils";
import { Loader2, type LucideProps } from "lucide-react";

export const Loader = ({ className, ...props }: LucideProps) => {
	return (
		<Loader2
			className={cn("size-8 animate-spin text-primary/60", className)}
			{...props}
		/>
	);
};
