import type { Actions } from "@sveltejs/kit";
import { quickForm } from './formInputs.js';
import QuickFormParser from '$lib/compileFormSchema/FormDataToJson.js';

interface quickFormType {
	firstName: string;
	secondName: string;
	age: number;
	save: boolean;
	gender: string;
	program: string[]
}

export const actions: Actions = {
	default: async ({request}) => {
		console.log("hello world")
		 const formData = await request.formData()
		const parsedData = QuickFormParser(formData, quickForm) as unknown as quickFormType
		console.log(parsedData)
		console.log(parsedData.program)

	}
}