import React from "react"

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const styles = {
    border: notification.type === "alert" ? "3px solid red" : "3px solid green",
    backgroundColor: "rgb(126 135 130 / 12%)",
    bodShadow: "0 0 2px #259c08",
    color: notification.type === "alert" ? "red" : "green",
    padding: "1em",
    fontSize: "1.2rem",
  }

  return (
    <p className="notif" style={styles}>
      {notification.message}
    </p>
  )
}

export default Notification
