class ResetForm {
	reset = $state(0)

	resetState() {
		this.reset++
	}
}

class ValidateSubmitStop {
	stop = $state(false)

	panic() {
		this.stop = !this.stop
	}
}

class ValidationBeforeSubmit {
	submit = $state(0)

	submitForm() {
		this.submit++
	}
}

class LoadingForm {
	loading = $state(false)

	reload() {
		this.loading = !this.loading
	}
}

export const resetForm = new ResetForm()
export const loadingForm = new LoadingForm()
export const submitState = new ValidationBeforeSubmit()
export const stopSubmit = new ValidateSubmitStop()