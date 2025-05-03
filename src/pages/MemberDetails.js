import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './MemberDetails.css';

export default function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/members/${id}`)
      .then(res => setMember(res.data));
  }, [id]);

  return (
    <div className="details-container">
      <img className="profile-image" src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} />
      <h2>{member.name}</h2>
      <h3>{member.role}</h3>
      <p><strong>Email:</strong> {member.email}</p>
      <p><strong>Phone:</strong> {member.phone}</p>
      <p><strong>DOB:</strong> {member.dob && new Date(member.dob).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {member.gender}</p>
      <p><strong>Address:</strong> {member.address}</p>
      <p><strong>Skills:</strong> {member.skills?.join(', ')}</p>
      <p><strong>About:</strong> {member.bio}</p>
      <p><strong>Joined:</strong> {member.joined && new Date(member.joined).toLocaleDateString()}</p>
    </div>
  );
}
