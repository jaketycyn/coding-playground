import { ReactNode } from "react";

export interface CardProps {
  className?: string;
  children: ReactNode;
}

export interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export type CardContentProps = {
  className?: string;
  children: ReactNode;
};

export type CardFooterProps = {
  className?: string;
  children: ReactNode;
};
