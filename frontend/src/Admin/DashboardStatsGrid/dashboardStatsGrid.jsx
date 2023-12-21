import React from "react";
import { FaSackDollar } from "react-icons/fa6";
import { TbShoppingCartCopy } from "react-icons/tb";
import { MdOutlineBorderColor } from "react-icons/md";
import { RiUserSearchLine } from "react-icons/ri";

function DashboardStatsGrid() {
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
            NPR 22220000.0000
          </strong>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-400">
          <TbShoppingCartCopy className="text-xl text-white" />
        </div>
        <div className="pl-4 flex flex-col">
          <span className="text-sm font-light text-gray-600">Product</span>

          <strong className="text-xl text-gray-700 font-semibold">60</strong>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-cyan-600">
          <MdOutlineBorderColor className="text-xl text-white" />
        </div>
        <div className="pl-4 flex flex-col">
          <span className="text-sm font-light text-gray-600">Total Order</span>

          <strong className="text-xl text-gray-700 font-semibold">1000</strong>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-600">
          <RiUserSearchLine className="text-xl text-white" />
        </div>
        <div className="pl-4 flex flex-col">
          <span className="text-sm font-light text-gray-600">User</span>

          <strong className="text-xl text-gray-700 font-semibold">60</strong>
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
