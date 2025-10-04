import React, { useState, useRef, useEffect } from "react";
import { countries } from "@/utils/countries";
import { useTranslation } from "react-i18next";

interface CountryPhoneInputProps {
  value: string; // Ejemplo: "+521234567890"
  onChange?: (fullPhone: string) => void;
}

const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  value,
  onChange,
}) => {
  // Extrae prefijo y número
  const match = value.match(/^(\+\d+)(\d{0,})$/);
  const initialPrefix = match ? match[1] : "+52";
  const initialNumber = match ? match[2] : "";

  // Estado para país y número
  const [country, setCountry] = useState(
    countries.find((c) => c.code === initialPrefix) ||
      countries.find((c) => c.code === "+52") ||
      countries[0]
  );
  const [phone, setPhone] = useState(initialNumber);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Bandera para saber si el cambio viene del input
  const isInternalChange = useRef(false);

  // Sincroniza país y número si cambia value desde el padre
  useEffect(() => {
    console.log(value);
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return; // No actualices el estado si el cambio vino del input
    }
    const number = value.slice(-10); // últimos 10 dígitos
    const prefix = value.slice(0, value.length - 10) || "+52"; // el resto, o "+52" por default

    console.log("prefix:", prefix); // "+52"
    console.log("number:", number); // "6691618430"
    if (country.code !== prefix) {
      const nextCountry =
        countries.find((c) => c.code === prefix) ||
        countries.find((c) => c.code === "+52") ||
        countries[0];
      setCountry(nextCountry);
    }
    if (phone !== number) {
      setPhone(number);
    }
    // eslint-disable-next-line
  }, [value]);

  // Cerrar el menú si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search) ||
      c.flag.includes(search)
  );

  const handleCountrySelect = (c: typeof country) => {
    setCountry(c);
    setOpen(false);
    setSearch("");
    isInternalChange.current = true;
    if (onChange) onChange(`${c.code}${phone}`);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setPhone(inputValue);
    isInternalChange.current = true;
    onChange?.(`${country.code}${inputValue}`);
  };

  return (
    <div className="flex items-center rounded-[6px] border border-[#a97bbf33] w-full h-[48px] pr-2 group focus-within:shadow-[0_0_16px_2px_#ff9c19] transition-shadow ">
      <div
        ref={ref}
        className="relative flex items-center justify-center w-24 h-full text-[#e2a94f] bg-[#ffc8271a] cursor-pointer select-none"
      >
        <div
          className="flex items-center w-full h-full pl-2 pr-1"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="mr-1">{country.flag}</span>
          <span>{country.code}</span>
          <svg
            className="ml-1 w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {open && (
          <div className="absolute left-0 top-full z-20 w-56 max-h-64 overflow-auto bg-[#2d0b2f] border border-[#a97bbf33] rounded shadow-lg mt-1">
            <input
              autoFocus
              type="text"
              placeholder="Buscar país o código"
              className="w-full px-2 py-1 bg-transparent text-white border-b border-[#a97bbf33] outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="max-h-48 overflow-auto">
              {filteredCountries.length === 0 && (
                <li className="px-2 py-2 text-gray-400">{t("notFound")}</li>
              )}
              {filteredCountries.map((c) => (
                <li
                  key={c.code + c.name}
                  className={`flex items-center px-2 py-2 cursor-pointer hover:bg-[#ffc8271a] ${
                    c.code === country.code ? "bg-[#ffc8271a]" : ""
                  }`}
                  onClick={() => handleCountrySelect(c)}
                >
                  <span className="mr-2">{c.flag}</span>
                  <span className="mr-2">{c.name}</span>
                  <span className="ml-auto">{c.code}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={t("phone")}
        className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full h-full pl-2"
        value={phone}
        onChange={handlePhoneChange}
        autoComplete="off"
        maxLength={10}
      />
    </div>
  );
};

export default CountryPhoneInput;
