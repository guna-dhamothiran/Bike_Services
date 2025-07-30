import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./Booking.css";

const EMAILJS_SERVICE_ID = "service_yhyo8we";
const EMAILJS_TEMPLATE_ID = "template_rvuheit";
const EMAILJS_PUBLIC_KEY = "dTdew8Hyq58XaMGhL";

const servicePrices = {
  "general-service": {
    _id: "1",
    serviceName: "General Service Check-up",
    price: 300,
  },
  "oil-change": {
    _id: "2",
    serviceName: "Oil Change",
    price: 150,
  },
  "water-wash": {
    _id: "3",
    serviceName: "Water Wash",
    price: 100,
  },
  "brake-inspection": {
    _id: "4",
    serviceName: "Brake Inspection",
    price: 120,
  },
};

const PICKUP_CHARGE = 250;
const LABOUR_CHARGE = 150;
const GST_RATE = 0.18;

const BookingForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    customerNote: "",
    pickupDropRequested: false,
    pickupAddress: "",
    expectedDeliveryTime: "",
    selectedServices: [],
    totalAmount: 0,
    email: "", 
  });

  const [message, setMessage] = useState("");

  const calculateTotal = () => {
    const selectedPrices = formData.selectedServices.map(
      (serviceKey) => servicePrices[serviceKey]?.price || 0
    );
    const serviceTotal = selectedPrices.reduce((a, b) => a + b, 0);
    const pickup = formData.pickupDropRequested ? PICKUP_CHARGE : 0;
    const subtotal = serviceTotal + pickup + LABOUR_CHARGE;
    const gst = subtotal * GST_RATE;
    return Math.round(subtotal + gst);
  };

  useEffect(() => {
    const total = calculateTotal();
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.selectedServices, formData.pickupDropRequested]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleServiceToggle = (serviceKey) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedServices.includes(serviceKey);
      const updated = alreadySelected
        ? prev.selectedServices.filter((s) => s !== serviceKey)
        : [...prev.selectedServices, serviceKey];
      return { ...prev, selectedServices: updated };
    });
  };

  const sendConfirmationEmail = async () => {
    const servicesList = formData.selectedServices
      .map(key => `${servicePrices[key].serviceName} - ₹${servicePrices[key].price}`)
      .join('\\n');

    const templateParams = {
      to_email: formData.email,
      vehicle_number: formData.vehicleNumber,
      delivery_time: formData.expectedDeliveryTime,
      pickup_requested: formData.pickupDropRequested ? "Yes" : "No",
      pickup_address: formData.pickupDropRequested ? formData.pickupAddress : "N/A",
      services: servicesList,
      total_amount: formData.totalAmount,
      customer_note: formData.customerNote || "N/A"
    };
    
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setMessage("⚠️ Please provide an email address");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const emailSent = await sendConfirmationEmail();
        
        setMessage(emailSent 
          ? "✅ Booking submitted successfully! Confirmation email sent."
          : "✅ Booking submitted successfully! (Email delivery failed)"
        );

        setFormData({
          vehicleNumber: "",
          customerNote: "",
          pickupDropRequested: false,
          pickupAddress: "",
          expectedDeliveryTime: "",
          selectedServices: [],
          totalAmount: 0,
          email: "",
        });
      } else {
        setMessage("❌ Failed to submit booking.");
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      setMessage("⚠️ An error occurred while submitting.");
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2>Bike Service Booking</h2>
      </div>
      {message && <p className="booking-message">{message}</p>}

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
        />

        <label>Vehicle Number</label>
        <input
        type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
          placeholder="TN01AB1234"
        />

        <label>Choose Services</label>
        {Object.entries(servicePrices).map(([key, service]) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={formData.selectedServices.includes(key)}
              onChange={() => handleServiceToggle(key)}
            />
            {service.serviceName} (₹{service.price})
          </label>
        ))}

        <label>Customer Note</label>
        <textarea
          name="customerNote"
          value={formData.customerNote}
          onChange={handleChange}
          placeholder="Any specific requests or notes"
        />

        <label>
          <input
            type="checkbox"
            name="pickupDropRequested"
            checked={formData.pickupDropRequested}
            onChange={handleChange}
          />
          Request Pickup/Drop (₹{PICKUP_CHARGE})
        </label>

        {formData.pickupDropRequested && (
          <>
            <label>Pickup Address</label>
            <input
              type="text"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
              placeholder="Address for pickup/drop"
            />
          </>
        )}

        <label>Expected Delivery Time</label>
        <input
          type="datetime-local"
          name="expectedDeliveryTime"
          value={formData.expectedDeliveryTime}
          onChange={handleChange}
          required
        />

        <div className="cost-summary">
          <h4>💰 Cost Breakdown:</h4>
          <ul>
            <li>Service Cost: ₹{formData.selectedServices.reduce((sum, key) => sum + servicePrices[key].price, 0)}</li>
            <li>Pickup Charge: ₹{formData.pickupDropRequested ? PICKUP_CHARGE : 0}</li>
            <li>Labour Charge: ₹{LABOUR_CHARGE}</li>
            <li>GST (18%): ₹{Math.round((formData.selectedServices.reduce((sum, key) => sum + servicePrices[key].price, 0) + LABOUR_CHARGE + (formData.pickupDropRequested ? PICKUP_CHARGE : 0)) * GST_RATE)}</li>
            <li><strong>Total: ₹{formData.totalAmount}</strong></li>
          </ul>
        </div>
          
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
