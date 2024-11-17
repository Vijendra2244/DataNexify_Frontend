import React, { useEffect, useState } from "react";
import styles from "../../css/Dashboard.module.css";

function EventList() {
  const [events, setEvents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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

  function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return "No date available";

    const date = new Date(dateTimeStr);
    if (!(date instanceof Date) || isNaN(date)) return "Invalid date";
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }

  useEffect(() => {
    const fetchEven = async () => {
      await fetchEvent();
    };
    fetchEven();
  }, []);
  return (
    <div className={styles.tableContainer}>
      <table className={styles.eventTable}>
        <thead>
          <tr>
            <th>Organizer mail details</th>
            <th>Event Name</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((eve, index) => (
            <tr key={index}>
              <td>{eve.organizer?.email || "No Email"}</td>
              <td>{eve.summary || "No Title"}</td>
              <td>{formatDateTime(eve?.start?.dateTime)}</td>
              <td>{formatDateTime(eve?.end?.dateTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EventList;
