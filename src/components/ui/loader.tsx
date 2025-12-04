import { Loader2, type LucideProps } from "lucide-react";
import { cn } from "@/utils";

export const Loader = ({ className, ...props }: LucideProps) => {
	return (
		<Loader2
			className={cn("size-8 animate-spin text-primary/60", className)}
			{...props}
		/>
	);
};
