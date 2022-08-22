import parse, { domToReact, attributesToProps } from "html-react-parser"
import pages from "../pages.json"
import { useAnnotations } from "../hooks/useAnnotations"
import FolioNav from "./CanvasNav"

type ViewerProps = {
	canvasIndex: number
	setCanvasIndex: React.Dispatch<React.SetStateAction<number>>
	annotations: HydratedAnnotation[]
}

function Viewer({ canvasIndex, setCanvasIndex, annotations }: ViewerProps) {
	const currentCanvas = pages.items[canvasIndex]
	const { src } = currentCanvas.body

	return (
		<div className="viewport">
			<svg
				version="1.1"
				width="100%"
				height="100%"
				viewBox="0 0 3999 2760"
				xmlns="http://www.w3.org/2000/svg"
				className="canvas"
			>
				<image width="100%" height="100%" href={src} />
				<Targets annotations={annotations} />
			</svg>
			<FolioNav canvasIndex={canvasIndex} setCanvasIndex={setCanvasIndex} />
		</div>
	)
}
export default Viewer

type TargetsProps = {
	annotations: HydratedAnnotation[]
}

function Targets({ annotations }: TargetsProps) {
	const targets = annotations.map(function (annotation) {
		if (annotation.target.selector.type === "SvgSelector") {
			return <Target key={annotation.id} annotation={annotation} />
		}
	})

	return <>{targets}</>
}

type TargetProps = {
	annotation: HydratedAnnotation
}

function Target({ annotation }: TargetProps) {
	if (annotation.target) {
		const { activateAnnotation, activeAnnotations } = useAnnotations()
		const isActive = activeAnnotations.find(anno => anno.id === annotation.id)
		const options = {
			replace: (domNode: any) => {
				const isValidNode = domNode.name === "svg" && domNode.children.length
				if (isValidNode) {
					const props = attributesToProps(domNode.attribs)
					return (
						<svg
							{...props}
							className={isActive ? "selector highlight" : "selector"}
							onClick={() => activateAnnotation(annotation.id)}
						>
							{domToReact(domNode.children)}
						</svg>
					)
				}
			},
		}
		return <>{parse(annotation.target.selector.value, options)}</>
	} else return null
}
