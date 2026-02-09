import { useState } from "react";

export const useActiveAccordion = () => {
  const [activeAccordion, setActiveAccordion] = useState("");
  return {
    activeAccordion,
    setActiveAccordion,
  };
};
