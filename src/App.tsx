import { LandingPage } from './pages/LandingPage';
import { TranscriptionApp } from './pages/TranscriptionApp';
import { Signup } from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './hooks/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<LandingPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Login />} />
            <Route
              path="transcription"
              element={
                <ProtectedRoute>
                  <TranscriptionApp />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
