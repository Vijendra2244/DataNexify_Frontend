import React, { useState } from "react";
import styles from "../../css/Dashboard.module.css";

function CreateEventForm({ onEventCreated }) {
  const [event, setEvent] = useState({
    name: "",
    start: "",
    end: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("working");
      // Check if required fields are provided
      if (!event.start || !event.end) {
        throw new Error("Start and end times are required.");
      }

      // Validate the datetime format
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);

      if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error(
          "Invalid date format. Ensure the date-time is correctly set."
        );
      }

      const userInfo = JSON.parse(localStorage.getItem("User"));
      if (!userInfo || !userInfo.googleId) {
        throw new Error("Google ID not found in localStorage.");
      }

      const formattedEvent = {
        name: event.name,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      };

      const response = await fetch(
        `https://datanexify-assignment.onrender.com/event/calendar/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleId: userInfo.googleId,
            event: formattedEvent,
          }),
        }
      );

      const data = await response.json();
      if (data.msg === "Success") {
        console.log("Event created successfully:", data.event);
        if (onEventCreated) {
          onEventCreated(data.event);
          setIsModalOpen(false);
          setEvent({ name: "", start: "", end: "" });
        }
      } else {
        console.error("Failed to create event:", data);
      }
    } catch (error) {
      console.error("Error creating event:", error.message || error);
    }
  };

  return (
    <>
      <button
        className={styles.createEventBtn}
        onClick={() => setIsModalOpen(true)}
      >
        Create Calendar Event
      </button>
      <div
        className={`${styles.modalOverlay} ${isModalOpen ? styles.active : ""}`}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Create New Event</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
          </div>
          <form className={styles.formParent} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter Your Event Name Here..."
                value={event.name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="datetime-local"
                value={event.start}
                onChange={(e) => setEvent({ ...event, start: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="datetime-local"
                value={event.end}
                onChange={(e) => setEvent({ ...event, end: e.target.value })}
                required
              />
            </div>
            <button className={styles.submitButton} type="submit">
              Create Calendar Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateEventForm;
