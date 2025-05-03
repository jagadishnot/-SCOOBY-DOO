import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddMember.css';

export default function AddMember() {
  const [data, setData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    skills: '',
    bio: '',
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in data) {
      if (key === 'skills') {
        data[key].split(',').forEach(skill => form.append('skills[]', skill.trim()));
      } else {
        form.append(key, data[key]);
      }
    }

    try {
      await axios.post('http://localhost:5000/api/members', form);
      setSuccessMessage('✅ Member added successfully! Redirecting...');
      setData({
        name: '',
        role: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        address: '',
        skills: '',
        bio: '',
        image: null,
      });
      document.querySelector('input[name="image"]').value = '';

      console.log('Waiting to redirect...');
      setTimeout(() => {
        console.log('Redirecting now...');
        navigate('/team');
      }, 3000);
    } catch (err) {
      console.error(err);
      setSuccessMessage('❌ Error adding member. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData({ ...data, [name]: files ? files[0] : value });
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>Add New Team Member</h2>

      <input name="name" type="text" placeholder="Full Name" value={data.name} onChange={handleChange} required />
      <input name="role" type="text" placeholder="Role" value={data.role} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} required />
      <input name="phone" type="text" placeholder="Phone" value={data.phone} onChange={handleChange} />
      <input name="dob" type="date" value={data.dob} onChange={handleChange} />
      <select name="gender" value={data.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input name="address" type="text" placeholder="Address" value={data.address} onChange={handleChange} />
      <input name="skills" type="text" placeholder="Skills (comma separated)" value={data.skills} onChange={handleChange} />
      <textarea name="bio" placeholder="Short Bio" rows="4" value={data.bio} onChange={handleChange} />

      <label className="file-label">
        Upload Profile Image:
        <input name="image" type="file" onChange={handleChange} required />
      </label>

      <button type="submit">Add Member</button>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </form>
  );
}
