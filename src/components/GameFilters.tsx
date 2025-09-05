import React from "react";
import { FaSearch, FaMobileAlt, FaSortAlphaDown } from "react-icons/fa";
import FancyInput from "@/components/FancyInput";
import FancySelect from "@/components/FancySelect";

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

const devices = [
  { value: "", label: "Dispositivo" },
  { value: "DESKTOP", label: "Escritorio" },
  { value: "MOBILE", label: "Móvil" },
];
const sorts = [
  { value: "order", label: "Por defecto" },
  { value: "alpha", label: "Alfabético" },
  { value: "recent", label: "Recientes" },
];

const GameFilters: React.FC<GameFiltersProps> = ({
  filters,
  onChange,
  isMobile,
}) => (
  <form
    className={`w-full mb-6 grid gap-3 ${
      isMobile ? "grid-cols-1" : "grid-cols-3"
    }`}
    onSubmit={(e) => e.preventDefault()}
  >
    <FancyInput
      placeholder="Buscar juego..."
      name="search"
      icon={<FaSearch />}
      value={filters.search}
      onChange={(v) => onChange({ search: v })}
    />
    {/*     <FancySelect
      name="category"
      icon={<FaLayerGroup />}
      value={filters.category}
      onChange={(v) => onChange({ category: v })}
      options={categories}
    /> */}
    <FancySelect
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
    />
  </form>
);

export default GameFilters;
