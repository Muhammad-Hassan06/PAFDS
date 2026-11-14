import React from 'react';

const TECH_STACK_LAYERS = [
  {
    category: 'Backend',
    technologies: ['Python', 'FastAPI'],
  },
  {
    category: 'Database',
    technologies: ['PostgreSQL'],
  },
  {
    category: 'Data Processing',
    technologies: ['Pandas', 'Polars'],
  },
  {
    category: 'Data Quality',
    technologies: ['Great Expectations or Pandera'],
  },
  {
    category: 'Machine Learning',
    technologies: ['Scikit-learn', 'XGBoost', 'Prophet or Statsmodels'],
  },
  {
    category: 'Conversational Analytics',
    technologies: ['LLM API or open-source models', 'Schema-grounded SQL generation'],
  },
  {
    category: 'Security',
    technologies: ['SQLGlot', 'Argon2 or bcrypt', 'JWT', 'ClamAV', 'OWASP ZAP'],
  },
  {
    category: 'Frontend',
    technologies: ['React', 'Tailwind CSS', 'Recharts'],
  },
  {
    category: 'Infrastructure',
    technologies: ['Docker', 'GitHub Actions'],
  },
];

export const TechStackSection: React.FC = () => {
  return (
    <section id="technology" className="py-20 lg:py-24 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl pb-10 border-b border-border">
          <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
            06 / TECHNOLOGY STACK
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Built on a Practical, Scalable Technology Stack.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_STACK_LAYERS.map((item) => (
            <div
              key={item.category}
              className="rounded-lg bg-ivory/60 border border-border p-5"
            >
              <h3 className="font-display text-base font-bold text-navy">{item.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-white border border-border-strong font-mono text-xs font-medium text-charcoal"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
