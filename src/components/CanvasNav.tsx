import { SvgIcon, IconButton, Typography } from "@material-ui/core"
import pages from "../pages.json"

const total = pages.items.length

type CanvasNavProps = {
	canvasIndex: number
	setCanvasIndex: React.Dispatch<React.SetStateAction<number>>
}

function CanvasNav({ canvasIndex, setCanvasIndex }: CanvasNavProps) {
	function next() {
		if (canvasIndex + 1 < total) setCanvasIndex(prev => prev + 1)
	}
	function prev() {
		if (canvasIndex > 0) setCanvasIndex(prev => prev - 1)
	}
	return (
		<nav className="folio-nav">
			<div>
				<IconButton
					disabled={canvasIndex <= 0}
					onClick={prev}
					aria-label="Vorig item"
				>
					<SvgIcon style={{ transform: "rotate(180deg)" }}>
						<path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
					</SvgIcon>
				</IconButton>
				<IconButton
					disabled={canvasIndex + 1 >= total}
					onClick={next}
					aria-label="Volgend item"
				>
					<SvgIcon>
						<path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
					</SvgIcon>
				</IconButton>
			</div>
			<Typography variant="body2">
				{canvasIndex + 1} van {total}
			</Typography>
		</nav>
	)
}

export default CanvasNav
