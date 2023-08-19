"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCookies } from "next-client-cookies";
import { parseJwt } from "@/app/lib/utils";

type TokenData = {
  is_admin?: boolean
}

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

export default function Nav() {
  const cookies = useCookies();
  const token = cookies.get("session_token");
  let data: TokenData = {};
  if (token) {
    data = parseJwt(token).data as TokenData;
  }
  return (
    <div className="my-2 flex">
      <LinkWithActiveClass href="/account">Consultar Saldo</LinkWithActiveClass>
      {data?.is_admin && <LinkWithActiveClass href="/balance">
        Crear nueva cuenta
      </LinkWithActiveClass>}
    </div>
  );
}
