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
export type MultipleTeensiesFormData = {
  slug: string;
  url: string;
  isPasswordProtected: boolean;
  password?: string;
  used?: boolean;
};
