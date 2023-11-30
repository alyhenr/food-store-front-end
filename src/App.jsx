import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar"
import Orders from "./pages/Orders";
import Kitchen from "./pages/Kitchen";
import TakeAway from "./pages/TakeAway";

function App() {

  return (
    <main className="grid grid-cols-1 gap-y-6 py-32 px-64">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/takeaway" element={<TakeAway />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
