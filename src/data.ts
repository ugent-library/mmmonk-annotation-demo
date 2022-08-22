import annotationPage from "./annotations.json"
import { categoryModel } from "./config"

const annotations = annotationPage.items as Annotation[]

export const hydratedAnnotations: HydratedAnnotation[] = annotations.map(
	annotation => ({
		...annotation,
		category: categoryModel.find(cat => cat.id === annotation.category)!,
	})
)
