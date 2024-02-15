import React, { useState, useEffect } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { TbShoppingCartCopy } from "react-icons/tb";
import { MdOutlineBorderColor } from "react-icons/md";
import { RiUserSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/userAction";

function DashboardStatsGrid() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUser);
  const { orders } = useSelector((state) => state.allOrders);

  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (products) {
      const amount = products.reduce(
        (total, product) => total + product.price,
        0
      );
      setTotalAmount(amount);
    }

    dispatch(getAllUsers({ token }));
  }, [products, dispatch, token, orders]);

  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-600">
          <FaSackDollar className="text-xl text-white" />
        </div>
        <div className="pl-4 flex flex-col">
          <span className="text-sm font-light text-gray-600">
            Total Ammount
          </span>

          <strong className="text-xl text-gray-700 font-semibold">
            NPR {totalAmount.toFixed(2)}
          </strong>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-400">
          <TbShoppingCartCopy className="text-xl text-white" />
        </div>
        <div className="pl-4 flex flex-col">
          <span className="text-sm font-light text-gray-600">Product</span>

          <strong className="text-xl text-gray-700 font-semibold">
            {products && products.length}
          </strong>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-cyan-600">
          <MdOutlineBorderColor className="text-xl text-white" />
        </div>
        <div className="pl-4 flex flex-col">
          <span className="text-sm font-light text-gray-600">Total Order</span>

          <strong className="text-xl text-gray-700 font-semibold">
            {orders?.orders?.length}
          </strong>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-600">
          <RiUserSearchLine className="text-xl text-white" />
        </div>
        <div className="pl-4 flex flex-col">
          <span className="text-sm font-light text-gray-600">User</span>

          <strong className="text-xl text-gray-700 font-semibold">
            {users && users.length}
          </strong>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default DashboardStatsGrid;

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
