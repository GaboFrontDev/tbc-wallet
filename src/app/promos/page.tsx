import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Title from "../components/Title";
import { prisma } from "../lib/prisma";
import Link from "next/link";
import PromosContainer from "../components/PromosContainer";
import ContainerWithShadow from "../components/ShadowContainer";
import FlexContainer from "../components/FlexContainer";

const defaultLinkClasses =
  "block text-center bg-black/80 hover:bg-gray-100 hover:text-black text-whitea shadow shadow-lg font-semibold py-2 px-4 my-2 rounded-full w-full";

export default async function PromosPage() {
  const promos = await prisma.promociones.findMany({
    where: {
      expires_at: {
        gt: new Date(),
      },
    },
  });

  return (
    <FlexContainer className="w-full h-full">
      <div className="w-11/12">
        <Title className="text-[40px]">
          <b>Tus Promos</b>
        </Title>
        <ContainerWithShadow className="h-[300px] overflow-auto">
          <FlexContainer className="w-full h-full">
            <PromosContainer promos={promos} />
          </FlexContainer>
        </ContainerWithShadow>
        <Link className={defaultLinkClasses} href={"/promos/crear"}>
          <b>Crear Promo</b>
        </Link>
      </div>
      <ToastContainer
        closeOnClick
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </FlexContainer>
  );
}
