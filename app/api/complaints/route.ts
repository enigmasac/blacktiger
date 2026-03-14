import { NextRequest, NextResponse } from "next/server";

const WC_URL = process.env.WC_URL!;
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY!;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    name,
    documentType,
    documentNumber,
    address,
    phone,
    email,
    isMinor,
    guardianName,
    type,
    serviceDescription,
    amountClaimed,
    detail,
    consumerRequest,
  } = body;

  if (!name || !documentNumber || !address || !phone || !email || !serviceDescription || !detail || !consumerRequest) {
    return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
  }

  const typeLabel = type === "reclamo" ? "Reclamo" : "Queja";
  const timestamp = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });
  const id = Date.now();

  const noteContent = [
    `📋 LIBRO DE RECLAMACIONES - ${typeLabel.toUpperCase()} #${id}`,
    `Fecha: ${timestamp}`,
    ``,
    `— DATOS DEL CONSUMIDOR —`,
    `Nombre: ${name}`,
    `Documento: ${documentType} ${documentNumber}`,
    `Domicilio: ${address}`,
    `Teléfono: ${phone}`,
    `Email: ${email}`,
    isMinor ? `Menor de edad: Sí — Tutor: ${guardianName}` : null,
    ``,
    `— DETALLE DEL SERVICIO —`,
    `Descripción: ${serviceDescription}`,
    amountClaimed ? `Monto reclamado: S/ ${amountClaimed}` : null,
    ``,
    `— DETALLE DEL ${typeLabel.toUpperCase()} —`,
    `${detail}`,
    ``,
    `— PEDIDO DEL CONSUMIDOR —`,
    `${consumerRequest}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      `${WC_URL}/wp-json/wc/v3/orders?consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "on-hold",
          billing: {
            first_name: name,
            email,
            phone,
            address_1: address,
            city: "Lima",
            country: "PE",
          },
          customer_note: noteContent,
          line_items: [],
          meta_data: [
            { key: "_complaint_type", value: type },
            { key: "_complaint_id", value: String(id) },
            { key: "_complaint_document", value: `${documentType} ${documentNumber}` },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`WC error: ${res.status}`);
    }

    return NextResponse.json({ id, type });
  } catch {
    return NextResponse.json({ error: "Error al registrar" }, { status: 500 });
  }
}
