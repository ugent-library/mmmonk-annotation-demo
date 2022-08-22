import PaletteIcon from "@material-ui/icons/PaletteSharp"
import ImageIcon from "@material-ui/icons/ImageSharp"
import TextFieldsIcon from "@material-ui/icons/TextFieldsSharp"
import LayersIcon from "@material-ui/icons/LayersSharp"

export const categoryModel = [
	{
		id: "iconography",
		name: "Iconography",
		icon: ImageIcon,
		enabledByDefault: true,
	},
	{
		id: "pigments",
		name: "Pigments",
		icon: PaletteIcon,
		enabledByDefault: true,
	},
	{
		id: "transcriptions",
		name: "Transcriptions",
		icon: TextFieldsIcon,
		enabledByDefault: true,
	},
	{
		id: "material",
		name: "Material technical information",
		icon: LayersIcon,
		enabledByDefault: true,
	},
] as const
