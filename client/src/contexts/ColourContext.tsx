import { createContext, useContext, ReactNode } from "react";
import { generateColour } from "@/utils/colourUtils";

interface ColourContextType {
    getNextColour: () => string;
}

const ColourContext = createContext<ColourContextType | undefined>(undefined);

export function ColourProvider({ children }: { children: ReactNode }) {
    const value = {
        getNextColour: generateColour,
    };

    return (
        <ColourContext.Provider value={value}>
            {children}
        </ColourContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useColourProvider = () => {
    const context = useContext(ColourContext);
    if (!context) {
        throw new Error("useColour must be used within a ColourProvider");
    }
    return context;
};
