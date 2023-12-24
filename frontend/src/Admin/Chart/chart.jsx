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
        data: [20, 200],
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
    <div className="mt-10">
      <div className=" flex flex-row w-80 h-80 gap-20">
        <Doughnut data={stockState} />
        <Doughnut data={ammountState} />
      </div>
    </div>
  );
}

export default ChartPage;
