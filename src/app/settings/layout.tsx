// src/app/(dashboard)/layout.tsx
import Aside from '@/components/aside/aside';
import Header from '@/components/header/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50/50">
            <Aside />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}