const Spinner = ({ size = "md", message }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner spinner-${size}`} />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default Spinner;
