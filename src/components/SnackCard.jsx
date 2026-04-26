const SnackCard = ({ snack, onOrder }) => {
  return (
    <div className="card">
      <h3 className="snack-card-name">{snack.name}</h3>
      <div className="snack-card-meta">
        <span className="snack-card-price">₹{snack.price}</span>
        <span className="snack-card-orders">{snack.ordersCount} ordered</span>
      </div>
      <button className="btn btn-primary btn-block" onClick={() => onOrder(snack)}>
        Order Now
      </button>
    </div>
  );
};

export default SnackCard;
