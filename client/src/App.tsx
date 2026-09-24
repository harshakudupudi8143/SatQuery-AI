import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Lesson from './pages/Lesson';
import Progress from './pages/Progress';
import UnderConstruction from './pages/UnderConstruction';
import { AIChatWidget } from './components/AIChatWidget';
import { LanguageWidget } from './components/LanguageWidget';
import { LanguageModal } from './components/LanguageModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/parents-teachers" element={<UnderConstruction />} />
      </Routes>
      <AIChatWidget />
      <LanguageWidget />
      <LanguageModal />
    </Router>
  );
}

export default App;
