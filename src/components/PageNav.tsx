import { SvgIcon, IconButton, Typography } from "@material-ui/core"
import { useAnnotations } from "../hooks/useAnnotations"
import pages from "../pages.json"

const total = pages.items.length

type PageNavProps = {
	viewState: ViewState
}

function PageNav({ viewState }: PageNavProps) {
	const [view, setView] = viewState
	const { pageIndex } = view

	const { closeAllExceptPinnedAnnotations } = useAnnotations()
	function next() {
		closeAllExceptPinnedAnnotations()
		if (pageIndex + 1 < total)
			setView(prev => ({
				pageIndex: prev.pageIndex + 1,
				layerIndex: 0,
			}))
	}
	function prev() {
		closeAllExceptPinnedAnnotations()
		if (pageIndex > 0)
			setView(prev => ({
				pageIndex: prev.pageIndex - 1,
				layerIndex: 0,
			}))
	}
	return (
		<nav className="folio-nav">
			<div>
				<IconButton
					disabled={pageIndex <= 0}
					onClick={prev}
					aria-label="Previous item"
				>
					<SvgIcon style={{ transform: "rotate(180deg)" }}>
						<path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
					</SvgIcon>
				</IconButton>
				<IconButton
					disabled={pageIndex + 1 >= total}
					onClick={next}
					aria-label="Next item"
				>
					<SvgIcon>
						<path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
					</SvgIcon>
				</IconButton>
			</div>
			<Typography variant="body2">
				{pageIndex + 1} of {total}
			</Typography>
		</nav>
	)
}

export default PageNav
