"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import FlexContainer from "../FlexContainer";
import { twMerge } from "tailwind-merge";

const LinkWithActiveClass = ({
  href,
  children,
  className,
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}) => {
  const classes = twMerge("mx-4", className);
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};

type NavProps = {
  isAdmin: boolean;
  className?: string;
};

export default function Nav({ isAdmin }: NavProps) {
  if (!isAdmin) {
    return (
      <FlexContainer>
        <LinkWithActiveClass href="/qr">Ver mi QR</LinkWithActiveClass>
      </FlexContainer>
    );
  }
  return (
    <div className="w-full">
      <FlexContainer className="my-2 h-[40px]">
        <LinkWithActiveClass href="/balance">
          Crear nueva cuenta
        </LinkWithActiveClass>
      </FlexContainer>
      <FlexContainer className="my-2 h-[40px]">
        <LinkWithActiveClass href="/admin">Cobrar</LinkWithActiveClass>
      </FlexContainer>
      <FlexContainer className="my-2 h-[40px]">
        <LinkWithActiveClass href="/promos">Ver Promos</LinkWithActiveClass>
      </FlexContainer>
    </div>
  );
}
