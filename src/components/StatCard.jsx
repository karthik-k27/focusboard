export default function StatCard({ title, value, subtitle, icon: Icon, tone = 'indigo' }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <span className="stat-card__title">{title}</span>
        {Icon && (
          <div className={`stat-card__icon stat-card__icon--${tone}`} aria-hidden="true">
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="stat-card__value">{value}</div>
      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
    </article>
  );
}
