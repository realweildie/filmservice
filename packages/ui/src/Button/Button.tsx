import React, { FC } from "react";

export interface ButtonProps {
  children: string;
}

export const Button: FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};
