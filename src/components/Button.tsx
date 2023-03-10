import { css } from "@emotion/react";
import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  className,
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      css={css`
        cursor: pointer;
        border: 1px solid;
        margin: 4px 0;
        padding: 4px 6px;
        border-radius: 6px;
        background-color: unset;

        ${disabled
          ? ""
          : css`
              &:hover {
                background: #c8c8c8;
              }
            `}
      `}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
