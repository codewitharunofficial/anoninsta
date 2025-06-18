import { whyInsecView } from "../Utilities/WhyInsecView";
import React from "react";

const WhyInsecView = () => {
  return (
    <>

    <h3 className="w-auto text-2xl text-black text-center self-center p-2 underline underline-offset-2 font-serif font-bold" >Why InsecView?</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 max-h-40 gap-1 sm:text-center p-5">
      {whyInsecView.map((reason, index) => (
        <div className="p-2 text-center" key={reason.id} >
          <h3
            className="text-white underline underline-offset-2 font-serif font-bold p-1"
          >
            {reason.title}
          </h3>
          <p className="text-gray-200 text-lg" >{reason.description}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default WhyInsecView;
