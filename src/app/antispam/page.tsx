"use client";
import Banner from "@/components/Banner";

const AntiSpam = () => {
  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background/bg2.jpg')",
        backgroundSize: "150%",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#2e0327] opacity-[95%] pointer-events-none z-0"></div>
      {/* Overlay degradado solo arriba */}
      <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700] z-0"></div>
      {/* Overlay degradado solo abajo */}
      <div className="absolute left-0 bottom-0 w-full h-[30%] pointer-events-none bg-gradient-to-t from-[#2e0327] to-[#2e032700] z-0"></div>
      <div className="relative z-10 flex flex-col flex-1">
        <Banner title="Juegos" subtitle="Elige una opción para continuar" />
        <div className="w-full max-w-6xl mx-auto px-4 mt-8">
          <h1 className="md:text-[48px] text-[28px] text-center font-[700] mb-4">
            Política antispam
          </h1>
          <div className="text-white text-base leading-relaxed space-y-4">
            Todos los clientes registrados recibirán anuncios y boletines
            informativos de dota.click y/o subsidiarias (Bestpoker.com,
            dota.click, BestAffiliate.com) por correo electrónico con respecto a
            varios aspectos del Servicio, incluidos, entre otros, avisos de
            futuras actualizaciones o cambios, servicio que afecte problemas o
            eventos, u ofertas especiales y promociones de dota.click y / o
            subsidiarias.
            <br />
            <br />
            dota.click y todas las subsidiarias lo harán intente ayudar a los
            suscriptores que continuamente reciben correos electrónicos que
            consideran objetables y / o correos electrónicos no solicitados y
            que nos notifican el problema.
            <br />
            <br />
            Un cliente registrado en dota.click y / o subsidiarias tienen la
            opción de darse de baja de todos nuestros boletines promocionales.
            Todos los clientes registrados también tienen la opción de activar /
            desactivar la función de boletín en la configuración de su cuenta
            personal. Los clientes registrados no pueden darse de baja u optar
            por no recibir boletines / correos electrónicos sobre
            actualizaciones importantes de software de seguridad o información
            similar que es de gran importancia para el cliente y el servicio que
            brinda dota.click y / o subsidiarias a menos que decidan cerrar
            permanentemente cuenta.
            <br />
            <br />
            dota.click y / o subsidiarias no permite ni autoriza a otros a
            utilizar los servicios para recopilar, recopilar u obtener
            información sobre clientes o suscriptores de dota.click, incluidos,
            entre otros, direcciones de correo electrónico de suscriptor, que
            son información confidencial y patentada de dota.click. Hacerlo
            violará los Términos de uso aplicables para los servicios.
            <br />
            <br />
            Si cree que recibe correo no solicitado de dota.click y / o
            subsidiarias, comuníquese con el soporte en lo mismo para este
          </div>
        </div>
      </div>
    </main>
  );
};

export default AntiSpam;
