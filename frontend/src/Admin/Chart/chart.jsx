import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { getAdminProduct } from "../../Actions/productAction";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.user);

  let outOfStock = 0;

  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(
      getAdminProduct({
        token: currentUser.token,
      })
    );
  }, [dispatch]);

  const stockState = {
    labels: ["out of stock", "In stock"],
    datasets: [
      {
        backgroundColor: ["#2DBBB1 ", "#00A6B8"],
        hoverbackgroundColor: ["#00A6B4", "#00A6B8"],
        data: [outOfStock, products.length - outOfStock],
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
