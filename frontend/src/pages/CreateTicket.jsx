import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/api/tickets",
        formData
      );

      alert("Ticket Created Successfully!");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        "Error creating ticket"
      );
    }
  };

  return (

    <div className="p-8 min-h-screen bg-gray-100">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Create Ticket
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="customer_name"
            placeholder="Customer Name"
            className="border p-2 rounded w-full"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="customer_email"
            placeholder="Customer Email"
            className="border p-2 rounded w-full"
            value={formData.customer_email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="border p-2 rounded w-full"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 rounded w-full"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
          >
            Create Ticket
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTicket;