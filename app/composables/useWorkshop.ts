import type { Workshop } from "~/types";
import { MOCK_WORKSHOP } from "./mockData";

const useWorkshops = () => {
  const workshop = ref<Workshop>(MOCK_WORKSHOP);

  return {
    workshop,
  };
};

export { useWorkshops };
