/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
	try {
		const recaptchaSecretKey = context.env.RECAPTCHA_SECRET_KEY;
		const formData = await context.request.formData();
		const formObject = Object.fromEntries(formData.entries())

		const token = formObject['g-recaptcha-response'];

		if (!token) {
			return new Response(JSON.stringify({ success: false, error: 'No reCAPTCHA token provided' }), { status: 400 });
		}

		const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';

		const verificationParams = new URLSearchParams();
		verificationParams.append('secret', recaptchaSecretKey);
		verificationParams.append('response', `${token}`);

		const verificationResponse = await fetch(verificationUrl, {
			method: 'POST',
			body: verificationParams
		});

		// const firstTimeVerifUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/bmbaron-dev-1731665083848/assessments?key=${googleCloudAPIKey}`
		//
		// const firstTimeVerifResponse = await fetch(firstTimeVerifUrl, {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		event: {
		// 			token: `${token}`,
		// 			siteKey: "6Ldo9H8qAAAAAOL_iJ8zY8jcJufd3O_sS-LY2AFx"
		// 		}
		// 	})
		// });
		//
		// console.log(firstTimeVerifUrl)

		if (verificationResponse.status !== 200) {
			console.error(`Error: ${verificationResponse.status} - ${verificationResponse.statusText}`);
			const errorText = await verificationResponse.text();
			console.error('Error Body:', errorText);
		}
		return new Response(JSON.stringify({ success: true, message: 'Form recaptcha validated successfully' }), { status: 200 });

		// return new Response(JSON.stringify(formObject), {
		// 	headers: {
		// 		"Content-Type": "application/json;charset=utf-8",
		// 	},
		// });


	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}