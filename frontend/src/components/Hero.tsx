import React from 'react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-construction.dim_1920x1080.png')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-32">
        <div className="mb-6">
          <p className="text-4xl md:text-6xl font-extrabold text-orange-500 uppercase tracking-wide leading-tight drop-shadow-lg">
            urbantheekedaar we build structures that last generations
          </p>
        </div>
        <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed">
          Crafting timeless homes and commercial spaces with unmatched quality, transparency, and precision — because your legacy deserves nothing less.
        </p>
        <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          From foundation to finish, we bring decades of expertise, live project tracking, and a commitment to on-time delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Project
          </a>
          <a
            href="#calculator"
            className="bg-white/10 hover:bg-white/20 border border-white/40 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-200 backdrop-blur-sm"
          >
            Get Free Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
