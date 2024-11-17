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
    console.log(data, "event in");
    if (data.events) {
      setEvents(data.events);
      localStorage.setItem("Events", JSON.stringify(data.events));
    }
  };

  const fetchAuthToken = async () => {
    try {
      const urlParamsSearch = new URLSearchParams(window.location.search);
      const userString = urlParamsSearch.get("user");

      if (userString) {
        const user = JSON.parse(decodeURIComponent(userString)); // Decode user data
        console.log(user, "decoded user info");
        localStorage.setItem("User", JSON.stringify(user)); // Store full user info
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect is running"); // Verify if the useEffect hook is triggered
    const fetchD = async () => {
      console.log("fetchD is called"); // Check if fetchD is invoked
      await fetchAuthToken();
      await fetchEvent();
    };
    const cachedEvents = localStorage.getItem("Events");
    if (cachedEvents) {
      console.log("Loading cached events");
      setEvents(JSON.parse(cachedEvents)); // Load cached events into state
    }

    fetchD();
  }, []);
  return (
    <div>
      <h1 className={styles.dashboard}>Dashbaord</h1>
      <CreateEventForm onEventCreated={fetchEvent} />
      <EventList events={events} />
    </div>
  );
}

export default Dashboard;
