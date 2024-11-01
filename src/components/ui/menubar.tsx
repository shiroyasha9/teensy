"use client";

import {
	CheckIcon,
	ChevronRightIcon,
	DotFilledIcon,
} from "@radix-ui/react-icons";
import * as MenubarPrimitive from "@radix-ui/react-menubar";

import { cn } from "@/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = ({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) => (
	<MenubarPrimitive.Root
		className={cn(
			"flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
			className,
		)}
		{...props}
	/>
);
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = ({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) => (
	<MenubarPrimitive.Trigger
		className={cn(
			"flex cursor-default select-none items-center rounded-sm px-3 py-1 font-medium text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
			className,
		)}
		{...props}
	/>
);
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = ({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
	inset?: boolean;
}) => (
	<MenubarPrimitive.SubTrigger
		className={cn(
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRightIcon className="ml-auto h-4 w-4" />
	</MenubarPrimitive.SubTrigger>
);
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = ({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) => (
	<MenubarPrimitive.SubContent
		className={cn(
			"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
			className,
		)}
		{...props}
	/>
);
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = ({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) => (
	<MenubarPrimitive.Portal>
		<MenubarPrimitive.Content
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn(
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in",
				className,
			)}
			{...props}
		/>
	</MenubarPrimitive.Portal>
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = ({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
	inset?: boolean;
}) => (
	<MenubarPrimitive.Item
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
);
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = ({
	className,
	children,
	checked,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) => (
	<MenubarPrimitive.CheckboxItem
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<CheckIcon className="h-4 w-4" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.CheckboxItem>
);
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) => (
	<MenubarPrimitive.RadioItem
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<DotFilledIcon className="h-4 w-4 fill-current" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.RadioItem>
);
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = ({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
	inset?: boolean;
}) => (
	<MenubarPrimitive.Label
		className={cn(
			"px-2 py-1.5 font-semibold text-sm",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
);
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = ({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) => (
	<MenubarPrimitive.Separator
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
);
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				"ml-auto text-muted-foreground text-xs tracking-widest",
				className,
			)}
			{...props}
		/>
	);
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
	MenubarLabel,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarPortal,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarGroup,
	MenubarSub,
	MenubarShortcut,
};
