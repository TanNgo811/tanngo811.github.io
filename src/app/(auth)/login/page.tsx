// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HelpCircle, Eye, EyeOff, Fingerprint, Building } from 'lucide-react';
import { loginCognito } from '@/data-access/auth/auth.api';
import { useAuthStore } from '@/data-access/app.state';

export default function LoginPage() {
	const router = useRouter();
	const setUser = useAuthStore((state) => state.setUser);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (email && password) {
			loginCognito({
				email,
				password,
			}).then((user) => {
				setUser(user);
                router.push('/dashboard');
			});
		} else {
			alert('Please enter email and password.');
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-2xl">Log in</CardTitle>
							<HelpCircle className="h-5 w-5 text-gray-400" />
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<form onSubmit={handleLogin} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<Button
										onClick={() => setShowPassword(!showPassword)}
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400"
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>
							<Button type="submit" className="w-full">LOG IN</Button>
						</form>
						{/* Separator and other login buttons */}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}