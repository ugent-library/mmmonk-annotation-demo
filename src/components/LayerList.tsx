import { useContext } from "react"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import { LayerContext } from "../App"

function LayerSection() {
	const { activeLayer, setActiveLayer } = useContext(LayerContext)

	function handleChange(value: string) {
		if (value === "natural" || value === "infrared") {
			setActiveLayer(value)
		}
	}

	return (
		<div className="layer-list">
			<FormControl component="fieldset">
				<RadioGroup
					aria-label="layers"
					name="layer"
					value={activeLayer}
					onChange={e => handleChange(e.target.value)}
				>
					<FormControlLabel
						value="natural"
						control={<Radio color="primary" />}
						label="Natural light"
					/>
					<FormControlLabel
						value="infrared"
						control={<Radio color="primary" />}
						label="Infrared"
					/>
				</RadioGroup>
			</FormControl>
		</div>
	)
}

export default LayerSection
