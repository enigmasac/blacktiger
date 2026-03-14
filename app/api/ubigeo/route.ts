import { NextRequest, NextResponse } from "next/server";

const WC_URL = process.env.WC_URL!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  switch (action) {
    case "departamentos": {
      const res = await fetch(`${WC_URL}/wp-json/ubigeo/v1/departamentos`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    case "provincias": {
      const idDepa = searchParams.get("idDepa");
      if (!idDepa) {
        return NextResponse.json(
          { error: "idDepa requerido" },
          { status: 400 }
        );
      }
      const res = await fetch(
        `${WC_URL}/wp-json/ubigeo/v1/provincias/${idDepa}`
      );
      const data = await res.json();
      return NextResponse.json(data);
    }

    case "distritos": {
      const idProv = searchParams.get("idProv");
      if (!idProv) {
        return NextResponse.json(
          { error: "idProv requerido" },
          { status: 400 }
        );
      }
      const res = await fetch(
        `${WC_URL}/wp-json/ubigeo/v1/distritos/${idProv}`
      );
      const data = await res.json();
      return NextResponse.json(data);
    }

    case "shipping": {
      const idDepa = searchParams.get("idDepa");
      const idDist = searchParams.get("idDist");
      const cartTotal = searchParams.get("cartTotal") || "0";

      if (!idDepa || !idDist) {
        return NextResponse.json(
          { error: "idDepa e idDist requeridos" },
          { status: 400 }
        );
      }

      const res = await fetch(
        `${WC_URL}/wp-json/ubigeo/v1/shipping-cost?idDepa=${idDepa}&idDist=${idDist}&cartTotal=${cartTotal}`
      );
      const data = await res.json();
      return NextResponse.json(data);
    }

    default:
      return NextResponse.json(
        { error: "Acción no válida" },
        { status: 400 }
      );
  }
}
