export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-cyan-400/60 bg-neutral-900 text-slate-100"
      >
        Saltar al contenido
      </a>

      {/*     <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#"
              className="flex items-center gap-3"
              aria-label="Inicio CX Casino"
            >
              <img src="/logo.svg" className="h-8" />
            </a>
            <nav className="main-nav hidden md:flex items-center gap-8 text-sm">
              <a
                href="#juegos"
                className="text-slate-300 hover:text-white hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded"
              >
                Juegos
              </a>
              <a
                href="#seguridad"
                className="text-slate-300 hover:text-white hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded"
              >
                Seguridad
              </a>
              <a
                href="#refiere"
                className="text-slate-300 hover:text-white hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded"
              >
                Refiere y gana
              </a>
              <a
                href="#como-funciona"
                className="text-slate-300 hover:text-white hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded"
              >
                Cómo funciona
              </a>
              <a
                href="#faq"
                className="text-slate-300 hover:text-white hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded"
              >
                Preguntas frecuentes
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-slate-200 rounded-md border border-white/15 hover:border-white/30 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                aria-label="Iniciar sesión"
              >
                Iniciar sesión
              </a>
              <a
                href="#crear-cuenta"
                className="px-4 py-2 text-sm font-semibold tracking-tight text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
                aria-label="Crear cuenta"
              >
                Crear cuenta
              </a>
            </div>
          </div>
        </div>
      </header> */}

      <div id="contenido" className="site-main pt-20 md:pt-24">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="hero relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <article className="col-span-7">
                <h1
                  id="hero-title"
                  className="heading-xl text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white"
                >
                  Casino cripto seguro, rápido y transparente
                </h1>
                <p className="mt-4 text-slate-300 text-base leading-relaxed">
                  Juega tus títulos favoritos con depósitos en cripto y cobra
                  cuando quieras.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Transparencia en cada apuesta.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 text-amber-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Tu seguridad es nuestra prioridad.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M12 3v12"></path>
                      <path d="M6 8l6-5 6 5"></path>
                      <path d="M5 15h14l-1.5 6h-11z"></path>
                    </svg>
                    <span>Pagos en cripto sin fricciones.</span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#crear-cuenta"
                    className="inline-flex items-center justify-center rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold tracking-tight text-neutral-950 hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
                    aria-label="Empieza ahora"
                  >
                    Empieza ahora
                  </a>
                  <a
                    href="#seguridad"
                    className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/10 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    aria-label="Conoce cómo protegemos tus fondos"
                  >
                    Conoce cómo protegemos tus fondos
                  </a>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <figure className="rounded-lg border border-white/10 bg-white/[0.02] p-4 hover:border-white/20">
                    <img
                      src="/auditoria.png"
                      alt="Badge de auditoría externa aplicada a los juegos"
                      className="h-12 w-auto object-contain mx-auto"
                    />
                    <figcaption className="mt-3 text-center text-xs text-slate-400">
                      Auditoría independiente
                    </figcaption>
                  </figure>
                  <figure className="rounded-lg border border-white/10 bg-white/[0.02] p-4 hover:border-white/20">
                    <img
                      src="/cifradoe2e.png"
                      alt="Badge de cifrado de extremo a extremo"
                      className="h-12 w-auto object-contain mx-auto"
                    />
                    <figcaption className="mt-3 text-center text-xs text-slate-400">
                      Cifrado E2E
                    </figcaption>
                  </figure>
                  <figure className="rounded-lg border border-white/10 bg-white/[0.02] p-4 hover:border-white/20">
                    <img
                      src="/licencia.png"
                      alt="Badge de licenciamiento y cumplimiento regulatorio"
                      className="h-12 w-auto object-contain mx-auto"
                    />
                    <figcaption className="mt-3 text-center text-xs text-slate-400">
                      Licenciamiento vigente
                    </figcaption>
                  </figure>
                </div>
              </article>

              <aside className="col-span-5">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6">
                  <div className="flex items-center gap-2">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <p className="text-sm text-slate-300">Verificado</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <div className="flex items-center gap-3">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v12"></path>
                          <path d="M17 9H9.5a3.5 3.5 0 0 0 0 7H17"></path>
                        </svg>
                        <span className="text-sm text-slate-200">
                          Pagos en cripto instantáneos
                        </span>
                      </div>
                      <span className="text-xs text-cyan-300">USDT</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <div className="flex items-center gap-3">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-cyan-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span className="text-sm text-slate-200">
                          “Provably Fair” disponible
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Verificado por terceros
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <div className="flex items-center gap-3">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="text-sm text-slate-200">
                          Protección de cuenta y 2FA
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Opcional según jurisdicción
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Refiere y gana */}
        <section
          id="refiere"
          aria-labelledby="refiere-title"
          className="referrals border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <header className="max-w-3xl">
              <h2
                id="refiere-title"
                className="heading-xl text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white"
              >
                Refiere y gana
              </h2>
              <p className="mt-3 text-slate-300 text-base">
                Comparte tu enlace y gana una parte de lo que juegan tus
                referidos. Es simple, transparente y sin límites de
                invitaciones.
              </p>
            </header>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <article className="col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="subheading text-lg font-semibold tracking-tight text-white">
                  Tu enlace de referido
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Comparte el enlace con amigos o en tus redes. El botón
                  “Copiar” es estático.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <label className="sr-only" htmlFor="ref-link">
                    Enlace de referido
                  </label>
                  <input
                    id="ref-link"
                    readOnly
                    value="https://cxcasino.example/ref/usuario123"
                    className="w-full rounded-md border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                    placeholder="https://cxcasino.example/ref/tuusuario"
                    aria-label="Enlace de referido"
                  />
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    aria-label="Copiar enlace (no funcional)"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copiar
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-cyan-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M3 3v7h7"></path>
                        <path d="M3 21v-7h7"></path>
                        <path d="M21 3h-7v7"></path>
                        <path d="M14 14h7v7"></path>
                      </svg>
                      <h4 className="text-sm font-semibold tracking-tight text-white">
                        Comisiones en tiempo real
                      </h4>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Acreditación por actividad de tus referidos.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-amber-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M12 6v12"></path>
                        <path d="M17 9H9.5a3.5 3.5 0 0 0 0 7H17"></path>
                      </svg>
                      <h4 className="text-sm font-semibold tracking-tight text-white">
                        Pagos en cripto
                      </h4>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Recibe tus comisiones en USDT u otros activos.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-cyan-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="m9 18 6-12"></path>
                        <path d="M7 9h8"></path>
                        <path d="M9 15h8"></path>
                      </svg>
                      <h4 className="text-sm font-semibold tracking-tight text-white">
                        Comparte con un clic
                      </h4>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Listo para redes sociales y mensajería.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <h4 className="text-sm font-semibold tracking-tight text-white">
                      Ejemplo de ganancias
                    </h4>
                    <p className="mt-2 text-sm text-slate-300">
                      Si 5 amigos juegan $100 cada uno esta semana, tú podrías
                      ganar $X en comisiones.
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      Valores de ejemplo con fines ilustrativos.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <h4 className="text-sm font-semibold tracking-tight text-white">
                      Tabla de niveles
                    </h4>
                    <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.03] text-slate-300">
                          <tr>
                            <th className="px-3 py-2 font-medium">Nivel</th>
                            <th className="px-3 py-2 font-medium">
                              % comisión
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          <tr>
                            <td className="px-3 py-2 text-slate-200">
                              Nivel 1
                            </td>
                            <td className="px-3 py-2 text-amber-300">X%</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 text-slate-200">
                              Nivel 2
                            </td>
                            <td className="px-3 py-2 text-amber-300">Y%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                      Las comisiones no afectan las probabilidades de los
                      juegos.
                    </p>
                  </div>
                </div>
              </article>

              <aside className="col-span-1 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-base font-semibold tracking-tight text-white">
                  Impulsa tus invitaciones
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Consejo: comparte tu enlace junto a capturas de tus juegos
                  favoritos.
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M12 2v20"></path>
                      <path d="m17 7-5-5-5 5"></path>
                    </svg>
                    <span>Usa mensajes claros y directos.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 text-amber-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M3 11h18"></path>
                      <path d="M12 3v18"></path>
                    </svg>
                    <span>Comparte en comunidades afines.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Resalta la transparencia del sistema.</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href="#refiere"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500/10 px-4 py-3 text-sm font-semibold tracking-tight text-cyan-300 hover:bg-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    aria-label="Activar mi enlace"
                  >
                    Activar mi enlace
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Juegos populares */}
        <section
          id="juegos"
          aria-labelledby="juegos-title"
          className="games border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <header className="flex items-end justify-between gap-4">
              <div>
                <h2
                  id="juegos-title"
                  className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
                >
                  Juegos populares
                </h2>
                <p className="mt-2 text-slate-300 text-base">
                  Explora clásicos y títulos con RTP alto.
                </p>
              </div>
              <a
                href="#crear-cuenta"
                className="hidden sm:inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                aria-label="Ver todos los juegos"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-cyan-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
                Ver todos
              </a>
            </header>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Slot */}
              <article className="group rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20">
                <figure className="relative">
                  <img
                    src="/slots.png"
                    alt="Máquina de slots con luces de neón"
                    className="h-40 w-full object-cover"
                  />
                  <figcaption className="sr-only">
                    Slots con animaciones brillantes
                  </figcaption>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="rounded-md bg-emerald-500/80 px-2 py-1 text-[10px] font-medium text-emerald-300">
                      RTP alto
                    </span>
                    <span className="rounded-md bg-amber-500/80 px-2 py-1 text-[10px] font-medium text-amber-300">
                      Jackpot
                    </span>
                  </div>
                </figure>
                <div className="p-4">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Slots
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Giros rápidos y multiplicadores dinámicos.
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded px-1 py-0.5"
                    aria-label="Ver juego Slots"
                  >
                    Ver juego
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                </div>
              </article>

              {/* Ruleta */}
              <article className="group rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20">
                <figure className="relative">
                  <img
                    src="/ruleta.png"
                    alt="Mesa de ruleta premium"
                    className="h-40 w-full object-cover"
                  />
                </figure>
                <div className="p-4">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Ruleta
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Estrategia y emoción en cada giro.
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded px-1 py-0.5"
                    aria-label="Ver juego Ruleta"
                  >
                    Ver juego
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                </div>
              </article>

              {/* Blackjack */}
              <article className="group rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20">
                <figure className="relative">
                  <img
                    src="/blackjack.png"
                    alt="Mesa de blackjack con cartas sobre paño verde"
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="rounded-md bg-emerald-500/20 px-2 py-1 text-[10px] font-medium text-emerald-300">
                      RTP alto
                    </span>
                  </div>
                </figure>
                <div className="p-4">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Blackjack
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Decisiones rápidas y ventajas claras.
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded px-1 py-0.5"
                    aria-label="Ver juego Blackjack"
                  >
                    Ver juego
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                </div>
              </article>

              {/* Póker */}
              <article className="group rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20">
                <figure className="relative">
                  <img
                    src="/poker.png"
                    alt="Mesa de póker con fichas y cartas"
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-slate-200">
                      Clásico
                    </span>
                    <span className="rounded-md bg-amber-500/20 px-2 py-1 text-[10px] font-medium text-amber-300">
                      Jackpot
                    </span>
                  </div>
                </figure>
                <div className="p-4">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Póker
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Mesas y torneos para todos los estilos.
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded px-1 py-0.5"
                    aria-label="Ver juego Póker"
                  >
                    Ver juego
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Seguridad y transparencia */}
        <section
          id="seguridad"
          aria-labelledby="seguridad-title"
          className="security border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <header>
              <h2
                id="seguridad-title"
                className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
              >
                Seguridad que inspira confianza
              </h2>
              <p className="mt-2 text-slate-300 text-base">
                Capas de protección, procesos y transparencia desde el primer
                depósito.
              </p>
            </header>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Custodia y protección de fondos",
                  desc: "Carteras frías y calientes operadas bajo políticas de retiro seguras.",
                  icon: (
                    <svg
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M2 7l10-4 10 4v6c0 5-4 9-10 11C6 22 2 18 2 13V7z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  ),
                },
                {
                  title: "Cifrado de extremo a extremo",
                  desc: "Tráfico y datos sensibles protegidos con estándares de la industria.",
                  icon: (
                    <svg
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 text-amber-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  ),
                },
                {
                  title: "Auditorías y pruebas de integridad",
                  desc: "“Provably fair” disponible en títulos compatibles y auditorías periódicas.",
                  icon: (
                    <svg
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 text-cyan-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M4 22h16"></path>
                      <path d="M4 2h16"></path>
                      <path d="M7 2v20"></path>
                      <path d="M17 2v20"></path>
                    </svg>
                  ),
                },
                {
                  title: "KYC/AML según jurisdicción aplicable",
                  desc: "Procesos sujetos a la normativa local vigente. Texto legal breve.",
                  icon: (
                    <svg
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 text-amber-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <rect x="3" y="4" width="18" height="8" rx="2"></rect>
                      <path d="M7 20h10"></path>
                      <path d="M7 16h10"></path>
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <article
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="flex items-start gap-3">
                    {item.icon}
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    alt: "Sello de licencia operativa",
                    src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
                    cap: "Licencia operativa",
                  },
                  {
                    alt: "Sello de control de integridad de juego",
                    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop",
                    cap: "Integridad de juego",
                  },
                  {
                    alt: "Sello de seguridad de datos",
                    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
                    cap: "Seguridad de datos",
                  },
                  {
                    alt: "Sello de verificación independiente",
                    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop",
                    cap: "Verificación independiente",
                  },
                ].map((b, i) => (
                  <figure
                    key={i}
                    className="rounded-lg border border-white/10 p-4 hover:border-white/20"
                  >
                    <img
                      src={b.src}
                      alt={b.alt}
                      className="h-10 w-auto object-contain mx-auto"
                    />
                    <figcaption className="mt-2 text-center text-xs text-slate-400">
                      {b.cap}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded px-1 py-0.5"
                  aria-label="Ver detalles de cumplimiento"
                >
                  Ver detalles de cumplimiento
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section
          id="como-funciona"
          aria-labelledby="como-title"
          className="how-it-works border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2
              id="como-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
            >
              Cómo funciona
            </h2>

            <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* 1 */}
              <li className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="absolute -top-3 -left-3 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-500/30">
                  1
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M5.5 22a6.5 6.5 0 0 1 13 0"></path>
                  </svg>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      Crea tu cuenta
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Regístrate con correo y activa la seguridad.
                    </p>
                  </div>
                </div>
              </li>
              {/* 2 */}
              <li className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="absolute -top-3 -left-3 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300 ring-1 ring-amber-500/30">
                  2
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-amber-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M21 12v7a2 2 0 0 1-2 2H6l-4 2V5a2 2 0 0 1 2-2h9"></path>
                    <path d="M16 3h5v5"></path>
                  </svg>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      Deposita en cripto (USDT)
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Cargos bajos y confirmación rápida.
                    </p>
                  </div>
                </div>
              </li>
              {/* 3 */}
              <li className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="absolute -top-3 -left-3 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-500/30">
                  3
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x="3" y="3" width="18" height="14" rx="2"></rect>
                    <path d="M7 21h10"></path>
                  </svg>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      Juega
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Elige tus títulos favoritos y disfruta.
                    </p>
                  </div>
                </div>
              </li>
              {/* 4 */}
              <li className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="absolute -top-3 -left-3 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30">
                  4
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-emerald-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M20 7H4a2 2 0 0 0-2 2v6"></path>
                    <path d="M2 9h20"></path>
                    <path d="M7 21h10"></path>
                    <path d="M16 3h5v5"></path>
                  </svg>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      Retira
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Cobros cuando quieras, sin fricciones.
                    </p>
                  </div>
                </div>
              </li>
            </ol>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-base font-semibold tracking-tight text-white">
                Mini FAQ
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <details className="rounded-lg border border-white/10 p-4 open:bg-white/[0.02]">
                  <summary className="cursor-pointer text-sm font-medium text-slate-200">
                    ¿Cuánto tarda mi depósito?
                  </summary>
                  <p className="mt-2 text-sm text-slate-300">
                    Depende de la red. Generalmente, minutos tras las
                    confirmaciones requeridas.
                  </p>
                </details>
                <details className="rounded-lg border border-white/10 p-4 open:bg-white/[0.02]">
                  <summary className="cursor-pointer text-sm font-medium text-slate-200">
                    ¿Hay mínimos de retiro?
                  </summary>
                  <p className="mt-2 text-sm text-slate-300">
                    Sí, hay mínimos por activo para cubrir costos de red.
                    Consulta la tabla en tu cuenta.
                  </p>
                </details>
                <details className="rounded-lg border border-white/10 p-4 open:bg-white/[0.02]">
                  <summary className="cursor-pointer text-sm font-medium text-slate-200">
                    ¿Cómo funciona el referido?
                  </summary>
                  <p className="mt-2 text-sm text-slate-300">
                    Compartes tu enlace y recibes un porcentaje de la actividad
                    neta de tus referidos según el nivel.
                  </p>
                </details>
                <details className="rounded-lg border border-white/10 p-4 open:bg-white/[0.02]">
                  <summary className="cursor-pointer text-sm font-medium text-slate-200">
                    ¿Puedo invitar sin límites?
                  </summary>
                  <p className="mt-2 text-sm text-slate-300">
                    Sí, no hay límite de invitaciones. A mayor actividad,
                    mayores comisiones.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section
          aria-labelledby="social-proof-title"
          className="testimonials border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2
              id="social-proof-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
            >
              Lo que dicen los jugadores
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "María G.",
                  country: "Chile · verificado",
                  text: "Pagos en cripto sin fricciones y soporte claro. Me dio confianza desde el primer día.",
                  img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
                  alt: "Jugador verificado con sonrisa, retrato",
                },
                {
                  name: "Luis P.",
                  country: "México · verificado",
                  text: "Transparencia en cada apuesta y buenos RTP. El programa de referidos es directo.",
                  img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop",
                  alt: "Jugador verificado con auriculares, retrato",
                },
                {
                  name: "Ana R.",
                  country: "España · verificado",
                  text: "Retiré rápido a mi wallet. La seguridad y el cifrado dan tranquilidad.",
                  img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
                  alt: "Jugadora verificada con baraja en mano, retrato",
                },
              ].map((t, i) => (
                <article
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.alt}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
                    />
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-400">{t.country}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{t.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ principal */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="faq border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2
              id="faq-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
            >
              Preguntas frecuentes
            </h2>

            <div className="mt-6 space-y-3">
              {[
                {
                  q: "Depósitos y retiros",
                  a: "Los depósitos se acreditan tras las confirmaciones de red requeridas. Los retiros se procesan de forma segura y pueden requerir verificación adicional.",
                },
                {
                  q: "Comisiones por referido",
                  a: "Recibes un porcentaje por la actividad de tus referidos según el nivel asignado. Consulta el panel para ver las tasas vigentes.",
                },
                {
                  q: "Límites",
                  a: "Existen límites mínimos y máximos por activo y por periodo. Se muestran en tu cuenta y pueden variar por región.",
                },
                {
                  q: "Seguridad",
                  a: "Usamos cifrado, custodia segura y auditorías regulares. Activa 2FA para mayor protección.",
                },
                {
                  q: "Soporte",
                  a: "Atención 24/7 por correo y chat. Los tiempos de respuesta pueden variar por demanda.",
                },
              ].map((f, i) => (
                <details
                  key={i}
                  className="rounded-lg border border-white/10 p-4 open:bg-white/[0.02]"
                >
                  <summary className="text-sm font-medium text-slate-200 cursor-pointer">
                    {f.q}
                  </summary>
                  <div className="mt-2 text-sm text-slate-300 space-y-2">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section
          id="crear-cuenta"
          aria-labelledby="cta-title"
          className="final-cta border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  <h2
                    id="cta-title"
                    className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
                  >
                    Transparencia y control en tus manos
                  </h2>
                  <p className="mt-2 text-slate-300 text-base">
                    Activa tu cuenta y empieza a ganar con “Refiere y gana”.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold tracking-tight text-neutral-950 hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
                    aria-label="Crear cuenta"
                  >
                    Crear cuenta
                  </a>
                  <a
                    href="#refiere"
                    className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/10 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    aria-label="Activar mi enlace"
                  >
                    Activar mi enlace
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
