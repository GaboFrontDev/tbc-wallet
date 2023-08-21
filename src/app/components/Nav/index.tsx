"use client";
import Link from "next/link";
import type { ReactNode } from "react";

const LinkWithActiveClass = ({
  href,
  children,
}: {
  href: string;
  children?: ReactNode;
}) => {
  return (
    <Link
      {...{
        href,
      }}
      className="mx-4"
    >
      {children}
    </Link>
  );
};

export default function Nav({isAdmin}: {isAdmin: boolean}) {
  if(!isAdmin) {
    return <></>
  }
  return (

    <div className="my-2 flex">
      <LinkWithActiveClass href="/account">Consultar Saldo</LinkWithActiveClass>
      <LinkWithActiveClass href="/balance">
        Crear nueva cuenta
      </LinkWithActiveClass>
      <LinkWithActiveClass href="/admin">
        Cobrar
      </LinkWithActiveClass>
    </div>
  );
}
