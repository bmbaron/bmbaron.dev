/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
	try {
		console.log(context.env.RECAPTCHA_SECRET_KEY)
		let input = await context.request.formData();
		let pretty = JSON.stringify([...input, {"env": context.env.RECAPTCHA_SECRET_KEY}], null, 2);

		return new Response(pretty, {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});
	} catch (err) {
		return new Response("Error parsing JSON content", { status: 400 });
	}
}