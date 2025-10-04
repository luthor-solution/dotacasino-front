import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import FancyInput from "@/components/FancyInput";
import { useTranslation } from "react-i18next";

interface GameFiltersProps {
  filters: {
    search: string;
    category: string;
    device: string;
    sort: string;
  };
  onChange: (filters: Partial<GameFiltersProps["filters"]>) => void;
  isMobile: boolean;
}

/* const devices = [
  { value: "", label: "Dispositivo" },
  { value: "DESKTOP", label: "Escritorio" },
  { value: "MOBILE", label: "Móvil" },
];
const sorts = [
  { value: "order", label: "Por defecto" },
  { value: "alpha", label: "Alfabético" },
  { value: "recent", label: "Recientes" },
]; */

const GameFilters: React.FC<GameFiltersProps> = ({
  filters,
  onChange,
  isMobile,
}) => {
  // Estado local para el input de búsqueda
  const [searchValue, setSearchValue] = useState(filters.search);
  const { t } = useTranslation();

  // Sincroniza el valor local si el filtro externo cambia (por ejemplo, al limpiar filtros)
  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  // Debounce para el input de búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== filters.search) {
        onChange({ search: searchValue });
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [searchValue]);

  return (
    <form
      className={`w-full mb-6 grid gap-3 ${
        isMobile ? "grid-cols-1" : "grid-cols-3"
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      <FancyInput
        placeholder={t("searchGame")}
        name="search"
        icon={<FaSearch />}
        value={searchValue}
        onChange={setSearchValue}
      />
      {/*     <FancySelect
        name="category"
        icon={<FaLayerGroup />}
        value={filters.category}
        onChange={(v) => onChange({ category: v })}
        options={categories}
      /> */}
      {/*   <FancySelect
        name="device"
        icon={<FaMobileAlt />}
        value={filters.device}
        onChange={(v) => onChange({ device: v })}
        options={devices}
      />
      <FancySelect
        name="sort"
        icon={<FaSortAlphaDown />}
        value={filters.sort}
        onChange={(v) => onChange({ sort: v })}
        options={sorts}
      /> */}
    </form>
  );
};

export default GameFilters;
