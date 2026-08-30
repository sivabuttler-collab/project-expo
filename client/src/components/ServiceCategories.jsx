import React from 'react';

export default function ServiceCategories({ categories, selectedCategory, onSelectCategory }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <div className="section-header">
        <div>
          <h2 className="section-title">Verified Service Experts</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Choose a service category to find government-verified local technicians near you
          </p>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              className={`category-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.title}</div>
              <div className="category-price">
                {cat.startPrice ? `From ₹${cat.startPrice}` : (cat.badge || 'Verified')}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
