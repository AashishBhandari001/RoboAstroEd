import React from "react";
import { Helmet } from "react-helmet"; // Importing Helmet

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title> {title} </title>
    </Helmet>
  );
};

export default MetaData;
