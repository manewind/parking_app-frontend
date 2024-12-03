import React, { useEffect, useState } from "react";
import DownloadInfo from "./downloadInfo";
import Features from "./features";
import BookingSection from "./bookingSection";
import ReviewsSection from "./reviewSection";

const Main = () => {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMain(true);
    }, 200);
  }, []);

  return (
    <div
      className={`transition-all duration-1000 transform ${
        showMain ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <DownloadInfo />
      <Features />
      <ReviewsSection /> 
      <BookingSection />
    </div>
  );
};

export default Main;
