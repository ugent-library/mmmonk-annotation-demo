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

const defaultView = {
	pageIndex: 0,
	layerIndex: 0,
}

function App() {
	const [activeAnnotations, setActiveAnnotations] =
		React.useState<AnnotationState>([])

	const viewState = React.useState<View>(defaultView)
	const [view] = viewState
	const pageId = pages.items[view.pageIndex].id

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
						<Viewer viewState={viewState} annotations={filteredAnnotations} />
						<Panels
							viewState={viewState}
							annotations={filteredAnnotations}
							pageId={pageId}
							categoryState={categoryState}
						/>
					</div>
				</AnnotationContext.Provider>
			</Paper>
		</div>
	)
}

export default App
