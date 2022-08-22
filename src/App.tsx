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

type LayerContext = {
	activeLayer: Layer
	setActiveLayer: React.Dispatch<React.SetStateAction<Layer>>
}

type CategoryContext = {
	enabledCategories: Category[]
	setEnabledCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

type CanvasContext = {
	canvasIndex: number
	setCanvasIndex: React.Dispatch<React.SetStateAction<number>>
}

export const AnnotationContext = React.createContext<AnnotationContext>(null!)
export const LayerContext = React.createContext<LayerContext>(null!)
export const CategoryContext = React.createContext<CategoryContext>(null!)
export const CanvasContext = React.createContext<CanvasContext>(null!)

const defaultCategories = categoryModel.map(category => ({
	...category,
	enabled: category.enabledByDefault,
}))

function App() {
	const [activeAnnotations, setActiveAnnotations] =
		React.useState<AnnotationState>([])
	const [enabledCategories, setEnabledCategories] =
		React.useState<Category[]>(defaultCategories)
	const [activeLayer, setActiveLayer] = React.useState<Layer>("natural")
	const [canvasIndex, setCanvasIndex] = React.useState(0)

	const currentCanvasId = pages.items[canvasIndex].id

	const filteredAnnotations = hydratedAnnotations.filter(annotation => {
		const annotationIsOnCurrentCanvas =
			annotation.target.source === currentCanvasId
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
					<CanvasContext.Provider value={{ canvasIndex, setCanvasIndex }}>
						<CategoryContext.Provider
							value={{ enabledCategories, setEnabledCategories }}
						>
							<LayerContext.Provider
								value={{
									activeLayer,
									setActiveLayer,
								}}
							>
								<div className="window-content">
									<Viewer
										canvasIndex={canvasIndex}
										setCanvasIndex={setCanvasIndex}
										annotations={filteredAnnotations}
									/>
									<Panels annotations={filteredAnnotations} />
								</div>
							</LayerContext.Provider>
						</CategoryContext.Provider>
					</CanvasContext.Provider>
				</AnnotationContext.Provider>
			</Paper>
		</div>
	)
}

export default App
