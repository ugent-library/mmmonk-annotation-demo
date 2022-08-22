import PaletteIcon from "@material-ui/icons/PaletteSharp"
import ImageIcon from "@material-ui/icons/ImageSharp"
import TextFieldsIcon from "@material-ui/icons/TextFieldsSharp"
import LayersIcon from "@material-ui/icons/LayersSharp"

export const categoryModel = [
	{
		id: "iconography",
		name: "Iconografie",
		icon: ImageIcon,
		enabledByDefault: true,
	},
	{
		id: "pigments",
		name: "Pigmenten",
		icon: PaletteIcon,
		enabledByDefault: true,
	},
	{
		id: "transcriptions",
		name: "Tekst-transcripties",
		icon: TextFieldsIcon,
		enabledByDefault: true,
	},
	{
		id: "material",
		name: "Materiaal-technische informatie",
		icon: LayersIcon,
		enabledByDefault: true,
	},
] as const
