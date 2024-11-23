/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
	try {
		const recaptchaSecretKey = context.env.RECAPTCHA_SECRET_KEY;
		const formData = await context.request.formData();
		const formObject = Object.fromEntries(formData.entries())

		const token = formObject['g-recaptcha-response'];

		return new Response(JSON.stringify(formObject), {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});
	//
	// 	if (!token) {
	// 		return new Response(JSON.stringify({ success: false, error: 'No reCAPTCHA token provided' }), { status: 400 });
	// 	}
	//
	// 	const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
	// 	const verificationParams = new URLSearchParams();
	// 	verificationParams.append('secret', recaptchaSecretKey);
	// 	verificationParams.append('response', token);
	//
	// 	const verificationResponse = await fetch(verificationUrl, {
	// 		method: 'POST',
	// 		body: verificationParams
	// 	});
	//
	// 	const verificationResult = await verificationResponse.json();
	//
	// 	if (!verificationResult.success || verificationResult.score < 0.5) {
	// 		return new Response(JSON.stringify({ success: false, error: 'reCAPTCHA validation failed' }), { status: 403 });
	// 	}
	//
	// 	return new Response(JSON.stringify({ success: true, message: 'Form submitted successfully' }), { status: 200 });
	//
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}