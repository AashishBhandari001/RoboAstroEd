import React from "react";

const Terms = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center mt-20 mb-2">
      <div className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            1. Agreement Acceptance
          </h2>
          <p>
            By accessing or using the Roboastroed Website, Products, or
            services, users agree to be bound by these terms and conditions.
            Users must read and understand the agreement before using the
            website or purchasing any products/services.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Company Information</h2>
          <p>
            Roboastroed is a project operated by Beyond Apogee, registered in
            Nepal, and with its registered office at Budanilkantha-12,
            kathmandu, Nepal.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            3. Trademarks and Copyright
          </h2>
          <p>
            All trademarks and content on the website are the property of Beyond
            Apogee and are protected by copyright laws. Users are not authorized
            to use any trademarks or content without written permission.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            4. User Responsibilities
          </h2>
          <p>
            Users agree to use the website and services responsibly and in
            compliance with applicable laws and regulations. They must not
            engage in any illegal activities or misuse the website or services
            in any way.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            5. Limitation of Liability
          </h2>
          <p>
            Beyond Apogee shall not be liable for any damages or losses arising
            from the use of the website or services. Users agree to indemnify
            and hold Beyond Apogee harmless from any claims, liabilities, or
            expenses.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Governing Law</h2>
          <p>
            These terms and conditions shall be governed by and construed in
            accordance with the laws of government of Nepal. Any disputes
            relating to these terms and conditions shall be subject to the
            exclusive jurisdiction of the courts in Government of Nepal.
          </p>
        </div>

        <p className="mt-8 text-gray-600 text-sm">Last updated on 2024-02-17</p>
      </div>
    </div>
  );
};

export default Terms;
