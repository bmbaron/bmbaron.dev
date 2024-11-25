/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
	try {
		const recaptchaSecretKey = context.env.RECAPTCHA_SECRET_KEY;
		const formData = await context.request.formData();
		const formObject = Object.fromEntries(formData.entries());
		const token = formObject['g-recaptcha-response'];

		if (!token) {
			return new Response(JSON.stringify({ success: false, error: 'No reCAPTCHA token provided' }), { status: 400 });
		}

		const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`;
		const verificationResponse = await fetch(verificationUrl, {
			method: 'POST',
		});
		const verificationResult = await verificationResponse.json();

		console.log(verificationResult);

		if (!verificationResult.success) {
			console.error(JSON.stringify(verificationResult));
			return new Response(JSON.stringify({ success: false, message: 'Form recaptcha could not be validated' }), { status: 403 });

		}
		return new Response(JSON.stringify({ success: true, message: 'Form recaptcha validated successfully' }), { status: 200 });

	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}