import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  const fetchTickets = async () => {

    setLoading(true);

    try {

      const response = await API.get(
        "/api/tickets",
        {
          params: {
            search,
            status
          }
        }
      );

      setTickets(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="p-8">
        Loading tickets...
      </div>
    );
  }

  return (

    <div className="p-8 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">
        Support CRM Dashboard
      </h1>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search tickets..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            All
          </option>

          <option value="Open">
            Open
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Closed">
            Closed
          </option>

        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {tickets.length === 0 ? (

          <div className="text-gray-500">
            No tickets found.
          </div>

        ) : (

          tickets.map((ticket) => (

            <Link
              to={`/ticket/${ticket.ticket_id}`}
              key={ticket.ticket_id}
            >

              <div className="border rounded-2xl p-5 shadow hover:shadow-lg transition bg-white">

                <div className="flex justify-between items-center mb-3">

                  <h2 className="text-xl font-bold">
                    {ticket.subject}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ticket.status === "Open"
                        ? "bg-red-100 text-red-600"
                        : ticket.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ticket.status}
                  </span>

                </div>

                <p className="text-gray-700">
                  {ticket.customer_name}
                </p>

                <div className="mt-2 text-sm text-gray-500">

                  <p>
                    {ticket.ticket_id}
                  </p>

                  <p>
                    {new Date(
                      ticket.created_at
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            </Link>

          ))
        )}

      </div>

    </div>
  );
}

export default Home;