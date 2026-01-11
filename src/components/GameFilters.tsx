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
}

const GameFilters: React.FC<GameFiltersProps> = ({
  filters,
  onChange,
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
      className="w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <FancyInput
        placeholder={t("searchGame")}
        name="search"
        icon={<FaSearch />}
        value={searchValue}
        onChange={setSearchValue}
      />
    </form>
  );
};

export default GameFilters;
