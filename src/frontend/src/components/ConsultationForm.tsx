import { CheckCircle, Loader2 } from "lucide-react";
import { forwardRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitQueryForm } from "../hooks/useQueries";

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Renovation",
  "Farm House",
  "Turnkey",
];
const BUDGET_RANGES = [
  "Under ₹30 Lakh",
  "₹30L – ₹50L",
  "₹50L – ₹1 Crore",
  "Above ₹1 Crore",
];

const ConsultationForm = forwardRef<HTMLElement>((_, ref) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    projectType: "",
    plotSize: "",
    budgetRange: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitQueryForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        serviceType: form.projectType || "General",
        message: `City: ${form.city}\nPlot Size: ${form.plotSize}\nBudget: ${form.budgetRange}\n\n${form.message}`,
      });
      setSubmitted(true);
      toast.success(
        "Consultation request received! We'll reach out within 24 hours.",
      );
    } catch (_err) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-lg border text-sm font-body transition-all outline-none focus:ring-2 focus:border-transparent bg-white text-gray-800 placeholder:text-gray-400";
  const inputStyle = { borderColor: "#ddd" };

  return (
    <section ref={ref} id="contact" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 py-8" style={{ backgroundColor: "#0A1628" }}>
            <div
              className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-3 font-body"
              style={{
                backgroundColor: "rgba(201,168,76,0.2)",
                color: "#C9A84C",
              }}
            >
              Free Consultation
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              Get Free Consultation
            </h2>
            <p className="text-white/60 font-body text-sm">
              Fill in your details and our expert team will reach out within 24
              hours.
            </p>
          </div>

          <div className="bg-white px-8 py-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: "#C9A84C" }}
                />
                <h3 className="font-display text-2xl font-bold text-navy mb-2">
                  Request Received!
                </h3>
                <p className="text-gray-500 font-body mb-6">
                  Thank you, {form.fullName}! Our team will contact you within
                  24 hours.
                </p>
                <button
                  type="button"
                  data-ocid="contact.new_request.button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      fullName: "",
                      phone: "",
                      email: "",
                      city: "",
                      projectType: "",
                      plotSize: "",
                      budgetRange: "",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold font-body"
                  style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="cf-name"
                      className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                    >
                      Full Name *
                    </label>
                    <input
                      id="cf-name"
                      data-ocid="contact.name.input"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fullName: e.target.value }))
                      }
                      placeholder="Enter your full name"
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-phone"
                      className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="cf-phone"
                      data-ocid="contact.phone.input"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-email"
                      className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                    >
                      Email Address
                    </label>
                    <input
                      id="cf-email"
                      data-ocid="contact.email.input"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-city"
                      className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                    >
                      City / Location *
                    </label>
                    <input
                      id="cf-city"
                      data-ocid="contact.city.input"
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, city: e.target.value }))
                      }
                      placeholder="e.g. Gurugram"
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-project-type"
                      className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                    >
                      Project Type *
                    </label>
                    <select
                      id="cf-project-type"
                      data-ocid="contact.project_type.select"
                      required
                      value={form.projectType}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, projectType: e.target.value }))
                      }
                      className={`${inputCls} cursor-pointer`}
                      style={inputStyle}
                    >
                      <option value="">Select project type</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="cf-plot-size"
                      className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                    >
                      Plot Size
                    </label>
                    <input
                      id="cf-plot-size"
                      data-ocid="contact.plot_size.input"
                      type="text"
                      value={form.plotSize}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, plotSize: e.target.value }))
                      }
                      placeholder="e.g. 200 sq yards"
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cf-budget"
                    className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                  >
                    Budget Range
                  </label>
                  <select
                    id="cf-budget"
                    data-ocid="contact.budget.select"
                    value={form.budgetRange}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, budgetRange: e.target.value }))
                    }
                    className={`${inputCls} cursor-pointer`}
                    style={inputStyle}
                  >
                    <option value="">Select budget range</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cf-message"
                    className="block text-xs font-semibold text-gray-600 mb-1.5 font-body"
                  >
                    Message / Requirements
                  </label>
                  <textarea
                    id="cf-message"
                    data-ocid="contact.message.textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your project, requirements, or any specific questions..."
                    rows={4}
                    className={`${inputCls} resize-none`}
                    style={inputStyle}
                  />
                </div>

                {mutation.isError && (
                  <div
                    data-ocid="contact.error_state"
                    className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-lg font-body"
                  >
                    Failed to submit. Please try again later.
                  </div>
                )}

                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full py-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-60 font-body"
                  style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>Get Free Consultation →</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

ConsultationForm.displayName = "ConsultationForm";
export default ConsultationForm;
