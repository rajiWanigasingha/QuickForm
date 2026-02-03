export abstract class QuickForms {
	private readonly label: string = "";
	private readonly helper: string = "";
	private readonly placeholder: string = "";

	protected constructor(label: string, helper: string, placeholder: string) {
		this.label = label;
		this.helper = helper;
		this.placeholder = placeholder;
	}

	getLabel(): string {
		return this.label;
	}

	getHelper(): string {
		return this.helper;
	}

	getPlaceholder(): string {
		return this.placeholder;
	}

}
