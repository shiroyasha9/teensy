export type FormData = {
  slug: string;
  url: string;
  isPasswordProtected: boolean;
  isAutoDelete: boolean;
  password?: string;
  expiresAt?: Date;
  expiresIn?: number;
};

export type AutoDeleteDropdownData = {
  label: string;
  minutesToExpire: number;
};
