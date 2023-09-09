"use client";
import { MouseEvent, useState } from "react";
import { es } from "date-fns/esm/locale";
import { format } from "date-fns";
import { promociones } from "@prisma/client";

import { IconTrash } from "../Icons";
import Title from "../Title";
import { deletePromo } from "@/app/lib/utils";
import { toast } from "react-toastify";
import Subtitle from "../Subtitle";

type PromosContainerProps = {
  promos: promociones[];
};

type DeletePromoData = {
  id: string;
  index: number;
};

export default function PromosContainer(props: PromosContainerProps) {
  const { promos } = props;

  const [promosState, setPromosState] = useState(promos);

  const deleteHandler = (event: MouseEvent, { id, index }: DeletePromoData) => {
    event.stopPropagation();
    event.preventDefault();
    const toastId = toast.loading("Loading...");
    deletePromo(id).then((req) => {
      if (!req.ok) {
        toast.update(toastId, {
          render: "Error al eliminar la promo :(",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }
      toast.update(toastId, {
        render: "Promo eliminada!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      promosState.splice(index, 1);
      setPromosState([...promosState]);
    });
  };

  const EmpyPromos = () => {
    return (
      <div className="h-full text-center inline-flex w-full items-center">
        <div className="w-full">
          <div>
            <Title>No tienes ninguna promo activa</Title>
          </div>
          <div>
            <Subtitle>Por ahora...</Subtitle>
          </div>
        </div>
      </div>
    );
  };

  if (promosState.length == 0) {
    return <EmpyPromos />;
  }

  return (
    <div className="grid gird-cols-1 divide-y w-full">
      {promosState.map(
        (
          { created_at, descripcion, cantidad_promo, rango, expires_at, id },
          index
        ) => {
          return (
            <div key={`promo-${index}`} className="px-2 relative">
              <div className="my-4">
                <div>
                  <Title>{descripcion}</Title>
                </div>

                <div>
                  <Title>
                    Creada el{" "}
                    <b>
                      {format(created_at, "dd MMMMMMM yyyy", { locale: es })}
                    </b>
                  </Title>
                </div>
                <div>
                  Restan <b>{cantidad_promo}</b> promos
                </div>
                <div>
                  Se obtiene al cargar <b>${rango}</b>
                </div>
                <div>
                  Expiración:{" "}
                  <b>
                    {format(expires_at, "dd MMMMMMM yyyy", {
                      locale: es,
                    })}
                  </b>
                </div>
              </div>
              <div
                className="absolute top-4 right-3 cursor-pointer"
                onClick={(event) => deleteHandler(event, { id, index })}
              >
                <IconTrash />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
