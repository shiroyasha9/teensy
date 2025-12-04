import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { AutoDeleteDropdownData } from "@/types";

type DropdownProps = {
	label: string;
	data: AutoDeleteDropdownData[];
	onChange: (value: number) => void;
	disabled?: boolean;
};

const Dropdown = (props: DropdownProps) => {
	const { data, disabled, label, onChange } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative w-full">
			<button
				className="inline-flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-center text-sm shadow-xs placeholder:text-muted-foreground hover:bg-background/10 focus:outline-hidden focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
				onClick={() => setIsOpen((prev) => !prev)}
				disabled={disabled}
				type="button"
			>
				{label}
				<ChevronDownIcon className="ml-2 size-4" />
			</button>
			<div
				className={`z-10 mt-1 w-full divide-y divide-zinc-100 rounded-lg bg-white shadow dark:bg-zinc-900 ${
					isOpen ? "absolute" : "hidden"
				}`}
			>
				<ul className="py-2 text-sm text-zinc-700 dark:text-zinc-200">
					{data.map((item) => (
						<li key={item.label}>
							<button
								className="block w-full px-4 py-2 text-left hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
								onClick={() => {
									onChange(item.minutesToExpire);
									setIsOpen(false);
								}}
								type="button"
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
