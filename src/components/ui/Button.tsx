import React from "react";

export const ButtonStyles =
  "max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center";

const Button = ({
  label,
  classNames,
  children,
  onPress,
  disabled,
}: {
  label?: string;
  classNames?: string;
  children?: React.ReactNode;
  onPress(e: React.MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className={`${ButtonStyles} ${classNames ?? "text-gold "}`}
      onClick={onPress}
    >
      {label && <span>{label}</span>}
      {children}
    </button>
  );
};

export default Button;
