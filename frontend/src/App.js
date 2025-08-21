import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./component/AuthPage";
import Dashboard from "./Pages/Dashboard";
import VehiclesPage from "./Pages/Vehicles";
import BookingsPage from "./Pages/BookingPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    // </Router>
  );
}

export default App;
