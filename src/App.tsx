import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { TranscriptionApp } from './pages/TranscriptionApp';
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Layout';


function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'app' |'transcription-app'>('landing');
  const handleAuthSuccess = () => {
    setCurrentView('app');
  };
  return(
    <Router>
    <Routes>
      {/* Define the layout route */}
      <Route path="/" element={<Header />}>
        {/* Nested routes */}
        <Route index element={<LandingPage />} />
        <Route path="signup" element={<Signup onSuccess={handleAuthSuccess} />} />
        <Route path="signin" element={<Login onSuccess={handleAuthSuccess} />} />
        <Route path="transcription" element={<TranscriptionApp />} />
      </Route>
    </Routes>
  </Router>
  )

}

export default App;