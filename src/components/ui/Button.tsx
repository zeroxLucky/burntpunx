import React from "react";

export const ButtonStyles =
  "max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center";

const Button = ({
  label,
  classNames,
  onPress,
}: {
  label: string;
  classNames?: string;
  onPress(e: React.MouseEvent<HTMLButtonElement>): void;
}) => {
  return (
    <button
      className={`${ButtonStyles} ${classNames ?? "text-gold "}`}
      onClick={onPress}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
