"use client";
import Link from "next/link";
import type { ReactNode } from "react";

const LinkWithActiveClass = ({
  href,
  children,
  className,
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <Link
      {...{
        href,
      }}
      className={`${className} mx-4`}
    >
      {children}
    </Link>
  );
};

export default function Nav({
  isAdmin,
  className,
}: {
  isAdmin: boolean;
  className?: string;
}) {
  if (!isAdmin) {
    return <>
    <div className="w-full">
        <div className="w-full">
          <LinkWithActiveClass href="/qr">
            Mi cuenta
          </LinkWithActiveClass>
        </div>
      </div></>;
  }
  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <LinkWithActiveClass href="/balance">
            Crear nueva cuenta
          </LinkWithActiveClass>
        </div>
        <div className={`${className} my-2`}>
          <LinkWithActiveClass href="/admin">Cobrar</LinkWithActiveClass>
        </div>
      </div>
    </>
  );
}
