"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  Departamento,
  Provincia,
  Distrito,
  ShippingMethod,
  UbigeoSelection,
} from "@/lib/ubigeo";
import {
  getDepartamentos,
  getProvincias,
  getDistritos,
  getShippingMethods,
} from "@/lib/ubigeo";

type UbigeoSelectorProps = {
  cartTotal: number;
  onSelectionChange: (selection: UbigeoSelection | null) => void;
  onShippingChange: (methods: ShippingMethod[]) => void;
  className?: string;
};

const selectClass =
  "w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-10 font-roboto text-sm text-text outline-none transition-colors focus:border-peach disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

const chevronSvg = (
  <svg
    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function UbigeoSelector({
  cartTotal,
  onSelectionChange,
  onShippingChange,
  className = "",
}: UbigeoSelectorProps) {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [distritos, setDistritos] = useState<Distrito[]>([]);

  const [selectedDepa, setSelectedDepa] = useState("");
  const [selectedProv, setSelectedProv] = useState("");
  const [selectedDist, setSelectedDist] = useState("");

  const [loadingProv, setLoadingProv] = useState(false);
  const [loadingDist, setLoadingDist] = useState(false);
  const [loadingShipping, setLoadingShipping] = useState(false);

  useEffect(() => {
    getDepartamentos().then(setDepartamentos).catch(() => {});
  }, []);

  const handleDepaChange = useCallback(
    async (idDepa: string) => {
      setSelectedDepa(idDepa);
      setSelectedProv("");
      setSelectedDist("");
      setProvincias([]);
      setDistritos([]);
      onSelectionChange(null);
      onShippingChange([]);

      if (!idDepa) return;

      setLoadingProv(true);
      try {
        const data = await getProvincias(idDepa);
        setProvincias(data);
      } catch {
        setProvincias([]);
      } finally {
        setLoadingProv(false);
      }
    },
    [onSelectionChange, onShippingChange]
  );

  const handleProvChange = useCallback(
    async (idProv: string) => {
      setSelectedProv(idProv);
      setSelectedDist("");
      setDistritos([]);
      onSelectionChange(null);
      onShippingChange([]);

      if (!idProv) return;

      setLoadingDist(true);
      try {
        const data = await getDistritos(idProv);
        setDistritos(data);
      } catch {
        setDistritos([]);
      } finally {
        setLoadingDist(false);
      }
    },
    [onSelectionChange, onShippingChange]
  );

  const handleDistChange = useCallback(
    async (idDist: string) => {
      setSelectedDist(idDist);

      if (!idDist) {
        onSelectionChange(null);
        onShippingChange([]);
        return;
      }

      const depa = departamentos.find((d) => d.idDepa === selectedDepa);
      const prov = provincias.find((p) => p.idProv === selectedProv);
      const dist = distritos.find((d) => d.idDist === idDist);

      if (depa && prov && dist) {
        onSelectionChange({
          idDepa: selectedDepa,
          idProv: selectedProv,
          idDist: idDist,
          departamentoName: depa.departamento,
          provinciaName: prov.provincia,
          distritoName: dist.distrito,
        });
      }

      setLoadingShipping(true);
      try {
        const methods = await getShippingMethods(selectedDepa, idDist, cartTotal);
        onShippingChange(methods);
      } catch {
        onShippingChange([]);
      } finally {
        setLoadingShipping(false);
      }
    },
    [
      selectedDepa,
      selectedProv,
      departamentos,
      provincias,
      distritos,
      cartTotal,
      onSelectionChange,
      onShippingChange,
    ]
  );

  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className}`}>
      <div className="relative">
        <select
          value={selectedDepa}
          onChange={(e) => handleDepaChange(e.target.value)}
          required
          className={selectClass}
        >
          <option value="">Departamento</option>
          {departamentos.map((d) => (
            <option key={d.idDepa} value={d.idDepa}>
              {d.departamento}
            </option>
          ))}
        </select>
        {chevronSvg}
      </div>

      <div className="relative">
        <select
          value={selectedProv}
          onChange={(e) => handleProvChange(e.target.value)}
          disabled={!selectedDepa || loadingProv}
          required
          className={selectClass}
        >
          <option value="">
            {loadingProv ? "Cargando..." : "Provincia"}
          </option>
          {provincias.map((p) => (
            <option key={p.idProv} value={p.idProv}>
              {p.provincia}
            </option>
          ))}
        </select>
        {chevronSvg}
      </div>

      <div className="relative">
        <select
          value={selectedDist}
          onChange={(e) => handleDistChange(e.target.value)}
          disabled={!selectedProv || loadingDist}
          required
          className={`${selectClass} ${loadingShipping ? "animate-pulse" : ""}`}
        >
          <option value="">
            {loadingDist ? "Cargando..." : "Distrito"}
          </option>
          {distritos.map((d) => (
            <option key={d.idDist} value={d.idDist}>
              {d.distrito}
            </option>
          ))}
        </select>
        {chevronSvg}
      </div>
    </div>
  );
}
