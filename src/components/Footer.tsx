import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => (
  <footer
    className="relative bg-[#2e0327] text-white pt-12 pb-8 px-4 overflow-x-visible"
    style={{
      backgroundImage: "url('/banner/banner1.jpg')",
      backgroundSize: "160%",
      backgroundPosition: "top",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 bg-[#2e0327] opacity-[92%] pointer-events-none"></div>
    {/* Overlay degradado solo arriba para que no se vea cortado */}
    <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700]"></div>

    {/* Imagen decorativa sobresaliendo */}
    <Image
      src="/shape.png"
      alt="Decoración"
      className="hidden md:block absolute top-0 right-0 pointer-events-none"
      style={{
        transform: "translateX(-10%) translateY(-40%)",
        zIndex: 20,
      }}
      height={100}
      width={200}
    />

    <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
      {/* Columnas principales */}
      <div className="flex flex-col md:flex-row gap-12 flex-1">
        {/* Compañía */}
        <div>
          <h3 className="font-bold mb-3">Compañía</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#FFC827] transition">
                Noticias
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFC827] transition">
                Acerca De Nosotros
              </a>
            </li>
          </ul>
        </div>
        {/* Juegos */}
        <div>
          <h3 className="font-bold mb-3">Juegos</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#FFC827] transition">
                Bonos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFC827] transition">
                Jackpots
              </a>
            </li>
          </ul>
        </div>
        {/* Recursos */}
        <div>
          <h3 className="font-bold mb-3">Recursos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="hover:text-[#FFC827] transition">
                Términos Y Condiciones
              </Link>
            </li>
            <li>
              <Link
                href="/antispam"
                className="hover:text-[#FFC827] transition"
              >
                Política Antispam
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="hover:text-[#FFC827] transition"
              >
                Política De Reembolso
              </Link>
            </li>
            <li>
              <Link
                href="/kyc-and-aml"
                className="hover:text-[#FFC827] transition"
              >
                KYC Y AML
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Logo y selector de idioma */}
      <div className="flex flex-col items-center md:items-end gap-4">
        <select
          className="bg-[#2e0327] text-white px-4 py-2 rounded-lg border border-[#FFC827] focus:outline-none"
          defaultValue="es"
        >
          <option value="es">🇪🇸 Spanish</option>
          <option value="en">🇬🇧 English</option>
          <option value="kr">🇰🇷 Korean</option>
        </select>
        <img src="/logo.svg" alt="DOTA Logo" className="h-10 mt-2" />
        <span className="text-[#bdbdbd] text-sm mt-2">Dota.Click 2025™</span>
      </div>
    </div>

    {/* Texto descriptivo */}
    <div className="relative z-10 max-w-5xl mx-auto mt-8 text-center text-[#e0e0e0] text-sm leading-relaxed">
      dota.click casino criptográfico confiable de alta gama, con una variedad
      de juegos de tragamonedas, máquinas tragamonedas en línea únicas, apuestas
      deportivas, eventos de deportes electrónicos, juegos con crupier en vivo,
      torneos de póquer y juegos populares de peces. Nuestra selección de juegos
      artesanales no dejará indiferentes a todos los jugadores. Nuestro casino
      en línea criptográfico dota.click posee la mejor selección de tragamonedas
      en línea para hoy con diferentes temas y estilos, todos sus juegos
      favoritos se pueden encontrar fácilmente en la sección de proveedores de
      juegos y agregarlos a su lista personal de juegos Favoritos para disfrutar
      de un acceso rápido en cualquier momento conveniente.
    </div>

    <div className="relative z-10 max-w-5xl mx-auto mt-8 text-center text-white text-lg font-bold">
      Ventajas de jugar en vip crypto casino dota.click:
    </div>

    <div className="relative z-10 max-w-5xl mx-auto mt-4 text-center text-[#e0e0e0] text-sm leading-relaxed">
      Nuestro casino en línea criptográfico premium dota.click admite altos
      estándares de seguridad para brindar una experiencia de jugador segura. La
      principal ventaja de nuestro casino dota.click es la gran selección de
      juegos de tragamonedas en asociación con los principales fabricantes de
      productos de juego. El proceso de registro rápido y sencillo, sin
      verificación innecesaria, le permitirá iniciar rápidamente la mejor sesión
      de juego. Pero lo más importante, estará encantado con el proceso
      instantáneo de depositar y retirar sus fondos, tanto en las principales
      criptomonedas como en monedas estables. Esto le da la oportunidad de estar
      siempre de buen humor y estar en línea con una emoción agradable. Toda la
      información proporcionada por los usuarios es confidencial y anónima.
      Puede estar absolutamente seguro de que protegemos sus fondos de forma
      fiable y garantizamos la seguridad de su saldo. Nuestro casino en línea
      está protegido de manera confiable contra cualquier ataque de piratas
      informáticos, siempre estamos en línea 24/7/365
      <br />
      <br />
      Hemos hecho todo lo posible por su conveniente juego, no solo en
      computadoras personales, sino también en teléfonos y tabletas. Nuestra
      versión móvil del casino en línea dota.click es muy fácil de usar y se
      mejora constantemente. La aplicación móvil para jugar tragamonedas en el
      teléfono es increíblemente rápida y tiene las mismas funciones de un
      casino en línea que en el formato de sitio al que está acostumbrado.
    </div>

    <div className="relative z-10 max-w-5xl mx-auto mt-8 text-center text-white text-lg font-bold">
      Quédese con nosotros y obtendrá un socio confiable en su entretenimiento
      en línea durante los próximos años. ¡Le deseamos todo lo mejor!
    </div>
  </footer>
);

export default Footer;
