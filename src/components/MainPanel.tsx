import { ReactNode, useState } from "react"
import LayerList from "./LayerList"
import CategoryList from "./CategoryList"
import AnnotationList from "./AnnotationList"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { withStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import MuiAccordion from "@material-ui/core/Accordion"
import MuiAccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"

function MainPanel({ annotations }: { annotations: HydratedAnnotation[] }) {
	return (
		<>
			<Section heading="Lagen" closedByDefault>
				<LayerList />
			</Section>
			<Section heading="Categorieën">
				<CategoryList annotations={annotations} />
			</Section>
			<Section heading="Annotaties">
				<AnnotationList annotations={annotations} />
			</Section>
		</>
	)
}

export default MainPanel

type SectionProps = {
	heading: string
	children: ReactNode
	closedByDefault?: boolean
}

function Section({ heading, children, closedByDefault = false }: SectionProps) {
	const [expanded, setExpanded] = useState(!closedByDefault)
	return (
		<Accordion square expanded={expanded}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				onClick={() => setExpanded(!expanded)}
			>
				<Typography style={{ fontWeight: "600" }}>{heading}</Typography>
			</AccordionSummary>
			<AccordionDetails style={{ padding: 0, display: "block" }}>
				{children}
			</AccordionDetails>
		</Accordion>
	)
}

const Accordion = withStyles({
	root: {
		border: "none",
		borderRadius: 0,
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: "1px solid rgba(0, 0, 0, .38)",
		},
		"&$expanded": {
			margin: "auto",
		},
	},
	expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
	root: {
		margin: 0,
		minHeight: 56,
		"&$expanded": {
			margin: 0,
			minHeight: 56,
		},
	},
	content: {
		"&$expanded": {
			margin: "0",
		},
	},
	expanded: {},
})(MuiAccordionSummary)
