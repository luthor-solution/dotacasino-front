/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  User,
  Users,
  Users2,
  CheckCircle,
  Award,
  Target,
  TrendingUp,
  Gem,
  Layers,
  Crown,
  Lock,
  Sparkles,
  Info,
  ChevronDown,
  Rocket,
  Headset,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const currency = (v: number) =>
  `$${Math.round(v).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default function Page() {
  const { t } = useTranslation(); // usa claves completas: bonus_view.xxx

  // Glows animation
  const g1Ref = useRef<HTMLDivElement | null>(null);
  const g2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let t_ = 0;
    const loop = () => {
      t_ += 0.003;
      if (g1Ref.current) {
        g1Ref.current.style.transform = `translate3d(${Math.sin(t_) * 12}px, ${
          Math.cos(t_ * 0.8) * 10
        }px, 0)`;
      }
      if (g2Ref.current) {
        g2Ref.current.style.transform = `translate3d(${
          Math.cos(t_ * 0.7) * 14
        }px, ${Math.sin(t_) * 12}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Calculator state
  const [l1, setL1] = useState(10);
  const [l2, setL2] = useState(30);
  const [l3, setL3] = useState(90);
  const [l4, setL4] = useState(270);
  const [avg, setAvg] = useState(100);

  const { e1, e2, e3, e4, tot } = useMemo(() => {
    const _e1 = l1 * avg * 0.2;
    const _e2 = l2 * avg * 0.07;
    const _e3 = l3 * avg * 0.07;
    const _e4 = l4 * avg * 0.07;
    return { e1: _e1, e2: _e2, e3: _e3, e4: _e4, tot: _e1 + _e2 + _e3 + _e4 };
  }, [l1, l2, l3, l4, avg]);

  return (
    <div
      className="antialiased text-white selection:bg-white/10 min-h-dvh"
      style={
        {
          "--bg-primary": "#350b2d",
          "--bg-card": "#2e0327",
          "--text-primary": "#fff",
          "--accent": "#ffc827",
          "--accent-text": "#000",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        } as React.CSSProperties
      }
    >
      <div className="relative min-h-dvh overflow-hidden">
        {/* Dynamic Background Layers */}
        <div className="pointer-events-none absolute inset-0">
          <div
            ref={g1Ref}
            className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)",
              willChange: "transform",
            }}
          />
          <div
            ref={g2Ref}
            className="absolute -bottom-40 -right-32 h-[560px] w-[560px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(168,85,247,0.25), transparent 70%)",
              willChange: "transform",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-screen"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%22440%22 viewBox=%220 0 40 40%22><rect width=%2240%22 height=%2240%22 fill=%22000000%22/><g fill=%22white%22 opacity=%220.18%22><circle cx=%222%22 cy=%222%22 r=%221%22/><circle cx=%2220%22 cy=%2211%22 r=%220.6%22/><circle cx=%2215%22 cy=%2229%22 r=%220.8%22/><circle cx=%2234%22 cy=%2218%22 r=%220.7%22/></g></svg>')",
            }}
          />
        </div>

        {/* Header */}
        <header className="h-20"></header>

        {/* Main */}
        <main className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 lg:py-14">
            {/* HERO INTRO */}
            <section className="text-center max-w-3xl mx-auto mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 ring-emerald-300/30 mb-4"
                style={{ backgroundColor: "rgba(16,185,129,0.10)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #10b981, #a855f7)",
                    boxShadow: "0 0 10px rgba(16,185,129,0.8)",
                  }}
                />
                <span className="text-xs text-neutral-200">
                  {t("bonus_view.badge.share")}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-semibold mb-4">
                {/* hero.title: con <accent> — aquí puedes usar dangerouslySetInnerHTML si quieres render tags */}
                {t("bonus_view.hero.title", { levels: 4 })}
              </h2>

              <p className="text-base md:text-lg text-neutral-300">
                {t("bonus_view.hero.subtitle")}
              </p>
            </section>

            {/* VISUAL NETWORK DIAGRAM */}
            <section className="mb-14">
              <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6 md:p-10 overflow-x-auto">
                <div>
                  <div className="flex flex-col items-center gap-8">
                    {/* Root */}
                    <div className="flex flex-col items-center">
                      <div
                        className="relative h-20 w-20 rounded-full ring-2 ring-white/20 flex items-center justify-center"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, rgba(255,200,39,0.4), rgba(255,200,39,0.15))",
                          boxShadow: "0 0 32px rgba(255,200,39,0.35)",
                        }}
                      >
                        <User className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                      <div className="mt-2 text-sm font-medium">
                        {t("bonus_view.diagram.you")}
                      </div>
                    </div>

                    {/* Level 1 */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center opacity-60">
                          <div className="relative h-12 w-12 rounded-full ring-1 ring-emerald-300/20 flex items-center justify-center bg-white/5">
                            <User className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="h-px w-8 bg-white/20" />
                        <div className="flex flex-col items-center">
                          <div
                            className="relative h-16 w-16 rounded-full ring-2 ring-emerald-300/40 flex items-center justify-center"
                            style={{
                              background:
                                "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.35), rgba(16,185,129,0.15))",
                              boxShadow: "0 0 24px rgba(16,185,129,0.3)",
                            }}
                          >
                            <Users className="h-6 w-6" strokeWidth={1.5} />
                          </div>
                          <div className="mt-1 text-xs text-neutral-300">
                            {t("bonus_view.level.label", { n: 1 })}
                          </div>
                          <div
                            className="text-lg font-semibold"
                            style={{ color: "#10b981" }}
                          >
                            20%
                          </div>
                        </div>
                        <div className="h-px w-8 bg-white/20" />
                        <div className="flex flex-col items-center opacity-60">
                          <div className="relative h-12 w-12 rounded-full ring-1 ring-emerald-300/20 flex items-center justify-center bg-white/5">
                            <User className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Level 2 */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center opacity-50">
                          <div className="relative h-10 w-10 rounded-full ring-1 ring-blue-300/30 flex items-center justify-center bg-white/5">
                            <User className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div
                            className="relative h-14 w-14 rounded-full ring-2 ring-blue-300/40 flex items-center justify-center"
                            style={{
                              background:
                                "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35), rgba(59,130,246,0.15))",
                              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
                            }}
                          >
                            <Users className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                          <div className="mt-1 text-xs text-neutral-300">
                            {t("bonus_view.level.label", { n: 2 })}
                          </div>
                          <div
                            className="text-base font-semibold"
                            style={{ color: "#3b82f6" }}
                          >
                            7%
                          </div>
                        </div>
                        <div className="flex flex-col items-center opacity-50">
                          <div className="relative h-10 w-10 rounded-full ring-1 ring-blue-300/30 flex items-center justify-center bg-white/5">
                            <User className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Level 3 */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-8 w-px bg-gradient-to-b from-white/15 to-transparent" />
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center opacity-40">
                          <div className="relative h-8 w-8 rounded-full ring-1 ring-purple-300/30 flex items-center justify-center bg-white/5">
                            <User className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div
                            className="relative h-12 w-12 rounded-full ring-2 ring-purple-300/40 flex items-center justify-center"
                            style={{
                              background:
                                "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.35), rgba(168,85,247,0.15))",
                              boxShadow: "0 0 18px rgba(168,85,247,0.3)",
                            }}
                          >
                            <Users className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                          <div className="mt-1 text-xs text-neutral-300">
                            {t("bonus_view.level.label", { n: 3 })}
                          </div>
                          <div
                            className="text-base font-semibold"
                            style={{ color: "#a855f7" }}
                          >
                            7%
                          </div>
                        </div>
                        <div className="flex flex-col items-center opacity-40">
                          <div className="relative h-8 w-8 rounded-full ring-1 ring-purple-300/30 flex items-center justify-center bg-white/5">
                            <User className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Level 4 */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-8 w-px bg-gradient-to-b from-white/10 to-transparent" />
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center opacity-30">
                          <div className="relative h-7 w-7 rounded-full ring-1 ring-amber-300/30 flex items-center justify-center bg-white/5">
                            <User className="h-3 w-3" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div
                            className="relative h-11 w-11 rounded-full ring-2 ring-amber-300/40 flex items-center justify-center"
                            style={{
                              background:
                                "radial-gradient(circle at 30% 30%, rgba(251,191,36,0.35), rgba(251,191,36,0.15))",
                              boxShadow: "0 0 16px rgba(251,191,36,0.3)",
                            }}
                          >
                            <Users className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <div className="mt-1 text-xs text-neutral-300">
                            {t("bonus_view.level.label", { n: 4 })}
                          </div>
                          <div
                            className="text-sm font-semibold"
                            style={{ color: "#fbbf24" }}
                          >
                            7%
                          </div>
                        </div>
                        <div className="flex flex-col items-center opacity-30">
                          <div className="relative h-7 w-7 rounded-full ring-1 ring-amber-300/30 flex items-center justify-center bg-white/5">
                            <User className="h-3 w-3" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* LEVELS BREAKDOWN */}
            <section className="mb-14">
              <h3 className="text-2xl md:text-3xl tracking-tight font-semibold mb-6">
                {t("bonus_view.levels.sectionTitle")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nivel 1 */}
                <Card>
                  <Header
                    title={t("bonus_view.level.label", { n: 1 })}
                    percent="20%"
                    percentColor="#10b981"
                    badgeBg="radial-gradient(circle at 30% 30%, rgba(16,185,129,0.35), rgba(16,185,129,0.15))"
                    badgeRing="ring-emerald-300/40"
                    icon={<Award className="h-6 w-6" strokeWidth={1.5} />}
                    t={t}
                  />
                  <div className="space-y-3">
                    <Row
                      icon={<CheckCircle className="h-4 w-4" />}
                      color="#10b981"
                    >
                      <b>{t("bonus_view.rows.directReferrals")}</b>{" "}
                      {t("bonus_view.rows.directReferrals.desc")}
                    </Row>
                    <Row
                      icon={<CheckCircle className="h-4 w-4" />}
                      color="#10b981"
                    >
                      <b>{t("bonus_view.rows.noReq")}</b>{" "}
                      {t("bonus_view.rows.noReq.desc")}
                    </Row>
                    <Row
                      icon={<CheckCircle className="h-4 w-4" />}
                      color="#10b981"
                    >
                      <b>{t("bonus_view.rows.earnings")}</b>{" "}
                      {t("bonus_view.rows.earnings.l1")}
                    </Row>
                  </div>
                </Card>

                {/* Nivel 2 */}
                <Card>
                  <Header
                    title={t("bonus_view.level.label", { n: 2 })}
                    percent="7%"
                    percentColor="#3b82f6"
                    badgeBg="radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35), rgba(59,130,246,0.15))"
                    badgeRing="ring-blue-300/40"
                    icon={<Target className="h-6 w-6" strokeWidth={1.5} />}
                    t={t}
                  />
                  <div className="space-y-3">
                    <Row icon={<Lock className="h-4 w-4" />} color="#3b82f6">
                      <b>{t("bonus_view.rows.requirement")}</b>{" "}
                      <b style={{ color: "var(--accent)" }}>
                        {t("bonus_view.rows.membership.100")}
                      </b>
                    </Row>
                    <Row icon={<Users2 className="h-4 w-4" />} color="#3b82f6">
                      <b>{t("bonus_view.rows.appliesTo")}</b>{" "}
                      {t("bonus_view.rows.appliesTo.l2")}
                    </Row>
                    <Row
                      icon={<TrendingUp className="h-4 w-4" />}
                      color="#3b82f6"
                    >
                      <b>{t("bonus_view.rows.earnings")}</b>{" "}
                      {t("bonus_view.level2.earn", {
                        default: "7% adicional en el segundo nivel de tu red",
                      })}
                    </Row>
                  </div>
                </Card>

                {/* Nivel 3 */}
                <Card>
                  <Header
                    title={t("bonus_view.level.label", { n: 3 })}
                    percent="7%"
                    percentColor="#a855f7"
                    badgeBg="radial-gradient(circle at 30% 30%, rgba(168,85,247,0.35), rgba(168,85,247,0.15))"
                    badgeRing="ring-purple-300/40"
                    icon={<Gem className="h-6 w-6" strokeWidth={1.5} />}
                    t={t}
                  />
                  <div className="space-y-3">
                    <Row icon={<Lock className="h-4 w-4" />} color="#a855f7">
                      <b>{t("bonus_view.rows.requirement")}</b>{" "}
                      <b style={{ color: "var(--accent)" }}>
                        {t("bonus_view.rows.membership.500")}
                      </b>
                    </Row>
                    <Row icon={<Users className="h-4 w-4" />} color="#a855f7">
                      <b>{t("bonus_view.rows.additionally")}</b>{" "}
                      {t("bonus_view.rows.additionally.l3")}
                    </Row>
                    <Row icon={<Layers className="h-4 w-4" />} color="#a855f7">
                      <b>{t("bonus_view.rows.appliesTo")}</b>{" "}
                      {t("bonus_view.rows.appliesTo.l3")}
                    </Row>
                  </div>
                </Card>

                {/* Nivel 4 */}
                <Card>
                  <Header
                    title={t("bonus_view.level.label", { n: 4 })}
                    percent="7%"
                    percentColor="#fbbf24"
                    badgeBg="radial-gradient(circle at 30% 30%, rgba(251,191,36,0.35), rgba(251,191,36,0.15))"
                    badgeRing="ring-amber-300/40"
                    icon={<Crown className="h-6 w-6" strokeWidth={1.5} />}
                    t={t}
                  />
                  <div className="space-y-3">
                    <Row icon={<Lock className="h-4 w-4" />} color="#fbbf24">
                      <b>{t("bonus_view.rows.requirement")}</b>{" "}
                      <b style={{ color: "var(--accent)" }}>
                        {t("bonus_view.rows.membership.1000")}
                      </b>
                    </Row>
                    <Row icon={<Users className="h-4 w-4" />} color="#fbbf24">
                      <b>{t("bonus_view.rows.additionally")}</b>{" "}
                      {t("bonus_view.rows.additionally.l4")}
                    </Row>
                    <Row
                      icon={<Sparkles className="h-4 w-4" />}
                      color="#fbbf24"
                    >
                      <b>{t("bonus_view.rows.appliesTo")}</b>{" "}
                      {t("bonus_view.rows.appliesTo.l4")}
                    </Row>
                  </div>
                </Card>
              </div>
            </section>

            {/* SUMMARY TABLE */}
            <section className="mb-14">
              <h3 className="text-2xl md:text-3xl tracking-tight font-semibold mb-6">
                {t("bonus_view.table.title")}
              </h3>
              <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead
                      className="border-b border-white/10"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                      <tr>
                        <Th>{t("bonus_view.table.th.level")}</Th>
                        <Th>{t("bonus_view.table.th.commission")}</Th>
                        <Th>{t("bonus_view.table.th.membership")}</Th>
                        <Th>{t("bonus_view.table.th.directRequired")}</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <TrDot
                        dot="#10b981"
                        label={t("bonus_view.level.label", { n: 1 })}
                        commission={<b style={{ color: "#10b981" }}>20%</b>}
                        req={t("bonus_view.table.value.none.f")}
                        refsReq={t("bonus_view.table.value.none.m")}
                      />
                      <TrDot
                        dot="#3b82f6"
                        label={t("bonus_view.level.label", { n: 2 })}
                        commission={<b style={{ color: "#3b82f6" }}>7%</b>}
                        req={
                          <b style={{ color: "var(--accent)" }}>
                            {t("bonus_view.rows.membership.100")}
                          </b>
                        }
                        refsReq={t("bonus_view.table.value.none.m")}
                      />
                      <TrDot
                        dot="#a855f7"
                        label={t("bonus_view.level.label", { n: 3 })}
                        commission={<b style={{ color: "#a855f7" }}>7%</b>}
                        req={
                          <b style={{ color: "var(--accent)" }}>
                            {t("bonus_view.rows.membership.500")}
                          </b>
                        }
                        refsReq={<>{t("bonus_view.rows.additionally.l3")}</>}
                      />
                      <TrDot
                        dot="#fbbf24"
                        label={t("bonus_view.level.label", { n: 4 })}
                        commission={<b style={{ color: "#fbbf24" }}>7%</b>}
                        req={
                          <b style={{ color: "var(--accent)" }}>
                            {t("bonus_view.rows.membership.1000")}
                          </b>
                        }
                        refsReq={<>{t("bonus_view.rows.additionally.l4")}</>}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* EARNINGS CALCULATOR */}
            <section id="calculator" className="mb-14">
              <div>
                <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6 md:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl md:text-3xl tracking-tight font-semibold mb-2">
                      {t("bonus_view.calc.title")}
                    </h3>
                    <p className="text-sm text-neutral-300">
                      {t("bonus_view.calc.subtitle")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <NumberInput
                        label={t("bonus_view.calc.input.l1")}
                        value={l1}
                        onChange={setL1}
                        ring="ring-emerald-300/40"
                      />
                      <NumberInput
                        label={t("bonus_view.calc.input.l2")}
                        value={l2}
                        onChange={setL2}
                        ring="ring-blue-300/40"
                      />
                      <NumberInput
                        label={t("bonus_view.calc.input.l3")}
                        value={l3}
                        onChange={setL3}
                        ring="ring-purple-300/40"
                      />
                      <NumberInput
                        label={t("bonus_view.calc.input.l4")}
                        value={l4}
                        onChange={setL4}
                        ring="ring-amber-300/40"
                      />
                    </div>

                    <div className="space-y-4">
                      <NumberInput
                        label={t("bonus_view.calc.input.avg")}
                        value={avg}
                        onChange={setAvg}
                        ring="ring-white/20"
                      />

                      <div className="rounded-xl ring-1 ring-white/10 bg-white/10 p-5 space-y-2">
                        <RowKV
                          k={t("bonus_view.calc.row.l1")}
                          v={currency(e1)}
                          color="#10b981"
                        />
                        <RowKV
                          k={t("bonus_view.calc.row.l2")}
                          v={currency(e2)}
                          color="#3b82f6"
                        />
                        <RowKV
                          k={t("bonus_view.calc.row.l3")}
                          v={currency(e3)}
                          color="#a855f7"
                        />
                        <RowKV
                          k={t("bonus_view.calc.row.l4")}
                          v={currency(e4)}
                          color="#fbbf24"
                        />
                        <div className="border-t border-white/20 pt-2 mt-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {t("bonus_view.calc.total")}
                            </span>
                            <span
                              className="text-2xl font-semibold"
                              style={{ color: "var(--accent)" }}
                            >
                              {currency(tot)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg ring-1 ring-white/10 bg-white/5 p-4 text-xs text-neutral-300">
                    <div className="flex items-start gap-2">
                      <Info
                        className="h-4 w-4 mt-0.5 shrink-0"
                        strokeWidth={1.5}
                      />
                      <div>
                        <strong>{t("bonus_view.note.title")}</strong>{" "}
                        {t("bonus_view.note.body")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* HOW TO START */}
            <section className="mb-14">
              <h3 className="text-2xl md:text-3xl tracking-tight font-semibold mb-6">
                {t("bonus_view.how.title")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StepCard
                  n="1"
                  ring="ring-emerald-300/40"
                  bg="rgba(16,185,129,0.35)"
                >
                  <div className="font-medium mb-2">
                    {t("bonus_view.how.step1.title")}
                  </div>
                  <p className="text-sm text-neutral-300">
                    {t("bonus_view.how.step1.desc")}
                  </p>
                </StepCard>
                <StepCard
                  n="2"
                  ring="ring-blue-300/40"
                  bg="rgba(59,130,246,0.35)"
                >
                  <div className="font-medium mb-2">
                    {t("bonus_view.how.step2.title")}
                  </div>
                  <p className="text-sm text-neutral-300">
                    {t("bonus_view.how.step2.desc")}
                  </p>
                </StepCard>
                <StepCard
                  n="3"
                  ring="ring-purple-300/40"
                  bg="rgba(168,85,247,0.35)"
                >
                  <div className="font-medium mb-2">
                    {t("bonus_view.how.step3.title")}
                  </div>
                  <p className="text-sm text-neutral-300">
                    {t("bonus_view.how.step3.desc")}
                  </p>
                </StepCard>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-14">
              <h3 className="text-2xl md:text-3xl tracking-tight font-semibold mb-6">
                {t("bonus_view.faq.title")}
              </h3>
              <div className="space-y-3">
                <Faq title={t("bonus_view.faq.q1.title")}>
                  {t("bonus_view.faq.q1.body")}
                </Faq>
                <Faq title={t("bonus_view.faq.q2.title")}>
                  {t("bonus_view.faq.q2.body")}
                </Faq>
                <Faq title={t("bonus_view.faq.q3.title")}>
                  {t("bonus_view.faq.q3.body")}
                </Faq>
                <Faq title={t("bonus_view.faq.q4.title")}>
                  {t("bonus_view.faq.q4.body")}
                </Faq>
                <Faq title={t("bonus_view.faq.q5.title")}>
                  {t("bonus_view.faq.q5.body")}
                </Faq>
              </div>
            </section>

            {/* CTA FINAL */}
            <section>
              <div className="rounded-2xl p-[2px]">
                <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-8 md:p-12 text-center">
                  <h3 className="text-3xl md:text-4xl tracking-tight font-semibold mb-3">
                    {t("bonus_view.cta.title")}
                  </h3>
                  <p className="text-base text-neutral-300 mb-6 max-w-2xl mx-auto">
                    {t("bonus_view.cta.subtitle")}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="#registro"
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium ring-1 ring-emerald-300/20"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(255,200,39,1) 100%)",
                        color: "var(--accent-text)",
                        boxShadow:
                          "0 0 36px rgba(16,185,129,0.30), 0 0 36px rgba(255,200,39,0.20)",
                      }}
                    >
                      <Rocket className="h-5 w-5" strokeWidth={1.5} />
                      {t("bonus_view.cta.primary")}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* A11y: focus visible */}
      <style jsx global>{`
        a:focus-visible,
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid rgba(16, 185, 129, 0.9);
          outline-offset: 2px;
        }
        details summary::-webkit-details-marker {
          display: none;
        }
        details summary {
          list-style: none;
        }
      `}</style>
    </div>
  );
}

/* ---------- Small UI helpers ---------- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6">
      {children}
    </div>
  );
}

function Header({
  title,
  percent,
  percentColor,
  badgeBg,
  badgeRing,
  icon,
  t,
}: {
  title: string;
  percent: string;
  percentColor: string;
  badgeBg: string;
  badgeRing: string;
  icon: React.ReactNode;
  t: (k: string, p?: Record<string, any>) => string;
}) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="text-xs text-neutral-300 mb-1">{title}</div>
        <div
          className="text-3xl tracking-tight font-semibold"
          style={{ color: percentColor }}
        >
          {percent}
        </div>
        <div className="text-sm text-neutral-300">
          {t("bonus_view.commission.suffix")}
        </div>
      </div>
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center ring-1 ${badgeRing}`}
        style={{ background: badgeBg }}
      >
        {icon}
      </div>
    </div>
  );
}

function Row({
  icon,
  color,
  children,
}: {
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <span style={{ color }} className="mt-0.5 shrink-0">
        {icon}
      </span>
      <div className="text-sm text-neutral-200">{children}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-3 font-medium text-neutral-300">
      {children}
    </th>
  );
}

function TrDot({
  dot,
  label,
  commission,
  req,
  refsReq,
}: {
  dot: string;
  label: string;
  commission: React.ReactNode;
  req: React.ReactNode;
  refsReq: React.ReactNode;
}) {
  return (
    <tr className="hover:bg-white/5 transition">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: dot }} />
          <span className="font-medium">{label}</span>
        </div>
      </td>
      <td className="px-4 py-3 font-semibold">{commission}</td>
      <td className="px-4 py-3">{req}</td>
      <td className="px-4 py-3">{refsReq}</td>
    </tr>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  ring,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  ring: string;
}) {
  return (
    <div>
      <label className="block text-xs text-neutral-300 mb-2">{label}</label>
      <input
        type="number"
        min={0}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value || 0))}
        className={`w-full rounded-lg px-4 py-2.5 ring-1 ${ring} bg-white/5 focus:outline-none`}
      />
    </div>
  );
}

function RowKV({ k, v, color }: { k: string; v: string; color: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-300">{k}</span>
      <span className="font-semibold" style={{ color }}>
        {v}
      </span>
    </div>
  );
}

function StepCard({
  n,
  ring,
  bg,
  children,
}: {
  n: string;
  ring: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6">
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center ${ring} mb-4 ring-1`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${bg}, rgba(0,0,0,0.15))`,
        }}
      >
        <span className="text-lg font-semibold">{n}</span>
      </div>
      {children}
    </div>
  );
}

function Faq({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-xl ring-1 ring-white/10 bg-white/5 overflow-hidden">
      <summary className="cursor-pointer px-5 py-4 flex items-center justify-between hover:bg-white/10 transition">
        <span className="font-medium">{title}</span>
        <ChevronDown
          className="h-5 w-5 group-open:rotate-180 transition-transform"
          strokeWidth={1.5}
        />
      </summary>
      <div className="px-5 pb-4 text-sm text-neutral-300 border-t border-white/10 pt-4">
        {children}
      </div>
    </details>
  );
}
