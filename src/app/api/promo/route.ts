import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type Payload = {
  descripcion: string;
  rango: number;
  expiresAt: string;
  cantidadPromo: number;
};

type DeletePayload = {
  id: string;
};

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();
  const obj = {
    descripcion: data.descripcion,
    rango: data.rango,
    expires_at: `${data.expiresAt}T23:59:59.000Z`,
    cantidad_promo: data.cantidadPromo,
  };
  try {
    const promo = await prisma.promociones.create({ data: obj });
    return NextResponse.json(
      {
        sucess: true,
        result: {
          ...promo,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const data: DeletePayload = await req.json();
  try {
    await prisma.promociones.delete({
      where: {
        id: data.id,
      },
    });
    return NextResponse.json(
      {
        sucess: true,
        result: {
          message: "Eliminado con éxito"
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
      },
      {
        status: 500,
      }
    );
  }
}
