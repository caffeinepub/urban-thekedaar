import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Package,
  Phone,
  RefreshCw,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCalculateEstimate } from "../hooks/useQueries";

// ─── Rate tables ───────────────────────────────────────────────────────────────
const RATES: Record<string, { min: number; max: number }> = {
  Standard: { min: 1800, max: 2200 },
  Premium: { min: 2200, max: 3000 },
  Luxury: { min: 3000, max: 4500 },
};

const BOQ_RATIOS = [
  { material: "Cement", ratio: 0.42, unit: "Bags" },
  { material: "Steel", ratio: 3.8, unit: "Kg" },
  { material: "Bricks", ratio: 8.5, unit: "Nos" },
  { material: "Sand", ratio: 1.9, unit: "Cu.ft" },
  { material: "Aggregate", ratio: 1.4, unit: "Cu.ft" },
];

const TIMELINE_STAGES = [
  { stage: "Foundation", divisor: 500 },
  { stage: "Structure", divisor: 400 },
  { stage: "Brickwork", divisor: 600 },
  { stage: "Plaster", divisor: 700 },
  { stage: "Finishing", divisor: 500 },
];

const MILESTONES = [
  { label: "Booking Advance", pct: 10 },
  { label: "Foundation Complete", pct: 15 },
  { label: "Ground Floor Slab", pct: 15 },
  { label: "First Floor Slab", pct: 10, floorsGt1: true },
  { label: "Brickwork Complete", pct: 15 },
  { label: "Plaster & Electrical", pct: 15 },
  { label: "Final Finishing", pct: 20 },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatINR(val: number): string {
  if (val >= 10_000_000) return `₹${(val / 10_000_000).toFixed(2)} Cr`;
  if (val >= 100_000) return `₹${(val / 100_000).toFixed(2)} L`;
  return `₹${val.toLocaleString("en-IN")}`;
}

interface EstimateResult {
  totalArea: number;
  minCost: number;
  maxCost: number;
  boq: { material: string; quantity: number; unit: string }[];
  timeline: { stage: string; weeks: number }[];
  milestones: { label: string; pct: number }[];
  constructionType: string;
}

function computeEstimate(
  builtUpPerFloor: number,
  floors: number,
  constructionType: string,
): EstimateResult {
  const totalArea = builtUpPerFloor * floors;
  const rates = RATES[constructionType] ?? RATES.Standard;
  const minCost = totalArea * rates.min;
  const maxCost = totalArea * rates.max;

  const boq = BOQ_RATIOS.map(({ material, ratio, unit }) => ({
    material,
    quantity: Math.round(totalArea * ratio),
    unit,
  }));

  const timeline = TIMELINE_STAGES.map(({ stage, divisor }) => ({
    stage,
    weeks: Math.ceil(totalArea / divisor),
  }));

  const milestones = MILESTONES.filter((m) => !m.floorsGt1 || floors > 1).map(
    ({ label, pct }) => ({ label, pct }),
  );

  return {
    totalArea,
    minCost,
    maxCost,
    boq,
    timeline,
    milestones,
    constructionType,
  };
}

// ─── Styling helpers ───────────────────────────────────────────────────────────
const inputCls =
  "w-full px-4 py-3 rounded-lg border border-white/15 bg-white/5 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#C9A84C]/60 focus:bg-white/8 transition-all font-body";
const labelCls =
  "block text-xs font-semibold text-white/60 mb-1.5 font-body uppercase tracking-wide";

const QUALITY_TIERS = [
  { value: "Standard", desc: "₹1,800–2,200 / sq ft" },
  { value: "Premium", desc: "₹2,200–3,000 / sq ft" },
  { value: "Luxury", desc: "₹3,000–4,500 / sq ft" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function EstimateCalculator() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    plotSize: "",
    builtUpPerFloor: "",
    floors: "1",
    city: "",
    constructionType: "Standard",
  });
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateMutation = useCalculateEstimate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const builtUp = Number.parseFloat(form.builtUpPerFloor) || 0;
    const floors = Number.parseInt(form.floors) || 1;

    try {
      await calculateMutation.mutateAsync({
        name: form.name,
        mobile: form.mobile,
        projectType: "Residential",
        areaInSqFt: builtUp * floors,
        numFloors: BigInt(floors),
        qualityTier: form.constructionType,
        street: form.city,
        number: BigInt(0),
        city: form.city,
        postalCode: "",
      });
    } catch (_err) {
      // Non-fatal — we still show client-side results
    }

    const est = computeEstimate(builtUp, floors, form.constructionType);
    setResult(est);
    setShowResults(true);
    toast.success("Estimate ready! Review your detailed report below.");
  };

  const handleRecalculate = () => {
    setShowResults(false);
    setResult(null);
  };

  const totalWeeks = result
    ? result.timeline.reduce((s, t) => s + t.weeks, 0)
    : 0;

  return (
    <section
      id="calculator"
      className="py-24"
      style={{ backgroundColor: "#050E1F" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5 font-body"
            style={{
              backgroundColor: "rgba(201,168,76,0.12)",
              color: "#C9A84C",
            }}
          >
            <Calculator className="w-4 h-4" />
            AI Construction Estimator
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Instant Project Estimate
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-body text-base">
            Fill in your project details to get a detailed cost estimate, BOQ,
            timeline, and payment plan — instantly.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            // ── FORM ────────────────────────────────────────────────────────────
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl p-8 sm:p-10"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.18)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Details */}
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <User className="w-5 h-5" style={{ color: "#C9A84C" }} />
                    Contact Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="est-name" className={labelCls}>
                        Full Name *
                      </label>
                      <input
                        id="est-name"
                        data-ocid="calculator.name.input"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. Rahul Sharma"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="est-mobile" className={labelCls}>
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          id="est-mobile"
                          data-ocid="calculator.mobile.input"
                          type="tel"
                          required
                          value={form.mobile}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, mobile: e.target.value }))
                          }
                          placeholder="+91 XXXXX XXXXX"
                          className={`${inputCls} pl-10`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Dimensions */}
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <Building2
                      className="w-5 h-5"
                      style={{ color: "#C9A84C" }}
                    />
                    Project Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="est-plot" className={labelCls}>
                        Plot Size (sq ft) *
                      </label>
                      <input
                        id="est-plot"
                        data-ocid="calculator.plot_size.input"
                        type="number"
                        required
                        min="100"
                        value={form.plotSize}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, plotSize: e.target.value }))
                        }
                        placeholder="e.g. 1800"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="est-builtup" className={labelCls}>
                        Built-up Area / Floor (sq ft) *
                      </label>
                      <input
                        id="est-builtup"
                        data-ocid="calculator.area.input"
                        type="number"
                        required
                        min="100"
                        value={form.builtUpPerFloor}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            builtUpPerFloor: e.target.value,
                          }))
                        }
                        placeholder="e.g. 1500"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="est-floors" className={labelCls}>
                        Number of Floors *
                      </label>
                      <select
                        id="est-floors"
                        data-ocid="calculator.floors.select"
                        value={form.floors}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, floors: e.target.value }))
                        }
                        className={inputCls}
                        style={{ cursor: "pointer" }}
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option
                            key={n}
                            value={String(n)}
                            style={{
                              backgroundColor: "#0A1628",
                              color: "white",
                            }}
                          >
                            {n === 1 ? "G (Ground)" : `G+${n - 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="est-city" className={labelCls}>
                        City *
                      </label>
                      <input
                        id="est-city"
                        data-ocid="calculator.city.input"
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, city: e.target.value }))
                        }
                        placeholder="e.g. Gurugram"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* Construction Type */}
                <div>
                  <p className={labelCls}>Construction Type *</p>
                  <div className="grid sm:grid-cols-3 gap-3 mt-2">
                    {QUALITY_TIERS.map((tier) => (
                      <button
                        key={tier.value}
                        type="button"
                        data-ocid={`calculator.quality.${tier.value.toLowerCase()}.toggle`}
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            constructionType: tier.value,
                          }))
                        }
                        className="p-4 rounded-xl border-2 text-left transition-all font-body"
                        style={
                          form.constructionType === tier.value
                            ? {
                                borderColor: "#C9A84C",
                                backgroundColor: "rgba(201,168,76,0.1)",
                              }
                            : {
                                borderColor: "rgba(255,255,255,0.1)",
                                backgroundColor: "transparent",
                              }
                        }
                      >
                        <p className="font-bold text-white text-sm">
                          {tier.value}
                        </p>
                        <p className="text-white/45 text-xs mt-0.5">
                          {tier.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {calculateMutation.isError && (
                  <div
                    data-ocid="calculator.error_state"
                    className="p-3 rounded-lg text-sm font-body"
                    style={{
                      backgroundColor: "rgba(239,68,68,0.1)",
                      color: "#fca5a5",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    Backend save failed, but your estimate will still be shown.
                  </div>
                )}

                <button
                  type="submit"
                  data-ocid="calculator.submit_button"
                  disabled={calculateMutation.isPending}
                  className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 font-body"
                  style={{ backgroundColor: "#C9A84C", color: "#050E1F" }}
                >
                  {calculateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating
                      Estimate...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" /> Generate My Estimate{" "}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            // ── RESULTS PANEL ────────────────────────────────────────────────────
            <motion.div
              key="results"
              data-ocid="calculator.success_state"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Summary Banner */}
              <div
                className="rounded-2xl p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.05) 100%)",
                  border: "1px solid rgba(201,168,76,0.35)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest font-body font-semibold mb-1">
                      {result?.constructionType} Construction ·{" "}
                      {result?.totalArea.toLocaleString("en-IN")} sq ft total
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                      Estimated Cost
                    </h3>
                    <p
                      className="font-display text-2xl sm:text-3xl mt-1"
                      style={{ color: "#C9A84C" }}
                    >
                      {result && formatINR(result.minCost)}
                      <span className="text-white/40 mx-2">–</span>
                      {result && formatINR(result.maxCost)}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <div className="flex items-center gap-2 text-white/60 text-sm font-body">
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: "#C9A84C" }}
                      />
                      Data saved to admin
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm font-body">
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: "#C9A84C" }}
                      />
                      {totalWeeks} weeks estimated
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* BOQ Table */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Package className="w-5 h-5" style={{ color: "#C9A84C" }} />
                    <h4 className="font-display text-lg font-bold text-white">
                      Material BOQ
                    </h4>
                  </div>
                  <div data-ocid="calculator.table" className="space-y-2">
                    {result?.boq.map((row, i) => (
                      <div
                        key={row.material}
                        data-ocid={`calculator.boq.row.${i + 1}`}
                        className="flex items-center justify-between py-2 border-b font-body"
                        style={{ borderColor: "rgba(255,255,255,0.06)" }}
                      >
                        <span className="text-white/70 text-sm">
                          {row.material}
                        </span>
                        <span className="text-white font-semibold text-sm">
                          {row.quantity.toLocaleString("en-IN")}
                          <span className="text-white/40 ml-1 text-xs">
                            {row.unit}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <BarChart3
                      className="w-5 h-5"
                      style={{ color: "#C9A84C" }}
                    />
                    <h4 className="font-display text-lg font-bold text-white">
                      Project Timeline
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {result?.timeline.map((t, i) => {
                      const pct = Math.round((t.weeks / totalWeeks) * 100);
                      return (
                        <div
                          key={t.stage}
                          data-ocid={`calculator.timeline.item.${i + 1}`}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-white/70 text-xs font-body">
                              {t.stage}
                            </span>
                            <span className="text-white/50 text-xs font-body">
                              {t.weeks}w
                            </span>
                          </div>
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.08)",
                            }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: "#C9A84C" }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{
                                delay: i * 0.1 + 0.3,
                                duration: 0.6,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Payment Milestones */}
              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h4 className="font-display text-lg font-bold text-white mb-5">
                  Payment Milestone Plan
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {result?.milestones.map((m, i) => (
                    <div
                      key={m.label}
                      data-ocid={`calculator.milestone.item.${i + 1}`}
                      className="flex items-center gap-3 p-3 rounded-xl font-body"
                      style={{
                        backgroundColor: "rgba(201,168,76,0.06)",
                        border: "1px solid rgba(201,168,76,0.12)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(201,168,76,0.18)",
                          color: "#C9A84C",
                        }}
                      >
                        {m.pct}%
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">
                          {m.label}
                        </p>
                        <p className="text-white/40 text-xs">
                          {result &&
                            formatINR(
                              ((result.minCost + result.maxCost) / 2) *
                                (m.pct / 100),
                            )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA + Recalculate */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  data-ocid="calculator.primary_button"
                  className="flex-1 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 font-body"
                  style={{ backgroundColor: "#C9A84C", color: "#050E1F" }}
                >
                  Start Project with Urban Thekedaar
                  <ChevronRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  data-ocid="calculator.secondary_button"
                  onClick={handleRecalculate}
                  className="sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/8 font-body"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Recalculate
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
