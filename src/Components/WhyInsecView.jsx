import { whyInsecView } from "@/Utilities/WhyInsecView";
import React from "react";

const WhyInsecView = () => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 max-h-40 gap-6 sm:text-center p-5">
      {whyInsecView.map((reason, index) => (
        <div className="p-2 text-center border rounded-md" key={reason.id} >
          <li
            className="text-white underline underline-offset-2 font-serif font-bold p-1"
          >
            {reason.title}
          </li>
          <p className="text-gray-200 text-lg" >{reason.description}</p>
        </div>
      ))}
    </ul>
  );
};

export default WhyInsecView;
