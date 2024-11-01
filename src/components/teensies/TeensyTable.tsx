"use client";

import { Input } from "@/components/ui/input";
import type { Teensy, Visit } from "@/server/db/zod-schemas";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import TeensyRow from "./TeensyRow";

type TeensyTableProps = {
	userTeensies: (Teensy & { visits: Visit[] })[];
	ownerId: string;
};

const TeensyTable = ({ userTeensies, ownerId }: TeensyTableProps) => {
	const [search, setSearch] = useState("");

	const filteredData = useMemo(() => {
		if (userTeensies) {
			if (search !== "") {
				return userTeensies.filter(
					(teensy) =>
						teensy.slug.toLowerCase().includes(search.toLowerCase()) ||
						teensy.url.toLowerCase().includes(search.toLowerCase()),
				);
			}
			return userTeensies;
		}
	}, [userTeensies, search]);

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	const debouncedSearchChangeHandler = useMemo(() => {
		return debounce(handleSearchChange, 300);
	}, []);

	useEffect(() => {
		return () => {
			debouncedSearchChangeHandler.cancel();
		};
	});

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<div className="my-4 w-[90vw] sm:w-[85vw]">
				<label htmlFor="table-search" className="sr-only">
					Search
				</label>
				<div className="relative mx-[2px] mt-1">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Search className="size-4 text-zinc-500 dark:text-zinc-400" />
					</div>
					<Input
						type="text"
						className="!p-2 !pl-10 my-0 block w-full rounded-lg border px-3 py-0 text-sm"
						placeholder="Search for any url or slug..."
						defaultValue=""
						onChange={debouncedSearchChangeHandler}
					/>
				</div>
			</div>
			<div className="relative w-[90vw] overflow-x-auto sm:w-[85vw] sm:rounded-lg ">
				<div className="block h-64 max-h-64 rounded-md">
					<table className="w-full rounded-md text-left text-sm text-zinc-500 dark:text-zinc-400">
						<thead className="sticky top-0 z-0 bg-zinc-200 text-xs text-zinc-700 uppercase dark:bg-zinc-800 dark:text-zinc-400">
							<tr>
								<th scope="col" className="px-4 py-3 text-center">
									Actions
								</th>
								<th scope="col" className="px-4 py-3">
									Teensy Slug
								</th>
								<th scope="col" className="px-4 py-3">
									Visits
								</th>
								<th scope="col" className="px-4 py-3 ">
									Full URL
								</th>
							</tr>
						</thead>
						<tbody className="max-h-64 overflow-y-auto">
							{filteredData?.map((teensy) => (
								<TeensyRow teensy={teensy} ownerId={ownerId} key={teensy.id} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TeensyTable;
