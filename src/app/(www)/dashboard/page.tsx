// src/app/(dashboard)/page.tsx
import {
	Circle,
	ShieldCheck,
	FileBox,
	Search,
	Check,
	CheckCircle2,
	HardDrive,
	FolderGit2,
	PenSquare,
	Send,
	UserCheck,
	UserX,
} from 'lucide-react';

export default function DashboardPage() {
	return (
		<div className="space-y-8 bg-white p-6 rounded-lg shadow-sm">
			<h1 className="text-xl font-semibold text-gray-800">321312312He3213llo13</h1>

			{/* Tenant Info */}
			<div className="space-y-4 rounded-md border border-gray-200 bg-gray-50/80 p-6 text-sm">
				{/* ... JSX for Tenant Info grid ... */}
			</div>

			{/* PDF Summary */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold text-gray-800">PDF Summary</h2>
				<div className="grid grid-cols-4 divide-x divide-gray-200">
					{/* <VerticalStatCard icon={SignerIcon} title="SIGNER" value="3576" iconColor="text-blue-600" />
					<VerticalStatCard icon={SenderIcon} title="SENDER" value="850" iconColor="text-blue-600" />
					<VerticalStatCard icon={Circle} title="CIRCLE" value="221" iconColor="text-orange-500" />
					<VerticalStatCard
						icon={ShieldCheck}
						title="VERIFICATION"
						value="1933"
						iconColor="text-green-600"
					/> */}
				</div>
			</div>

			{/* Capacity Used */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold text-gray-800">Capacity Used</h2>
				<div className="grid grid-cols-6 divide-x divide-gray-200">
                    {/* ... JSX for VerticalStatCards ... */}
				</div>
			</div>
		</div>
	);
}