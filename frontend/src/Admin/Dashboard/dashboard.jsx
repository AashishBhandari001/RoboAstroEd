import React from "react";
import DashboardStatsGrid from "../DashboardStatsGrid/dashboardStatsGrid";
import ChartPage from "../Chart";

function Dashboard() {
  return (
    <div className="flex flex-col gap-4 ">
      <DashboardStatsGrid />
      <div>
        <ChartPage />
      </div>
    </div>
  );
}

export default Dashboard;
