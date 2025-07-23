import React, { type ReactNode } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

interface MainLayoutProps {
    children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <ChakraProvider value={defaultSystem}>
            <header>
                <Navigation />
            </header>
            <main>
                {children ? children : <Outlet />}
            </main>
            <footer>
                footer
            </footer>
        </ChakraProvider>
    );
};