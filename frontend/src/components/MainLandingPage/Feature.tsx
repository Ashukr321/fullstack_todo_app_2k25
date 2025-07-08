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

const Feature = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Powerful Features for Your Productivity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition-shadow">
              <span className="text-5xl mb-4 select-none" role="img" aria-label={feature.title}>{feature.icon}</span>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
