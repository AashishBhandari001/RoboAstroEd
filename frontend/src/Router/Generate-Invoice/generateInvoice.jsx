import React, { useEffect, useRef } from "react";
import companyLogo from "../../Assets/RoboAstroEd.png";
import { generateInvoiceAction } from "../../Actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function GenerateInvoice() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pdfRef = useRef();

  const { order, error } = useSelector((state) => state.generateInvoice);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  useEffect(() => {
    // Dispatch action to fetch data and then trigger PDF generation
    dispatch(generateInvoiceAction(id, { token }));
  }, [dispatch, id, token]);

  const formatDate = (date) => {
    if (!date instanceof Date || isNaN(date)) {
      return ""; // or whatever default value you want to return
    }
    return date.toISOString().split("T")[0];
  };

  // Function to calculate due date as 10 days after invoice date
  const invoiceDate = new Date(order?.createdAt);
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + 10);

  const handleDownloadPDF = () => {
    const invoiceContent = pdfRef.current;

    html2canvas(invoiceContent, { scrollY: -window.scrollY, scale: 2 }).then(
      (canvas) => {
        document.body.style.backgroundColor = "white";
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save("invoice.pdf");
      }
    );
  };

  return (
    <div className="bg-white mb-6 mt-28 max-w-3xl mx-auto">
      <div
        className=" p-6 bg-white rounded shadow-sm my-6  border border-gray-200"
        id="invoice"
        ref={pdfRef}
      >
        <div className="grid grid-cols-2 items-center">
          <div>
            <img
              src={companyLogo}
              alt="company-logo"
              height="100"
              width="100"
            />
          </div>

          <div className="text-right">
            <p className="font-semibold"> RoboAstroEd</p>
            <p className="text-black text-sm">bhandariashish397@gmail.com</p>
            <p className="text-black text-sm mt-1">+977-9861607730</p>
            <p className="text-black text-sm mt-1">Sample VAT NUM: 0000000</p>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center mt-8">
          <div>
            <p className="font-bold text-black">Bill to :</p>
            {order?.shippingInfo && (
              <>
                <p className="text-black">
                  {order?.shippingInfo.address}, {order?.shippingInfo.city},{" "}
                  {order?.shippingInfo.state}, {order?.shippingInfo.country}
                </p>
                <p className="text-black">{order?.shippingInfo.phoneNo}</p>
              </>
            )}

            <p className="font-bold text-black">
              Payment Status:{" "}
              <span
                className={
                  order?.paymentStatus === "Completed"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {order?.paymentStatus}
              </span>
            </p>
          </div>

          <div className="text-right">
            <p>
              <span className="font-bold">Invoice number:</span>{" "}
              <span className="text-black">{order?._id}</span>
            </p>
            <p>
              <span className="font-bold">Invoice date: </span>
              <span className="text-black">{formatDate(invoiceDate)}</span>
              <br />
              {order?.paymentStatus !== "Completed" && (
                <>
                  <span className="font-bold">Due date: </span>
                  <span className="text-black">{formatDate(dueDate)}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
            </colgroup>
            <thead className="border-b border-gray-300 text-black">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black sm:pl-0"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-black"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-right text-sm font-semibold text-black"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-black sm:pr-0"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="max-w-0 py-5 pl-4 pr-3 text-sm">
                    <div className="font-medium text-black">{item.name}</div>
                    <div className="mt-1 truncate text-black">
                      {item.product}
                    </div>
                  </td>
                  <td className="px-3 py-5 text-right text-sm text-black">
                    {item.quantity}
                  </td>
                  <td className="px-3 py-5 text-right text-sm text-black">
                    NRs {item.price}
                  </td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-black sm:pr-0">
                    NRs {item.quantity * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan="3"
                  className="pl-4 pr-3 pt-6 text-right text-sm font-normal text-black"
                >
                  Subtotal
                </th>
                <td className="pl-3 pr-6 pt-6 text-right text-sm text-black sm:pr-0">
                  NRs {order?.itemsPrice}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan="3"
                  className="pl-4 pr-3 pt-4 text-right text-sm font-normal text-black"
                >
                  Tax
                </th>
                <td className="pl-3 pr-6 pt-4 text-right text-sm text-black sm:pr-0">
                  NRs {order?.taxPrice}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan="3"
                  className="pl-4 pr-3 pt-4 text-right text-sm font-normal text-black"
                >
                  Shipping Price
                </th>
                <td className="pl-3 pr-6 pt-4 text-right text-sm text-black sm:pr-0">
                  NRs {order?.shippingPrice}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan="3"
                  className="pl-4 pr-3 pt-4 text-right text-sm font-semibold text-black"
                >
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-black sm:pr-0">
                  NRs {order?.totalPrice}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t-2 pt-4 text-xs text-black text-center mt-16">
          {order?.paymentStatus === "Completed" ? (
            <>
              <p>Your order will be delivered within 2 working days. 😊</p>
              <p>Thank you for your purchase!</p>
            </>
          ) : (
            <p>Please pay the invoice before the due date.</p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default GenerateInvoice;
