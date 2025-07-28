import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, isAdminEmail } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Competitions from './components/Competitions';
import Team from './components/Team';
import Contact from './components/Contact';
import Login from './admin/Login';
import AdminDashboard from './admin/Admin';
import AddProject from './admin/AddProject';
import AddTeamMember from './admin/AddTeamMember';
import AddCompetition from './admin/AddCompetition';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Competitions />
      <Team />
      <Contact />
    </>
  );
}

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) return <div>Se încarcă...</div>;

  if (!user || !isAdminEmail(user.email)) {
    navigate('/login');
    return null;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/despre" element={<About />} />
        <Route path="/proiecte" element={<Projects />} />
        <Route path="/competitii" element={<Competitions />} />
        <Route path="/echipa" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-project"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-team-member"
          element={
            <ProtectedRoute>
              <AddTeamMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-competition"
          element={
            <ProtectedRoute>
              <AddCompetition />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;