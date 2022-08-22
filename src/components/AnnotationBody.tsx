function AnnotationBody({ body }: { body: AnnotationBody }) {
	const { format, value } = body
	switch (format) {
		case "text/plain":
			return (
				<div className="format-plain">
					<p>{value}</p>
				</div>
			)
		case "text/html":
			return (
				<div
					className="format-html"
					dangerouslySetInnerHTML={{ __html: value }}
				/>
			)
	}
}

export default AnnotationBody
