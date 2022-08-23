import React from "react"
import { Rnd } from "react-rnd"
import MainPanel from "./MainPanel"
import AnnotationPanel from "./AnnotationPanel"
import { hydratedAnnotations } from "../data"
import { useAnnotations } from "../hooks/useAnnotations"

type PanelsProps = {
	annotations: HydratedAnnotation[]
	pageId: string
	layerState: LayerState
	categoryState: CategoryState
}

function Panels({
	annotations,
	pageId,
	layerState,
	categoryState,
}: PanelsProps) {
	const { activeAnnotations } = useAnnotations()

	return (
		<PanelArea>
			<MainPanel
				annotations={annotations}
				pageId={pageId}
				layerState={layerState}
				categoryState={categoryState}
			/>
			{activeAnnotations.map(activeAnnotation => {
				const hydratedAnnotation = hydratedAnnotations.find(
					({ id }) => id === activeAnnotation.id
				)
				return hydratedAnnotation ? (
					<AnnotationPanel
						key={activeAnnotation.id}
						annotation={hydratedAnnotation}
					/>
				) : null
			})}
		</PanelArea>
	)
}

function PanelArea({ children }: { children: React.ReactNode }) {
	const arrayChildren = React.Children.toArray(children)
	return (
		<div className="panel-area">
			{React.Children.map(arrayChildren, child => (
				<ResizablePanel>
					{React.cloneElement(child as React.ReactElement)}
				</ResizablePanel>
			))}
		</div>
	)
}

export default Panels

function ResizablePanel({ children }: { children: React.ReactNode }) {
	return (
		<Rnd
			style={{ position: "relative" }}
			disableDragging
			enableResizing={{ left: true }}
			minWidth={200}
			className="panel"
			// @ts-ignore
			default={{
				width: 400,
			}}
		>
			{children}
		</Rnd>
	)
}
