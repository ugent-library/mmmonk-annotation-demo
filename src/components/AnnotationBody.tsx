function AnnotationBody({
	body,
	preview = false,
}: {
	body: AnnotationBody
	preview?: boolean
}) {
	const { format, value } = body
	switch (format) {
		case "text/plain":
			return (
				<div className="format-plain">
					<p>{value}</p>
				</div>
			)
		case "text/html":
			const html = preview
				? // Remove images, links and bibliography from preview
				  value
						.replace(/<img .*?>/g, "")
						.replace(/<a[^>]*>|<\/a>/g, "")
						.replace(/<section role="doc-bibliography">.*?<\/section>/g, "")
				: value
			return (
				<div
					className="format-html"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			)
	}
}

export default AnnotationBody
