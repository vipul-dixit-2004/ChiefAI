import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generate from "./pages/Generate";
import LoginSignUp from "./pages/LoginSignUp";
import Auth from "./routes/Auth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/generate" element={<Auth><Generate /></Auth>} />
          <Route path="/dashboard" element={<Auth><Dashboard /></Auth>} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;