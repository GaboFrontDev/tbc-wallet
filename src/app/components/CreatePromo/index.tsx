"use client";
import { FormEvent, useState } from "react";

import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Input from "@/app/components/Input";
import Title from "../Title";
import { toast } from "react-toastify";


export default function CreatePromo() {
  const [descripcion, setDescripcion] = useState("");
  const [rango, setRango] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [cantidadPromo, setCantidadPromo] = useState("");
  const [loading, setLoading] = useState(false);

  const crearPromo = (event: FormEvent) => {
    const apiUrl = `${window.location.origin}/api/promo`;
    if (loading) {
      return;
    }

    event.preventDefault();
    const id = toast.loading("Loading...");
    console.log(event.target);
    const req = fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        descripcion: descripcion,
        rango: +rango,
        expiresAt: expiresAt,
        cantidadPromo: +cantidadPromo,
      }),
    });
    req.then(async (res) => {
      if (res.ok) {
        setLoading(false);
        toast.update(id, {
          render: "Promo creada!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <Form onSubmit={crearPromo}>
      <Title className="text-lg">
        <b>Descripcion</b>
      </Title>
      <Input
        type="text"
        name="descripcion"
        id="descripcion"
        placeholder="2 bebidas"
        className="my-2"
        onChange={(e) => setDescripcion(e.target.value)}
        value={descripcion}
      />
      <br />
      <Title className="text-lg">
        <b>En cuánto va a aplicar</b>
      </Title>
      <Input
        type="text"
        name="rango"
        id="rango"
        placeholder="300"
        className="my-2"
        onChange={(e) => setRango(e.target.value)}
        value={rango}
      />
      <br />
      <Title className="text-lg">
        <b>Cuándo expira</b>
      </Title>
      <Input
        type="date"
        name="expires_at"
        id="expires_at"
        className="my-2"
        onChange={(e) => setExpiresAt(e.target.value)}
        value={expiresAt}
      />
      <br />
      <Title className="text-lg">
        <b>Cuántas promos</b>
      </Title>
      <Input
        type="number"
        name="cantidad_promo"
        id="cantidad_promo"
        placeholder="10"
        className="my-2"
        onChange={(e) => setCantidadPromo(e.target.value)}
        value={cantidadPromo}
      />

      <Button type="submit" className="w-full">
        Crear
      </Button>
    </Form>
  );
}
