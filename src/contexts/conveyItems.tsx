import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { ConveyItem } from "../types/game";

type ConveyItemsContextType = {
  conveyItems: ConveyItem[];
  setConveyItems: Dispatch<SetStateAction<ConveyItem[]>>;
};

const ConveyItemsContext = createContext<ConveyItemsContextType | undefined>(undefined);

export const ConveyItemsProvider = ({ children }: { children: ReactNode }) => {
  const [conveyItems, setConveyItems] = useState<ConveyItem[]>([]);

  return (
    <ConveyItemsContext.Provider value={{ conveyItems, setConveyItems }}>
      {children}
    </ConveyItemsContext.Provider>
  );
};

export const useConveyItems = () => {
  const context = useContext(ConveyItemsContext);

  if (!context) {
    throw new Error("useConveyItems must be used within a ConveyItemsProvider");
  }

  return context;
};
