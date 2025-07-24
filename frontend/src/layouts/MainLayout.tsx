import React, { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface MainLayoutProps {
    children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navigation />
            </header>
            <main className="flex-1 flex flex-col justify-center">
                {children ? children : <Outlet />}
            </main>
            {/* <footer className="bg-stone-800 text-center py-4">
                footer
            </footer> */}
        </div>
    );
};