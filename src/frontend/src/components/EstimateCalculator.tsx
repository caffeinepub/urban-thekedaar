import {
  Calculator,
  Home,
  Layers,
  Loader2,
  MapPin,
  Phone,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCalculateEstimate } from "../hooks/useQueries";

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Farm House",
  "Villa",
  "Duplex",
];
const FLOOR_OPTIONS = [
  { value: "0", label: "Basement" },
  { value: "1", label: "G (Ground)" },
  { value: "2", label: "G+1" },
  { value: "3", label: "G+2" },
  { value: "4", label: "G+3" },
  { value: "5", label: "G+4" },
];
const QUALITY_TIERS = [
  {
    value: "Standard",
    label: "Standard",
    desc: "Quality materials, functional finishes",
  },
  {
    value: "Premium",
    label: "Premium",
    desc: "Superior materials, premium finishes",
  },
  {
    value: "Luxury",
    label: "Luxury",
    desc: "Top-tier materials, luxury finishes",
  },
];

export default function EstimateCalculator() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    projectType: "Residential",
    area: "",
    floors: "1",
    qualityTier: "Standard",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
  });
  const [result, setResult] = useState<{
    estimatedCost: bigint;
    breakdown: string;
  } | null>(null);

  const calculateMutation = useCalculateEstimate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await calculateMutation.mutateAsync({
        name: form.name,
        mobile: form.mobile,
        projectType: form.projectType,
        areaInSqFt: Number.parseFloat(form.area) || 0,
        numFloors: BigInt(Number.parseInt(form.floors) || 1),
        qualityTier: form.qualityTier,
        street: form.street,
        number: BigInt(Number.parseInt(form.houseNumber) || 0),
        city: form.city,
        postalCode: form.postalCode,
      });
      setResult(res);
      toast.success("Estimate calculated successfully!");
    } catch (_err) {
      toast.error("Failed to calculate estimate. Please try again.");
    }
  };

  const formatCurrency = (amount: bigint) => {
    const num = Number(amount);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const inputCls =
    "w-full px-4 py-3 rounded-lg border text-sm font-body text-gray-800 bg-white placeholder:text-gray-400 outline-none transition-all";
  const labelCls = "block text-xs font-semibold text-white/70 mb-1.5 font-body";
  const selectCls =
    "w-full px-4 py-3 rounded-lg border text-sm font-body text-gray-800 bg-white outline-none cursor-pointer transition-all";

  return (
    <section
      id="calculator"
      className="py-24"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4 font-body"
            style={{
              backgroundColor: "rgba(201,168,76,0.15)",
              color: "#C9A84C",
            }}
          >
            <Calculator className="w-4 h-4" />
            Free Estimate Calculator
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-3">
            How Much Will Your Project Cost?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-body">
            Get an instant construction cost estimate. Fill in all details below
            and we'll calculate a detailed breakdown.
          </p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          {result ? (
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
              >
                <Calculator
                  className="w-10 h-10"
                  style={{ color: "#C9A84C" }}
                />
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-1">
                Your Estimate
              </h3>
              <p className="text-white/50 mb-8 font-body">
                Based on the project details provided
              </p>

              <div
                className="rounded-2xl p-8 mb-6"
                style={{
                  backgroundColor: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 font-body">
                  Estimated Total Cost
                </p>
                <p
                  className="font-display text-5xl font-bold mb-6"
                  style={{ color: "#C9A84C" }}
                >
                  {formatCurrency(result.estimatedCost)}
                </p>
                <div
                  className="text-left rounded-xl p-4"
                  style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                >
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 font-body">
                    Breakdown
                  </p>
                  <p className="text-sm text-white/75 leading-relaxed font-body">
                    {result.breakdown}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 max-w-sm mx-auto">
                <button
                  type="button"
                  data-ocid="calculator.reset.button"
                  onClick={() => {
                    setResult(null);
                    setForm({
                      name: "",
                      mobile: "",
                      projectType: "Residential",
                      area: "",
                      floors: "1",
                      qualityTier: "Standard",
                      street: "",
                      houseNumber: "",
                      city: "",
                      postalCode: "",
                    });
                  }}
                  className="flex-1 border border-white/20 text-white font-semibold py-3 rounded-lg hover:bg-white/5 transition-all text-sm font-body"
                >
                  New Estimate
                </button>
                <a
                  href="#contact"
                  data-ocid="calculator.contact.button"
                  className="flex-1 py-3 rounded-lg font-semibold text-sm text-center transition-all font-body"
                  style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Details */}
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <User className="w-5 h-5" style={{ color: "#C9A84C" }} />
                  Contact Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="calc-name" className={labelCls}>
                      Full Name *
                    </label>
                    <input
                      id="calc-name"
                      data-ocid="calculator.name.input"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Enter your full name"
                      className={inputCls}
                      style={{ borderColor: "#ddd" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="calc-mobile" className={labelCls}>
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="calc-mobile"
                        data-ocid="calculator.mobile.input"
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, mobile: e.target.value }))
                        }
                        placeholder="+91 XXXXX XXXXX"
                        className={`${inputCls} pl-10`}
                        style={{ borderColor: "#ddd" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <Home className="w-5 h-5" style={{ color: "#C9A84C" }} />
                  Project Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="calc-project-type" className={labelCls}>
                      Project Type *
                    </label>
                    <select
                      id="calc-project-type"
                      data-ocid="calculator.project_type.select"
                      value={form.projectType}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, projectType: e.target.value }))
                      }
                      className={selectCls}
                      style={{ borderColor: "#ddd" }}
                    >
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="calc-area" className={labelCls}>
                      Built-up Area (sq ft) *
                    </label>
                    <input
                      id="calc-area"
                      data-ocid="calculator.area.input"
                      type="number"
                      required
                      min="100"
                      value={form.area}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, area: e.target.value }))
                      }
                      placeholder="e.g. 1500"
                      className={inputCls}
                      style={{ borderColor: "#ddd" }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className={labelCls}>
                    <Layers
                      className="inline w-3.5 h-3.5 mr-1"
                      style={{ color: "#C9A84C" }}
                    />
                    Number of Floors *
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {FLOOR_OPTIONS.map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        data-ocid={`calculator.floors.${f.value}.toggle`}
                        onClick={() =>
                          setForm((p) => ({ ...p, floors: f.value }))
                        }
                        className={`py-2.5 px-2 rounded-lg text-xs font-semibold border-2 transition-all font-body ${
                          form.floors === f.value
                            ? "text-navy"
                            : "border-white/20 text-white/60 hover:border-white/40"
                        }`}
                        style={
                          form.floors === f.value
                            ? {
                                borderColor: "#C9A84C",
                                backgroundColor: "#C9A84C",
                              }
                            : {}
                        }
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className={labelCls}>
                    <Star
                      className="inline w-3.5 h-3.5 mr-1"
                      style={{ color: "#C9A84C" }}
                    />
                    Quality Tier *
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {QUALITY_TIERS.map((tier) => (
                      <button
                        key={tier.value}
                        type="button"
                        data-ocid={`calculator.quality.${tier.value.toLowerCase()}.toggle`}
                        onClick={() =>
                          setForm((p) => ({ ...p, qualityTier: tier.value }))
                        }
                        className={`p-4 rounded-xl border-2 text-left transition-all font-body ${
                          form.qualityTier === tier.value
                            ? ""
                            : "border-white/15 hover:border-white/30"
                        }`}
                        style={
                          form.qualityTier === tier.value
                            ? {
                                borderColor: "#C9A84C",
                                backgroundColor: "rgba(201,168,76,0.1)",
                              }
                            : {}
                        }
                      >
                        <p className="font-semibold text-white text-sm">
                          {tier.label}
                        </p>
                        <p className="text-white/50 text-xs mt-0.5">
                          {tier.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ color: "#C9A84C" }} />
                  Project Location
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="calc-street" className={labelCls}>
                      Street Name *
                    </label>
                    <input
                      id="calc-street"
                      data-ocid="calculator.street.input"
                      type="text"
                      required
                      value={form.street}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, street: e.target.value }))
                      }
                      placeholder="Street / Colony name"
                      className={inputCls}
                      style={{ borderColor: "#ddd" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="calc-house" className={labelCls}>
                      House / Plot No.
                    </label>
                    <input
                      id="calc-house"
                      data-ocid="calculator.house_number.input"
                      type="number"
                      value={form.houseNumber}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, houseNumber: e.target.value }))
                      }
                      placeholder="e.g. 42"
                      className={inputCls}
                      style={{ borderColor: "#ddd" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="calc-city" className={labelCls}>
                      City *
                    </label>
                    <input
                      id="calc-city"
                      data-ocid="calculator.city.input"
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, city: e.target.value }))
                      }
                      placeholder="e.g. Gurugram"
                      className={inputCls}
                      style={{ borderColor: "#ddd" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="calc-postal" className={labelCls}>
                      Postal Code *
                    </label>
                    <input
                      id="calc-postal"
                      data-ocid="calculator.postal_code.input"
                      type="text"
                      required
                      value={form.postalCode}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, postalCode: e.target.value }))
                      }
                      placeholder="e.g. 122002"
                      className={inputCls}
                      style={{ borderColor: "#ddd" }}
                    />
                  </div>
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
                  Failed to calculate estimate. Please check your details and
                  try again.
                </div>
              )}

              <button
                type="submit"
                data-ocid="calculator.submit_button"
                disabled={calculateMutation.isPending}
                className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-60 font-body"
                style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
              >
                {calculateMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" /> Get My Estimate
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
