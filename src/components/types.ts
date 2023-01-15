import { ReactNode } from "react";

export type Styled = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => JSX.Element;
