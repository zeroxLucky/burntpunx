import React from "react";

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
      className={`max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center ${
        classNames ?? `text-gold `
      }`}
      onClick={onPress}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
