import React from 'react';

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 md:py-24 flex items-center justify-center min-h-[60vh] relative overflow-hidden">
      {/* Layered Background Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-200 opacity-40 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-blue-300 opacity-30 rounded-full blur-2xl z-0" />
      <div className="absolute top-10 left-10 w-[180px] h-[180px] bg-blue-100 opacity-50 rounded-full blur-2xl z-0" />
      <div className="max-w-5xl w-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Glassmorphism/Card Effect */}
        <div className="flex-1 z-10">
          <div className="backdrop-blur-md bg-white/70 border border-blue-100 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center md:text-left">
              Organize Your Day, <span className="text-blue-400">Achieve More</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8 text-center md:text-left">
              The simplest way to manage your tasks, boost productivity, and never miss a deadline. Start your journey to a more organized life with our Todo App!
            </p>
            <a
              href="#signup"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:from-blue-500 hover:to-blue-700 transition-all text-lg"
            >
              Get Started
            </a>
          </div>
        </div>
        {/* Illustration/Icon with Overlap */}
        <div className="flex-1 flex justify-center md:justify-end relative mt-10 md:mt-0 z-10">
          <span className="text-[120px] md:text-[200px] select-none drop-shadow-xl md:absolute md:-right-10 md:top-1/2 md:-translate-y-1/2" role="img" aria-label="Checklist">📝</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
