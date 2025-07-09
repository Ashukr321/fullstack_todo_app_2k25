import React from 'react';

const features = [
  {
    icon: '👤',
    title: 'Create Account',
    description: 'Sign up easily and securely to start managing your tasks from anywhere.'
  },
  {
    icon: '📝',
    title: 'Create Todo Tasks',
    description: 'Add new tasks quickly to keep track of everything you need to do.'
  },
  {
    icon: '🔄',
    title: 'Full CRUD Operations',
    description: 'Edit, update, and delete your tasks anytime. Stay organized and in control.'
  }
];

const cardColors = [
  'bg-blue-800',
  'bg-green-800',
  'bg-purple-800',
];

const Feature = () => {
  return (
    <section className="w-full py-16 relative bg-[#18181b] overflow-hidden" id='feature'>
      {/* Dotted background pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,_1px_1px,_#232329_1px,_transparent_1px)] bg-[size:20px_20px]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 drop-shadow-lg">
          Powerful Features for Your Productivity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center ${cardColors[idx % cardColors.length]} rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow bg-opacity-90 text-white animate-float-slow`}
              style={{ animationDelay: `${idx * 0.3}s` }}
            >
              <span className="text-5xl mb select-none" role="img" aria-label={feature.title}>{feature.icon}</span>
              <h3 className="text-xl font-semibold text-white mb-2 drop-shadow">{feature.title}</h3>
              <p className="text-gray-200 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Floating animation for cards */}
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

export default Feature;
