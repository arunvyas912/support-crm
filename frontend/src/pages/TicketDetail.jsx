import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function TicketDetail() {

  const { ticket_id } = useParams();

  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");

  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {

    try {

      const response = await API.get(
        `/api/tickets/${ticket_id}`
      );

      setTicket(response.data);

      setStatus(response.data.status);

      setNotes(response.data.notes);

    } catch (error) {
      console.log(error);
    }
  };

  const updateTicket = async () => {

    try {

      await API.put(
        `/api/tickets/${ticket_id}`,
        {
          status,
          notes
        }
      );

      alert(
        "Ticket Updated Successfully!"
      );

      fetchTicket();

    } catch (error) {
      console.log(error);
    }
  };

  if (!ticket) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-8 min-h-screen bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow space-y-4">

        <h1 className="text-3xl font-bold mb-6">
          Ticket Details
        </h1>

        <div>

          <strong>Ticket ID:</strong>

          <p>{ticket.ticket_id}</p>

        </div>

        <div>

          <strong>Customer:</strong>

          <p>{ticket.customer_name}</p>

        </div>

        <div>

          <strong>Email:</strong>

          <p>{ticket.customer_email}</p>

        </div>

        <div>

          <strong>Subject:</strong>

          <p>{ticket.subject}</p>

        </div>

        <div>

          <strong>Description:</strong>

          <p>{ticket.description}</p>

        </div>

        <div>

          <strong>Status:</strong>

          <select
            className="border p-2 rounded w-full mt-2"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

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

        <div>

          <strong>Notes:</strong>

          <textarea
            className="border p-2 rounded w-full mt-2"
            rows="4"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

        </div>

        <button
          onClick={updateTicket}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Update Ticket
        </button>

      </div>

    </div>
  );
}

export default TicketDetail;