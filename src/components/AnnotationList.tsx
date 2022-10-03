import { Grid, Typography, Divider, SvgIcon } from "@material-ui/core"
import AnnotationBody from "../components/AnnotationBody"
import { useAnnotations } from "../hooks/useAnnotations"

function AnnotationList({
	annotations,
	categoryState,
}: {
	annotations: HydratedAnnotation[]
	categoryState: CategoryState
}) {
	const [enabledCategories] = categoryState
	const filteredAnnotations = annotations.filter(
		annotation =>
			enabledCategories.find(category => category.id === annotation.category.id)
				?.enabled
	)
	return (
		<ul className="anno-cards">
			{filteredAnnotations.map((annotation, i) => (
				<AnnotationItem annotation={annotation} key={annotation.id} />
			))}
		</ul>
	)
}
export default AnnotationList

function AnnotationItem({ annotation }: { annotation: HydratedAnnotation }) {
	const { activeAnnotations, activateAnnotation } = useAnnotations()
	const isActive = activeAnnotations.find(anno => anno.id === annotation.id)
	return (
		<>
			<li data-annotation-id={annotation.id}>
				<button
					onClick={() => !isActive && activateAnnotation(annotation.id, false)}
					className={
						isActive ? "anno-card anno-card-open" : "anno-card anno-card-closed"
					}
				>
					<article>
						<Grid container direction="column" spacing={1}>
							<Grid item>
								<header>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<SvgIcon
												component={annotation.category.icon}
												fontSize="inherit"
												className="anno-icon"
											/>
										</Grid>
										<Grid item>
											<Typography variant="overline" className="anno-overline">
												{annotation.category.name}
											</Typography>
										</Grid>
									</Grid>
								</header>
							</Grid>
							<Grid item>
								<main>
									<AnnotationBody body={annotation.body} preview />
								</main>
							</Grid>
							<Grid item>
								<footer>
									<Typography
										variant="body2"
										style={{
											color: "var(--color-muted)",
											fontSize: 12,
										}}
									>
										{isActive ? "Opened" : "View details"}
									</Typography>
								</footer>
							</Grid>
						</Grid>
					</article>
				</button>
			</li>
			<Divider />
		</>
	)
}
