import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card student-card"
      onClick={() => navigate(`/student/${student.id}`)}
    >
      <h3 className="student-card-name">{student.name}</h3>
      <p className="student-card-referral">{student.referralCode}</p>
      <p className="student-card-spent">₹{student.totalSpent} spent</p>
    </div>
  );
};

export default StudentCard;
