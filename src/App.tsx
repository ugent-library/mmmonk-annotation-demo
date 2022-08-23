import React from "react"
import Paper from "@material-ui/core/Paper"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { categoryModel } from "./config"
import { hydratedAnnotations } from "./data"
import pages from "./pages.json"
import Panels from "./components/Panels"
import Viewer from "./components/Viewer"
import "@fontsource/roboto"

type AnnotationContext = {
	activeAnnotations: AnnotationState
	setActiveAnnotations: React.Dispatch<React.SetStateAction<AnnotationState>>
}

export const AnnotationContext = React.createContext<AnnotationContext>(null!)

const defaultCategories = categoryModel.map(category => ({
	...category,
	enabled: category.enabledByDefault,
}))

function App() {
	const [activeAnnotations, setActiveAnnotations] =
		React.useState<AnnotationState>([])

	const pageIndexState = React.useState<number>(0)
	const [pageIndex] = pageIndexState
	const pageId = pages.items[pageIndex].id

	const layerState = React.useState<Layer>("natural")

	const categoryState = React.useState<Category[]>(defaultCategories)
	const [enabledCategories] = categoryState

	const filteredAnnotations = hydratedAnnotations.filter(annotation => {
		const annotationIsOnCurrentCanvas = annotation.target.source === pageId
		const annotationIsFromEnabledCategory = enabledCategories.find(
			cat => cat.id === annotation.category.id
		)?.enabled
		return annotationIsOnCurrentCanvas && annotationIsFromEnabledCategory
	})

	return (
		<div className="app">
			<Paper component="main" square elevation={1} className="window">
				<AppBar position="relative" color="default">
					<Toolbar variant="dense" className="top-toolbar">
						<Typography variant="h6">Liber floridus</Typography>
					</Toolbar>
				</AppBar>
				<AnnotationContext.Provider
					value={{ activeAnnotations, setActiveAnnotations }}
				>
					<div className="window-content">
						<Viewer
							pageIndexState={pageIndexState}
							annotations={filteredAnnotations}
						/>
						<Panels
							annotations={filteredAnnotations}
							pageId={pageId}
							layerState={layerState}
							categoryState={categoryState}
						/>
					</div>
				</AnnotationContext.Provider>
			</Paper>
		</div>
	)
}

export default App
