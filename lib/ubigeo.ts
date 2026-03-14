export type Departamento = {
  idDepa: string;
  departamento: string;
  display_id: string;
};

export type Provincia = {
  idProv: string;
  provincia: string;
  idDepa: string;
};

export type Distrito = {
  idDist: string;
  distrito: string;
  idProv: string;
};

export type ShippingMethod = {
  method_id: string;
  method_title: string;
  cost: number;
  type: "flat_rate" | "free" | "free_coupon" | "local_pickup";
};

export type UbigeoSelection = {
  idDepa: string;
  idProv: string;
  idDist: string;
  departamentoName: string;
  provinciaName: string;
  distritoName: string;
};

export async function getDepartamentos(): Promise<Departamento[]> {
  const res = await fetch("/api/ubigeo?action=departamentos");
  if (!res.ok) throw new Error("Error al cargar departamentos");
  return res.json();
}

export async function getProvincias(idDepa: string): Promise<Provincia[]> {
  const res = await fetch(`/api/ubigeo?action=provincias&idDepa=${idDepa}`);
  if (!res.ok) throw new Error("Error al cargar provincias");
  return res.json();
}

export async function getDistritos(idProv: string): Promise<Distrito[]> {
  const res = await fetch(`/api/ubigeo?action=distritos&idProv=${idProv}`);
  if (!res.ok) throw new Error("Error al cargar distritos");
  return res.json();
}

export async function getShippingMethods(
  idDepa: string,
  idDist: string,
  cartTotal: number
): Promise<ShippingMethod[]> {
  const res = await fetch(
    `/api/ubigeo?action=shipping&idDepa=${idDepa}&idDist=${idDist}&cartTotal=${cartTotal}`
  );
  if (!res.ok) throw new Error("Error al calcular envío");
  const data = await res.json();
  return data.methods;
}
