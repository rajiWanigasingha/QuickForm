import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({request}) => {
		console.log(request.body);
		console.log("hello world")
		console.log(await request.formData());
	}
}