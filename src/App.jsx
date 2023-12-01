import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar"
import Orders from "./pages/Orders";
import Kitchen from "./pages/Kitchen";
import TakeAway from "./pages/TakeAway";
import { QueryClient, QueryClientProvider } from "react-query";
import Admin from "./pages/Admin";
import CartProvider from "./context/CartProvider";
import ClientProvider from "./context/ClientProvider";

function App() {

  const client = new QueryClient();

  return (
    <main className="grid grid-cols-1 gap-y-6 py-32 px-32 2xl:px-48">
      <Router>
        <QueryClientProvider client={client}>
          <ClientProvider>
            <CartProvider>
              <NavBar />
              <Routes>
                <Route path="/" element={<Orders />} />
                <Route path="/kitchen" element={<Kitchen />} />
                <Route path="/takeaway" element={<TakeAway />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </CartProvider>
          </ClientProvider>
        </QueryClientProvider>
      </Router>
    </main>
  )
}

export default App
