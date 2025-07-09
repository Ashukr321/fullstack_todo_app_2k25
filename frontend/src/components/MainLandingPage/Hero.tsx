import React from 'react';
import { FiStar, FiGrid, FiUser, FiLayers } from 'react-icons/fi';

const floatingCards = [
  { icon: <FiStar size={28} />, className: "top-30 left-4 bg-blue-900" },
  { icon: <FiGrid size={28} />, className: "top-32 right-10 bg-green-800" },
  { icon: <FiUser size={28} />, className: "bottom-16 left-10 bg-purple-800" },
  { icon: <FiLayers size={28} />, className: "bottom-10 right-24 bg-yellow-700" },
];

const Hero = () => {
  return (
    <section id='home' className="relative min-h-[80vh] flex flex-col items-center justify-center  bg-[#18181b] overflow-hidden">
      {/* Dotted background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,_1px_1px,_#232329_1px,_transparent_1px)] bg-[size:20px_20px]" />

      {/* Floating cards/icons */}
      {floatingCards.map((card, idx) => (
        <div
          key={idx}
          className={`absolute ${card.className} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-opacity-80 text-white animate-float-slow`}
          style={{ animationDelay: `${idx * 0.5}s` }}
        >
          {card.icon}
        </div>
      ))}

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-6 z-10 mt-10">
        <span className="px-4 py-1 rounded-full bg-green-200 text-green-900 font-medium text-sm shadow">Fresh updates weekly</span>
        <span className="px-4 py-1 rounded-full bg-blue-200 text-blue-900 font-medium text-sm shadow">Flows now available for everyone</span>
      </div>

      {/* Headline */}
      <h1 className="text-white text-4xl sm:text-6xl font-serif font-bold text-center leading-tight z-10 drop-shadow-lg">
        TaskSprint <br className="hidden sm:block" />
        <span className="font-serif">Productivity Companion</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 text-gray-300 text-lg sm:text-xl text-center max-w-2xl z-10">
        The most beautiful and efficient way to manage your tasks, stay organized, and boost your productivity. Real features, real results.
      </p>

      {/* CTA Button */}
      <a
        href="#get-started"
        className="mt-10 px-8 py-3 rounded-full bg-white text-gray-900 font-semibold text-lg shadow-lg hover:bg-blue-100 transition z-10"
      >
        Start Exploring
      </a>

      {/* Custom floating animation */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
