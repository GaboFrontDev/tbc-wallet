import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import CreatePromo from "@/app/components/CreatePromo";
import Title from "@/app/components/Title";
import Link from "next/link";
import FlexContainer from "@/app/components/FlexContainer";

const defaultLinkClasses =
"block text-center bg-black/80 hover:bg-gray-100 hover:text-black text-white  shadow shadow-lg font-semibold py-2 px-4 my-2 rounded-full w-full";

export default function PromosPage() {
    
  return (
    <FlexContainer className="w-full h-full">
      <div className="w-11/12">
        <Title className="text-[40px]">
          <b>Crear Promo</b>
        </Title>
        <div>
          <CreatePromo />
        </div>
        <Link className={defaultLinkClasses} href={"/promos"}>
          <b>Regresar</b>
        </Link>
      </div>
      <ToastContainer
        closeOnClick
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </FlexContainer>
  );
}
