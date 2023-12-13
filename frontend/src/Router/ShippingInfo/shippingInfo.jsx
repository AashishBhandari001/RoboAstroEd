import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../Actions/cartAction";
import MetaData from "../Metadata/metaData";
import { Country, State } from "country-state-city";
import { Home, MapPin, Phone } from "lucide-react";
import { TbMapPinCode } from "react-icons/tb";
import { MdPublic } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import CheckOutSteps from "../../Elements/CheckOutSteps";

function ShippingInfo() {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [country, setCountry] = useState(shippingInfo?.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
  const [state, setState] = useState(shippingInfo?.state || "");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch the list of countries on component mount
    const fetchCountries = async () => {
      const countryList = await Country.getAllCountries();
      setCountries(countryList);
    };

    fetchCountries();
  }, []);

  const shippingSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save shipping info using dispatch(saveShippingInfo(...))
  };

  return (
    <div className="mt-32 mb-10 md:mb-24  flex flex-col">
      <MetaData title="Shipping" />
      <CheckOutSteps activeStep={0} />
      <div className="container mt-10 mx-auto ">
        <h2 className="text-2xl text-center text-6xl justify-center font-semibold mb-4">
          Shipping Details
        </h2>
        <hr className="w-auto mb-4" />

        <div className="max-w-md mx-auto  bg-white p-6 md:p-10   rounded shadow-lg">
          <form className="shipping-form" onSubmit={shippingSubmit}>
            <div className="mb-8 flex items-center">
              <Home className="inline-block mr-2" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 ring-2 ring-inset ring-cyan-600 flex-grow"
              />
            </div>

            <div className="mb-8 flex items-center">
              <MapPin className="inline-block mr-2" />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 ring-2 ring-inset ring-cyan-600 flex-grow"
              />
            </div>

            <div className="mb-8 flex items-center">
              <TbMapPinCode className="inline-block mr-2 " />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="p-2 ring-2 ring-inset ring-cyan-600 flex-grow"
              />
            </div>

            <div className="mb-8 flex items-center">
              <Phone className="inline-block mr-2" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="p-2 ring-2 ring-inset ring-cyan-600 flex-grow"
              />
            </div>

            <div className="mb-8 flex items-center">
              <MdPublic className="inline-block mr-2" />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="p-2 ring-2 ring-inset ring-cyan-600 flex-grow"
              >
                <option value="">Country</option>
                {countries.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div className="mb-8 flex items-center">
                <FaMapLocationDot className="inline-block mr-2" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="p-2 ring-2 ring-inset ring-cyan-600 flex-grow"
                >
                  <option value="">State</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="justify-center text-center">
              <input
                type="submit"
                value="Continue"
                className="bg-cyan-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
                disabled={!state}
                // onClick={}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
