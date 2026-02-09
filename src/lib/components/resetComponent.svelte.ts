class ResetForm {
	reset = $state(0)

	resetState() {
		this.reset++
	}
}

export const resetForm = new ResetForm()