import React, { useState } from 'react';
import { Calculator, MapPin, Home, Layers, Star, User, Phone, Loader2 } from 'lucide-react';
import { useCalculateEstimate } from '../hooks/useQueries';

const PROJECT_TYPES = ['Residential', 'Commercial', 'Farm House', 'Villa', 'Duplex'];
const FLOOR_OPTIONS = ['1', '2', '3', '4', '5', '6+'];
const QUALITY_TIERS = [
  { value: 'Standard', label: 'Standard', rate: '₹1,350/sq ft', desc: 'Quality materials, functional finishes' },
  { value: 'Premium', label: 'Premium', rate: '₹1,450/sq ft', desc: 'Superior materials, premium finishes' },
  { value: 'Luxury', label: 'Luxury', rate: '₹1,550/sq ft', desc: 'Top-tier materials, luxury finishes' },
];

export default function EstimateCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    projectType: 'Residential',
    area: '',
    floors: '1',
    qualityTier: 'Standard',
    street: '',
    houseNumber: '',
    city: '',
    postalCode: '',
  });
  const [result, setResult] = useState<{ estimatedCost: bigint; breakdown: string } | null>(null);

  const calculateMutation = useCalculateEstimate();

  const handleSubmit = async () => {
    try {
      const res = await calculateMutation.mutateAsync({
        name: formData.name,
        mobile: formData.mobile,
        projectType: formData.projectType,
        areaInSqFt: parseFloat(formData.area) || 0,
        numFloors: BigInt(parseInt(formData.floors) || 1),
        qualityTier: formData.qualityTier,
        street: formData.street,
        number: BigInt(parseInt(formData.houseNumber) || 0),
        city: formData.city,
        postalCode: formData.postalCode,
      });
      setResult(res);
      setStep(4);
    } catch (error) {
      // error shown in UI
    }
  };

  const formatCurrency = (amount: bigint) => {
    const num = Number(amount);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all';

  const selectClass =
    'w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer';

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            Free Estimate Calculator
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            How Much Will Your Project Cost?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get an instant construction cost estimate. Fill in your project details and we'll calculate a detailed breakdown.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10 gap-2">
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`h-1 w-16 rounded transition-all ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Your Contact Details
              </h3>
              <p className="text-gray-500 mb-6">We'll send your estimate to you directly.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.mobile}
                className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Project Details →
              </button>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Home className="w-6 h-6 text-primary" />
                Project Details
              </h3>
              <p className="text-gray-500 mb-6">Tell us about your construction project.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Project Type *</label>
                  <div className="relative">
                    <select
                      value={formData.projectType}
                      onChange={e => setFormData(p => ({ ...p, projectType: e.target.value }))}
                      className={selectClass}
                    >
                      {PROJECT_TYPES.map(type => (
                        <option key={type} value={type} className="bg-white text-gray-900">
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Built-up Area (sq ft) *
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={formData.area}
                    onChange={e => setFormData(p => ({ ...p, area: e.target.value }))}
                    placeholder="e.g. 1500"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Floors *</label>
                  <div className="grid grid-cols-6 gap-2">
                    {FLOOR_OPTIONS.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, floors: f === '6+' ? '6' : f }))}
                        className={`py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                          formData.floors === (f === '6+' ? '6' : f)
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quality Tier *</label>
                  <div className="space-y-2">
                    {QUALITY_TIERS.map(tier => (
                      <button
                        key={tier.value}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, qualityTier: tier.value }))}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all text-left ${
                          formData.qualityTier === tier.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 bg-white hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Star
                            className={`w-5 h-5 ${formData.qualityTier === tier.value ? 'text-primary fill-primary' : 'text-gray-400'}`}
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{tier.label}</p>
                            <p className="text-xs text-gray-500">{tier.desc}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${formData.qualityTier === tier.value ? 'text-primary' : 'text-gray-500'}`}>
                          {tier.rate}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:border-gray-300 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.area}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Location →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Location & Submit */}
          {step === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Project Location
              </h3>
              <p className="text-gray-500 mb-6">Where will the construction take place?</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Street Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={e => setFormData(p => ({ ...p, street: e.target.value }))}
                      placeholder="Street / Colony name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">House / Plot No.</label>
                    <input
                      type="number"
                      value={formData.houseNumber}
                      onChange={e => setFormData(p => ({ ...p, houseNumber: e.target.value }))}
                      placeholder="e.g. 42"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                      placeholder="e.g. Gurugram"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={e => setFormData(p => ({ ...p, postalCode: e.target.value }))}
                      placeholder="e.g. 122002"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {calculateMutation.isError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  Failed to calculate estimate. Please try again.
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:border-gray-300 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={calculateMutation.isPending || !formData.street || !formData.city || !formData.postalCode}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {calculateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" />
                      Get My Estimate
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && result && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Your Estimate</h3>
              <p className="text-gray-500 mb-6">Based on your project details</p>

              <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8 mb-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Estimated Total Cost
                </p>
                <p className="text-5xl font-extrabold text-primary mb-4">
                  {formatCurrency(result.estimatedCost)}
                </p>
                <div className="text-left bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Breakdown
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{result.breakdown}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setResult(null);
                    setFormData({
                      name: '', mobile: '', projectType: 'Residential',
                      area: '', floors: '1', qualityTier: 'Standard',
                      street: '', houseNumber: '', city: '', postalCode: '',
                    });
                  }}
                  className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:border-gray-300 transition-all"
                >
                  Start Over
                </button>
                <a
                  href="#contact"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all text-center"
                >
                  Contact Us Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
