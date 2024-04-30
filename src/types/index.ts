export type AutoDeleteDropdownData = {
	label: string;
	minutesToExpire: number;
};

export type MultipleTeensiesFormData = {
	slug: string;
	url: string;
	isPasswordProtected: boolean;
	password?: string;
	used?: boolean;
};
