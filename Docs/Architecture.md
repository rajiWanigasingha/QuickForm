## How will this work?

QuickForm is a project aim to provide a simple schema-driven form generator, with real-time validation.
This will provide skeletons for any forms.

Users should provide a schema look like,

```ts
const schema = [
	{
		lable: 'Name',
        type: 'text',
        helpText: 'Enter your name'
	}
]
```

