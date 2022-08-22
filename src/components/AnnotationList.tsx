import { useContext } from "react"
import {
	Grid,
	List,
	ListItem,
	Typography,
	Divider,
	SvgIcon,
} from "@material-ui/core"
import AnnotationBody from "../components/AnnotationBody"
import { CategoryContext } from "../App"
import { useAnnotations } from "../hooks/useAnnotations"

function AnnotationList({
	annotations,
}: {
	annotations: HydratedAnnotation[]
}) {
	const { enabledCategories } = useContext(CategoryContext)
	const filteredAnnotations = annotations.filter(
		annotation =>
			enabledCategories.find(category => category.id === annotation.category.id)
				?.enabled
	)
	return (
		<List>
			{filteredAnnotations.map((annotation, i) => (
				<AnnotationItem annotation={annotation} key={annotation.id} />
			))}
		</List>
	)
}
export default AnnotationList

function AnnotationItem({ annotation }: { annotation: HydratedAnnotation }) {
	const { activeAnnotations, activateAnnotation } = useAnnotations()
	const isOpen = activeAnnotations.find(anno => anno.id === annotation.id)
	return (
		<>
			<ListItem
				button
				onClick={() => activateAnnotation(annotation.id)}
				className={
					isOpen ? "anno-card anno-card-open" : "anno-card anno-card-closed"
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
								<AnnotationBody body={annotation.body} />
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
									{isOpen ? "Geopend" : "Bekijk details"}
								</Typography>
							</footer>
						</Grid>
					</Grid>
				</article>
			</ListItem>
			<Divider />
		</>
	)
}
