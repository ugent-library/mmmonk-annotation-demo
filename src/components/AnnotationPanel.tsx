import {
	Typography,
	Divider,
	Grid,
	Link,
	SvgIcon,
	IconButton,
} from "@material-ui/core"
import LockOpenSharp from "@material-ui/icons/LockOpenSharp"
import LockSharp from "@material-ui/icons/LockSharp"
import CloseIcon from "@material-ui/icons/Close"
import AnnotationBody from "./AnnotationBody"
import { hydratedAnnotations } from "../data"
import { useAnnotations } from "../hooks/useAnnotations"

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-UK", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

type AnnotationPanelProps = {
	annotation: HydratedAnnotation
}

function AnnotationPanel({ annotation }: AnnotationPanelProps) {
	const { activeAnnotations, closeAnnotation, togglePinAnnotation } =
		useAnnotations()

	const currentPanel = activeAnnotations.find(
		panel => panel.id === annotation.id
	)
	const isPinned = currentPanel?.pinned

	return (
		<article className="anno-panel anno-panel-article">
			<div className="anno-panel-top">
				<header>
					<Grid
						container
						spacing={1}
						alignItems="center"
						justifyContent="space-between"
					>
						<Grid item>
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
						</Grid>
						<Grid item>
							<nav>
								<IconButton
									size="small"
									type="button"
									onClick={() => togglePinAnnotation(annotation.id)}
									aria-label={
										isPinned ? "Annotation is pinned" : "Pin annotation"
									}
								>
									{isPinned ? <LockSharp /> : <LockOpenSharp />}
								</IconButton>
								<IconButton
									size="small"
									type="button"
									onClick={() => closeAnnotation(annotation.id)}
									aria-label="Close this annotation"
								>
									<CloseIcon />
								</IconButton>
							</nav>
						</Grid>
					</Grid>
					<div className="anno-top-meta">
						<Typography variant="body2">
							Annotated by <Link href="#">{annotation.creator.name}</Link> on{" "}
							{formatDate(annotation.created)}
						</Typography>
					</div>
				</header>
				<main>
					<AnnotationBody body={annotation.body} />
					{annotation.crossReferences?.length ? (
						<CrossReferences refs={annotation.crossReferences} />
					) : null}
				</main>
			</div>
			<div>
				<Divider />
				<footer className="anno-panel-meta">
					<table>
						<tbody>
							<tr>
								<th scope="row">
									<Typography variant="body2">Annotated by</Typography>
								</th>
								<td>
									<Typography variant="body2">
										{annotation.creator.name}
									</Typography>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<Typography variant="body2">Created on</Typography>
								</th>
								<td>
									<Typography variant="body2">
										{formatDate(annotation.created)}
									</Typography>
								</td>
							</tr>
						</tbody>
					</table>
				</footer>
			</div>
		</article>
	)
}

export default AnnotationPanel

function CrossReferences({ refs }: { refs: { id: string }[] }) {
	const { activateAnnotation } = useAnnotations()
	const hydratedRefs = refs.map(ref =>
		hydratedAnnotations.find(anno => anno.id === ref.id)
	)
	return (
		<section className="cross-references">
			<h1>See also</h1>
			<ul>
				{hydratedRefs.map(ref => {
					if (ref === undefined) {
						throw new Error("Cross-reference does not exist in annotations")
					} else {
						return (
							<li key={ref.id}>
								<button onClick={() => activateAnnotation(ref.id)}>
									<Grid
										container
										spacing={1}
										alignItems="center"
										justifyContent="space-between"
									>
										<Grid item>
											<Typography>Annotation</Typography>
										</Grid>
										<Grid item>
											<Grid item>
												<Typography
													variant="overline"
													className="anno-overline"
												>
													in {ref.category.name}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</button>
							</li>
						)
					}
				})}
			</ul>
		</section>
	)
}
