// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { MainLayout } from '@/components/layout/main-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'BlogPlatform - Modern Blogging Made Simple',
	description: 'A modern, full-stack blogging platform built with Next.js, Supabase, and Prisma. Create, share, and discover amazing content.',
	keywords: ['blog', 'writing', 'nextjs', 'supabase', 'prisma'],
	authors: [{ name: 'BlogPlatform Team' }],
	openGraph: {
		title: 'BlogPlatform - Modern Blogging Made Simple',
		description: 'A modern, full-stack blogging platform built with Next.js, Supabase, and Prisma.',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	);
}