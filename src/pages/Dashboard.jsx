import React, { useEffect, useState } from "react";
import CreateEventForm from "../components/calendar/CreateEventForm";
import EventList from "../components/calendar/EventList";
import styles from "../css/Dashboard.module.css";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const fetchEvent = async () => {
    const user = JSON.parse(localStorage.getItem("User"));
    const response = await fetch(
      `https://datanexify-assignment.onrender.com/event/users/get?googleId=${user.googleId}`
    );
    const data = await response.json();
    if (data.events) {
      setEvents(data.events);
      localStorage.setItem("Events", JSON.stringify(data.events));
    }
  };

  const handleEventCreated = (newEvent) => {
    setEvents((prevEvents) => {
      return [newEvent, ...prevEvents];
    });
  };
  const fetchAuthToken = async () => {
    try {
      const urlParamsSearch = new URLSearchParams(window.location.search);
      const userString = urlParamsSearch.get("user");

      if (userString) {
        const user = JSON.parse(decodeURIComponent(userString));
        localStorage.setItem("User", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
  };

  useEffect(() => {
    const fetchD = async () => {
      await fetchAuthToken();
      await fetchEvent();
    };
    fetchD();
  }, []);
  return (
    <div>
      <h1 className={styles.dashboard}>Dashbaord</h1>
      <CreateEventForm onEventCreated={handleEventCreated} />
      <EventList events={events} />
    </div>
  );
}

export default Dashboard;
