import React from "react";
import { Input } from "@/components/ui/input";

const CustomInput = ({ value, name, onChange, children, ...props }) => {
  return (
    <div className="flex items-center">
      <Input
        value={value}
        placeholder={name}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="pl-9 w-full"
        {...props}
      />
      <div className="absolute left-8">{children}</div>
    </div>
  );
};

export default CustomInput;
