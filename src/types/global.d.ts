import { categoryModel } from "../config"

declare global {
	type View = {
		pageIndex: number
		layerIndex: number
	}
	type ViewState = [View, React.Dispatch<React.SetStateAction<View>>]

	type CategoryId = typeof categoryModel[number]["id"]
	type Category = {
		id: CategoryId
		enabled?: boolean
		name: string
		icon: any
		enabledByDefault: boolean
	}
	type CategoryState = [
		Category[],
		React.Dispatch<React.SetStateAction<Category[]>>
	]

	type AnnotationState = {
		id: string
		pinned: boolean
	}[]

	type AnnotationBody = {
		type: string
		language: string
		format: "text/plain" | "text/html"
		value: string
	}

	type Annotation = {
		"@context": string
		id: string
		type: "Annotation"
		motivation: string
		category: CategoryId
		target: {
			source: string
			selector: {
				type: "SvgSelector"
				value: string
			}
		}
		body: AnnotationBody
		created: "2015-10-13T13:00:00Z"
		creator: {
			id: string
			type: "Person" | "Organization"
			name: string
		}
		crossReferences?: { id: string }[]
	}

	type HydratedAnnotation = Omit<Annotation, "category"> & {
		category: Category
	}
}
