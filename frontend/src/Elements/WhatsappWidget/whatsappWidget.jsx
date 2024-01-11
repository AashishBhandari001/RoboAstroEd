import React from "react";

function WhatsappWidget() {
  const widgetStyle = {
    position: "fixed",
    bottom: "4rem", // Adjust the distance from the bottom as needed
    right: "4rem", // Adjust the distance from the right as needed
    zIndex: 50, // Ensure it appears above other elements on the page
  };

  return (
    <div style={widgetStyle}>
      <script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      ></script>
      <div
        className="elfsight-app-e97f4196-3cf6-4a59-a401-ead0abfae607"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
}

export default WhatsappWidget;
