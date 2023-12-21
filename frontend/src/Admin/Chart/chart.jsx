import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartPage() {
  const stockState = {
    labels: ["out of stock", "In stock"],
    datasets: [
      {
        backgroundColor: ["#2DBBB1 ", "#00A6B8"],
        hoverbackgroundColor: ["#00A6B4", "#00A6B8"],
        data: [2, 20],
      },
    ],
  };
  const ammountState = {
    labels: ["Initial Ammount", "Ammount Earned"],
    datasets: [
      {
        backgroundColor: ["#BBBB2D ", "#2DBB96"],
        hoverbackgroundColor: ["#00A6B4", "#00A6B8"],
        data: [2000, 4000],
      },
    ],
  };

  return (
    <div className="barchart mt-10  flex flex-row">
      <div className="flex flex-row gap-48">
        <Doughnut data={stockState} />

        <Doughnut data={ammountState} />
      </div>
    </div>
  );
}

export default ChartPage;
