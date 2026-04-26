const EmptyState = ({ icon = "📭", title, description }) => {
  return (
    <div className="empty-container">
      <div className="empty-icon">{icon}</div>
      <p className="empty-title">{title}</p>
      {description && <p className="empty-description">{description}</p>}
    </div>
  );
};

export default EmptyState;
