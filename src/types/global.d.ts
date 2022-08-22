import { categoryModel } from "../config"

export {}

declare global {
	type Layer = "natural" | "infrared"

	type CategoryId = typeof categoryModel[number]["id"]

	type Category = {
		id: CategoryId
		enabled?: boolean
		name: string
		icon: any
		enabledByDefault: boolean
	}

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
	}

	type HydratedAnnotation = Omit<Annotation, "category"> & {
		category: Category
	}
}
