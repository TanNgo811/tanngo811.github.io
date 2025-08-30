// src/components/custom/header.tsx
'use client';

import { useUserStore } from '@/lib/store';
import { HelpCircle, ChevronDown, Search, User, LogOut } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function Header() {
	const { user, setUser } = useUserStore();

	const handleLogout = () => {
		setUser(null);
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
					<span>321312312He3213llo13</span>
					<ChevronDown className="h-4 w-4" />
				</Button>

				{user ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="flex items-center gap-2 text-sm focus-visible:ring-0">
								<div className="text-right">
									<div className="font-semibold text-gray-800">{user.name}</div>
									<div className="text-xs text-gray-500">{user.company}</div>
								</div>
								<div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
									<span>{user.initials}</span>
								</div>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-48">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="#"><User className="mr-2 h-4 w-4" /><span>Profile</span></Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Button asChild variant="outline">
						<Link href="/login">Log In</Link>
					</Button>
				)}
			</div>
		</header>
	);
}