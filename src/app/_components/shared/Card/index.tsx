import React from "react";

//! import types
import {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardContentProps,
  CardFooterProps,
} from "./types";

export const Card = ({ className = "", children }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className = "", children }: CardHeaderProps) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = "", children }: CardTitleProps) => {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
};

export const CardContent = ({ className = "", children }: CardContentProps) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardFooter = ({ className = "", children }: CardFooterProps) => {
  return <div className={`px-6 py -4 ${className}`}>{children}</div>;
};
