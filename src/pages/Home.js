import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="title">👨‍💻 Welcome to Our SCOOBY DOO Team 👩‍💻</h1>
      <div className="button-group">
        <Link to="/add">
          <button className="glow-button">➕ Add Member</button>
        </Link>
        <Link to="/members">
          <button className="glow-button">👥 View Members</button>
        </Link>
      </div>
    </div>
  );
}
