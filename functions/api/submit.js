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

		const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`;

		const verificationResponse = await fetch(verificationUrl, {
			method: 'POST',
		});

		const verificationResult = await verificationResponse.json();

		console.log(verificationResult);



		console.log(JSON.stringify(verificationResponse));

		if (!verificationResult.success) {
			console.error(JSON.stringify(verificationResult));
			return new Response(JSON.stringify({ success: false, message: 'Form recaptcha could not be validated' }), { status: 403 });

		}

		return new Response(JSON.stringify({ success: true, message: 'Form recaptcha validated successfully' }), { status: 200 });


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


		// return new Response(JSON.stringify(formObject), {
		// 	headers: {
		// 		"Content-Type": "application/json;charset=utf-8",
		// 	},
		// });


	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}