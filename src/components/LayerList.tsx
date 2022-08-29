import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import pages from "../pages.json"

type LayerListProps = {
	viewState: ViewState
}

function LayerList({ viewState }: LayerListProps) {
	const [view, setView] = viewState
	const layersOnThisPage = pages.items[view.pageIndex].body?.items || []

	if (layersOnThisPage.length) {
		function handleChange(value: string) {
			setView(prev => ({
				...prev,
				layerIndex: parseInt(value),
			}))
		}

		return (
			<div className="layer-list">
				<FormControl component="fieldset">
					<RadioGroup
						aria-label="layers"
						name="layer"
						value={view.layerIndex}
						onChange={e => handleChange(e.target.value)}
					>
						{layersOnThisPage.length ? (
							layersOnThisPage.map((layer, i) => (
								<FormControlLabel
									value={i}
									control={<Radio color="primary" />}
									label={layer.label.en[0]}
								/>
							))
						) : (
							<FormControlLabel
								value="default"
								control={<Radio color="primary" />}
								label="Default"
							/>
						)}
					</RadioGroup>
				</FormControl>
			</div>
		)
	} else {
		return (
			<div className="layer-list">
				<FormControl component="fieldset" disabled>
					<RadioGroup aria-label="layers" name="layer" value="default">
						<FormControlLabel
							value="default"
							control={<Radio color="primary" />}
							label="Default"
						/>
					</RadioGroup>
				</FormControl>
			</div>
		)
	}
}

export default LayerList
