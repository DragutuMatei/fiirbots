import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

function AdminDashboard() {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="mb-3">
        <Link to="/admin/add-project" className="btn btn-primary me-2">Adaugă Proiect</Link>
        <Link to="/admin/add-team-member" className="btn btn-primary me-2">Adaugă Membru</Link>
        <Link to="/admin/add-competition" className="btn btn-primary me-2">Adaugă Competiție</Link>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
    </div>
  );
}

export default AdminDashboard;