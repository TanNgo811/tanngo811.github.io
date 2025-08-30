export function DocumentDetailPage({ params }: { params: { slug: string } }) {
	return (
		<div>
			<h1 className="text-2xl font-bold">Document Detail - {params.slug}</h1>
			{/* Document detail content goes here */}
		</div>
	);
}
