import React from "react";
import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface INavbar extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

export const Navbar = ({ children, ...props }: INavbar) => {
    const classes = `flex gap-3`;

    return (
        <div className={twMerge(classes, { ...props }.className)}>
            {children}
        </div>
    );
};
