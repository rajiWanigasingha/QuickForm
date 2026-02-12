import type { QuickFormInputs, QuickFormParsedOutput } from '$lib/types/schema.js';
import { TextState } from '$lib/components/Text/TextState.svelte.js';
import { ValidationErrorResponse } from '$lib/components/Validation/ValidationObj.js';

// TODO("This switch case need to handel parse errors")
export default function QuickFormParser(formData: FormData ,quickFormSchema: QuickFormInputs[]) {

	const data: QuickFormParsedOutput = {}

	quickFormSchema.forEach((item) => {

		const input = item.input

		if (input instanceof TextState) {
			const formDataValue = formData.get(item.name)

			if (input.required) {
				if (formDataValue !== null) {
					data[item.name] = formDataValue.toString()
				} else {
					throw new ValidationErrorResponse(item.name ,"Form input required.")
				}
			} else {
				data[item.name] = formDataValue?.toString() ?? null
			}
		}

		// switch (item.input.type) {
		// 	case 'number' : {
		// 		data[item.name] = Number(formData.get(item.name) as string)
		// 		break;
		// 	}
		// 	case 'boolean' : {
		// 		data[item.name] = Boolean(formData.get(item.name) as string)
		// 		break;
		// 	}
		// 	case 'arrayOfText' : {
		// 		data[item.name] = formData.getAll(item.name).map((item) => item.toString())
		// 		break;
		// 	}
		// 	default: {
		// 		data[item.name] = formData.get(item.name) as string
		// 		break;
		// 	}
		// }
	})

	return data
}