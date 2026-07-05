import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages";
import LoginPage from "./pages/loginpage";
import SignupPage from "./pages/signuppage";
import HomePage from "./pages/home";
import CropPage from "./pages/crops";
import AnalysisPage from "./pages/analysis";
import ZonesPage from "./pages/zones";
import WeatherPage from "./pages/weather";
import MarketsPage from "./pages/markets";
import PestsPage from "./pages/pests";
import InsightsPage from "./pages/insights";
import UserPage from "./pages/user";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/signuppage" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/crops" element={<CropPage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/zones" element={<ZonesPage />} />
      <Route path="/markets" element={<MarketsPage />} />
      <Route path="/pests" element={<PestsPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}