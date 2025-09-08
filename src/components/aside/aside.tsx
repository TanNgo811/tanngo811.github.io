'use client';
import {
	LayoutDashboard,
	PenSquare,
	Send,
	Circle,
	ShieldCheck,
	ClipboardCheck,
	FileBox,
	Search,
	BookMarked,
	type LucideIcon,
	Globe,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/features/ui/components/dropdown-menu';

type NavLink = {
	icon: LucideIcon;
	name: string;
	count?: number;
	active?: boolean;
};

const navLinks: NavLink[] = [
	{ icon: LayoutDashboard, name: 'Dashboard', active: true },
	{ icon: PenSquare, name: 'SIGNER', count: 56 },
	{ icon: Send, name: 'SENDER', count: 24 },
	{ icon: Circle, name: 'CIRCLE', count: 11 },
	{ icon: ShieldCheck, name: 'VERIFICATION', count: 19 },
	{ icon: ClipboardCheck, name: 'EVALUATION' },
	{ icon: FileBox, name: 'FILEBOX' },
	{ icon: Search, name: 'SeARCH' },
];

export default function Aside() {
	return (
		<aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
			<div className="h-16 flex items-center px-6 border-b border-gray-200">
				{/* SVG Logo */}
			</div>
			<nav className="flex-1 p-4 space-y-2">
				{navLinks.map((link) => (
					<Link
						key={link.name}
						href="#"
						className={cn(
							'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100',
							link.active && 'bg-blue-50 text-blue-700'
						)}
					>
						<div className="flex items-center gap-3">
							<link.icon className="h-5 w-5" />
							<span>{link.name}</span>
						</div>
						{link.count && <span className="text-xs text-gray-500">{link.count}</span>}
					</Link>
				))}
				<hr className="my-4" />
				<Link
					href="#"
					className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
				>
					<BookMarked className="h-5 w-5" />
					<span>インボイス制度</span>
				</Link>
			</nav>
			<div className="p-4 mt-auto text-xs text-gray-500 border-t border-gray-200">
				<div className="gap-4 mb-2">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div
								className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
							>
								<Globe className="h-5 w-5" />
								<span className="text-[14px]">LANGUAGE</span>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-48" align='start'>
							<DropdownMenuItem onClick={() => {}}>
								<span>Japanese</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => {}}>
								<span>English</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="flex gap-2 mt-2 px-3">
						<a href="/terms" className="hover:underline">Terms</a>
						<a href="/contact" className="hover:underline">Contact</a>
					</div>
				</div>
				<p>© 2025 paperlogic co., ltd.</p>
			</div>
		</aside>
	);
}