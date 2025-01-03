import React from "react";
import { useSpring, animated } from "react-spring";
import {
  Truck,
  CalendarCheck2,
  WalletCards,
  Banknote,
  CheckCircle,
} from "lucide-react";
import Stepper from "@mui/material/Stepper";
import { Step, StepLabel } from "@mui/material";
import { RiSecurePaymentLine } from "react-icons/ri"; 

function CheckOutSteps({ activeStep }) {
  const steps = [
    {
      label: <div>Shipping Details</div>,
      icon: <Truck />,
    },
    {
      label: <div>Confirm Order</div>,
      icon: <CalendarCheck2 />,
    },
    {
      label: <div>Payment Method</div>,
      icon: <Banknote />,
    },
    {
      label: <div>Status</div>,
      icon: <CheckCircle />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  const fadeProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={{ ...fadeProps, maxWidth: 1300, margin: "0 auto" }}>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{ color: activeStep >= index ? "red" : "black" }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </animated.div>
  );
}

export default CheckOutSteps;
