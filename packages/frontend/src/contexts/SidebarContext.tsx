import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
interface SidebarContext {
    sidebarToggle: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}

/* eslint-disable-next-line @typescript-eslint/no-redeclare */
export const SidebarContext = createContext<SidebarContext>({} as SidebarContext);

interface Props {
    children: ReactNode;
}

export function SidebarProvider({ children }: Props) {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const toggleSidebar = () => {
        setSidebarToggle(!sidebarToggle);
    };

    const closeSidebar = () => {
        setSidebarToggle(false);
    };

    return (
        <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar, closeSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}
