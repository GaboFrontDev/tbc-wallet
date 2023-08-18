import Link from "next/link";
import type { ReactNode } from "react";

export default function Nav() {

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

  return (
    <div className="my-2 flex">
      <div>
        <LinkWithActiveClass href="/account">
          Consultar Saldo
        </LinkWithActiveClass>
        <LinkWithActiveClass href="/balance">
          Crear nueva cuenta
        </LinkWithActiveClass>
      </div>
    </div>
  );
}
