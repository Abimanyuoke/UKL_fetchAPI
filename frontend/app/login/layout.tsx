// Di layout.tsx atau paling atas di komponen
import { Toaster } from 'sonner';

import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <Toaster position="top-right" richColors />
                {children}
            </body>
        </html>
    );
}
