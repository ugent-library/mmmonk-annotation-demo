import React from "react"
import { AnnotationContext } from "../App"

function useAnnotations() {
	const context = React.useContext(AnnotationContext)

	if (!context) {
		throw new Error("useAnnotations must be used within a AnnotationProvider")
	}

	const { activeAnnotations, setActiveAnnotations } = context

	function activateAnnotation(id: string, scrollToCard: boolean = true): void {
		if (scrollToCard) {
			const card = document.querySelector(`[data-annotation-id="${id}"]`)
			card?.scrollIntoView({ behavior: "smooth", block: "center" })
		}
		setActiveAnnotations(prev => {
			const pinnedPanels = prev.filter(annotation => annotation.pinned)
			const newPanel = {
				id,
				pinned: false,
			}
			return [...pinnedPanels, newPanel]
		})
	}

	function closeAnnotation(id: string): void {
		setActiveAnnotations(prev => {
			const newActiveAnnotations = prev.filter(
				annotation => annotation.id !== id
			)
			return newActiveAnnotations
		})
	}

	function closeAllExceptPinnedAnnotations(): void {
		setActiveAnnotations(prev => {
			return prev.filter(annotation => annotation.pinned)
		})
	}

	function togglePinAnnotation(id: string): void {
		const current = activeAnnotations.find(annotation => annotation.id === id)
		const isPinned = current?.pinned
		setActiveAnnotations(prev => {
			return prev.map(annotation => {
				return annotation.id === id
					? { ...annotation, pinned: !isPinned }
					: annotation
			})
		})
	}

	return {
		activeAnnotations,
		activateAnnotation,
		closeAnnotation,
		closeAllExceptPinnedAnnotations,
		togglePinAnnotation,
	}
}

export { useAnnotations }
