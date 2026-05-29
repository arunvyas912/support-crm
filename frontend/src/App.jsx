import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";

function App() {
  return (
    <BrowserRouter>

      <div className="bg-black text-white px-6 py-4 flex gap-6">
        <Link
          to="/"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className="hover:text-gray-300"
        >
          Create Ticket
        </Link>
      </div>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/create"
          element={<CreateTicket />}
        />

        <Route
          path="/ticket/:ticket_id"
          element={<TicketDetail />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;