import type { AutoDeleteDropdownData } from "@/types";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

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
        className="inline-flex w-full items-center justify-between rounded-lg border-none bg-white px-4 py-2.5 text-center text-sm text-black hover:bg-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
        type="button"
      >
        {label}
        <FiChevronDown className="ml-2 h-4 w-4" />
      </button>
      <div
        className={`z-10 mt-1 w-full divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700  ${isOpen ? "absolute" : "hidden"
          }`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {data.map((item) => (
            <li key={item.label}>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
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
