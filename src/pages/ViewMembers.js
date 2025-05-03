import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewMembers.css';

export default function ViewMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(res => setMembers(res.data));
  }, []);

  return (
    <div className="view-container">
      <h2>Our Team Members</h2>
      <div className="card-grid">
        {members.map(m => (
          <div className="member-card" key={m._id}>
            <div className="card-inner">
              <div className="card-front">
                <img src={`http://localhost:5000/uploads/${m.image}`} alt={m.name} />
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
              <div className="card-back">
                <h4>{m.name}</h4>
                <p>Click below to view more details.</p>
                <Link to={`/members/${m._id}`}>
                  <button className="details-btn">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
