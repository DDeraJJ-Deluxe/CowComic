import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './components/firebase';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import LoginHome from "./pages/LoginHome"
import SavedBooks from "./pages/SavedBooks"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <LoginHome /> : <Home />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved-books" element={isLoggedIn ? <SavedBooks /> : <Navigate to="/" />} />
        <Route path="/login-home" element={isLoggedIn ? <LoginHome /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
