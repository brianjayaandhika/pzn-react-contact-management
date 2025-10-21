import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import _ from "lodash";

type Props<T extends string | number> = {
  options: T[];
  value: T;
  label: string;
  mapper: string;
  handleChange: (e: SelectChangeEvent<T>) => void;
  fontSize?: string;
  customStyle?: string;
  IconComponent: React.ComponentType<{
    size?: string;
    style?: { color: string };
  }>;
  defaultValue: T;
};

export default function SelectMenu<T extends string | number>({
  options,
  value,
  label,
  mapper,
  handleChange,
  fontSize,
  customStyle,
  defaultValue,
}: Props<T>) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        className={`${customStyle} w-full flex flex-col justify-start items-start gap-2 border-0 rounded-xl`}
      >
        <label
          htmlFor={mapper}
          className={`${fontSize ? fontSize : "text-sm"}`}
        >
          {label}
        </label>
        <Select
          defaultValue={defaultValue}
          sx={{
            color: "white",
            fontSize: "0.875rem",
            ".MuiSelect-icon": {
              color: "white",
            },
          }}
          id={mapper}
          value={value}
          onChange={handleChange}
          className="w-full h-5! outline-none bg-gray-700/50 focus-within:border-blue-400 border border-gray-600 rounded-xl px-2! py-[22px]! text-gray"
        >
          {options?.map((option: T, i: number) => (
            <MenuItem
              sx={{
                color: "black",
                fontSize: "0.875rem",
              }}
              key={i}
              value={option as string | number}
            >
              {typeof option === "string"
                ? option === "IN_PROGRESS"
                  ? "On Going"
                  : _.capitalize(option)
                : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
