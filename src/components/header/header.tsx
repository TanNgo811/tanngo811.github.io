// src/components/custom/header.tsx
'use client';

import { HelpCircle, ChevronDown, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
	const router = useRouter();

	const handleLogout = async () => {
		await fetch('/api/auth/logout', { method: 'POST' });
		router.push('/');
	};

	return (
		<header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
			<div className="flex flex-1 justify-center px-4">
				<div className="relative w-full max-w-md">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<Input placeholder="Search..." className="pl-9" />
				</div>
			</div>

			<div className="flex flex-1 items-center justify-end gap-4">
				<Button variant="ghost" size="icon" className="text-gray-500">
					<HelpCircle className="h-6 w-6" />
				</Button>
				<Button variant="outline" className="gap-2">
					<span>Blog Platform</span>
					<ChevronDown className="h-4 w-4" />
				</Button>

				<div className="flex items-center gap-2">
					<Button asChild variant="outline">
						<Link href="/blog">Blog</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/dashboard">Dashboard</Link>
					</Button>
					<Button onClick={handleLogout} variant="outline">
						<LogOut className="mr-2 h-4 w-4" />
						Log out
					</Button>
				</div>
			</div>
		</header>
	);
}