import { useContext } from "react"
import {
	Grid,
	Checkbox,
	Typography,
	SvgIcon,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
} from "@material-ui/core"
import { categoryModel } from "../config"
import { CategoryContext } from "../App"
import { hydratedAnnotations as allAnnotations } from "../data"

type CategoryItem = Category & {
	occurencesInManifest: number
	occurencesOnCanvas: number
}

function CategoryList({ annotations }: { annotations: HydratedAnnotation[] }) {
	const categories: CategoryItem[] = categoryModel.map(category => {
		return {
			...category,
			occurencesInManifest: allAnnotations.filter(
				annotation => annotation.category.id === category.id
			).length,
			occurencesOnCanvas: annotations.filter(
				annotation => annotation.category.id === category.id
			).length,
		}
	})

	const { enabledCategories, setEnabledCategories } =
		useContext(CategoryContext)

	function toggleAllCategories() {
		setEnabledCategories(prev =>
			prev.map(category => ({
				...category,
				enabled: allCategoriesState !== "all",
			}))
		)
	}

	function calculateAllCategoriesState() {
		if (enabledCategories.every(category => !category.enabled)) {
			return "none"
		} else if (enabledCategories.every(category => category.enabled)) {
			return "all"
		} else {
			return "some"
		}
	}

	const allCategoriesState = calculateAllCategoriesState()

	return (
		<div className="category-list">
			<FormControl component="fieldset">
				<FormLabel hidden component="legend">
					Categorieën
				</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								indeterminate={allCategoriesState === "some"}
								checked={allCategoriesState === "all"}
								onChange={toggleAllCategories}
								name="all"
							/>
						}
						label="Alle categorieën"
					/>
					{categories.map(category => (
						<Item category={category} key={category.id} />
					))}
				</FormGroup>
			</FormControl>
		</div>
	)
}

export default CategoryList

type ItemProps = {
	category: CategoryItem
}

function Item({ category }: ItemProps) {
	const { enabledCategories, setEnabledCategories } =
		useContext(CategoryContext)

	const isEnabled = enabledCategories.find(
		({ id }) => id === category.id
	)?.enabled

	function toggleCategory() {
		setEnabledCategories(existingEnabledCategories =>
			existingEnabledCategories.map(cat =>
				cat.id === category.id ? { ...cat, enabled: !isEnabled } : cat
			)
		)
	}

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					checked={isEnabled}
					onChange={toggleCategory}
					name={category.id}
				/>
			}
			label={
				<Grid container spacing={1}>
					<Grid item>
						<SvgIcon
							component={category.icon}
							fontSize="inherit"
							color="action"
						/>
					</Grid>
					<Grid item>
						<Grid container alignItems="baseline" spacing={1}>
							<Grid item>
								<Typography variant="body1">{category.name}</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2">
									{category.occurencesOnCanvas}{" "}
									<span className="color-muted">
										/ {category.occurencesInManifest}
									</span>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			}
		/>
	)
}
