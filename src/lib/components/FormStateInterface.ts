export abstract class QuickForms {
	private label: string = "";
	private helper: string = "";
	private placeholder: string = "";

	protected constructor(label: string, helper: string, placeholder: string) {
		this.label = label;
		this.helper = helper;
		this.placeholder = placeholder;
	}

	getLabel(): string {
		return this.label;
	}

	setLabel(label: string): void {
		this.label = label;
	}

	getHelper(): string {
		return this.helper;
	}

	setHelper(helper: string): void {
		this.helper = helper;
	}

	getPlaceholder(): string {
		return this.placeholder;
	}

	setPlaceholder(placeholder: string): void {
		this.placeholder = placeholder;
	}

}
