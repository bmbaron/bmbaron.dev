/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
	try {
		const recaptchaSecretKey = context.env.RECAPTCHA_SECRET_KEY;
		const formData = await context.request.formData();
		const formObject = Object.fromEntries(formData.entries());
		const token = formObject['g-recaptcha-response'];
		const submittedData = {...formObject};
		delete submittedData['g-recaptcha-response'];

		if (!token) {
			return new Response(JSON.stringify({success: false, error: 'No reCAPTCHA token provided'}), {status: 400});
		}

		const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`;
		const verificationResponse = await fetch(verificationUrl, {
			method: 'POST',
		});
		const verificationResult = await verificationResponse.json();

		console.log(verificationResult);

		if (!verificationResult.success) {
			console.error(JSON.stringify(verificationResult));
			return new Response(JSON.stringify({
				success: false,
				message: 'Form recaptcha could not be validated'
			}), {status: 403});

		}
		if (verificationResult.score < 0.5) {
			return new Response(JSON.stringify({success: false, message: 'Validation failed. Aborted'}), {status: 403});
		} else {

			const mailtrapAPIToken = context.env.MAILTRAP_API_TOKEN;
			const mailtrapTemplateID = context.env.MAILTRAP_TEMPLATE_ID;

			const mailConfig = {
				"to": [
					{
						"email": "benjamin.m.baron@gmail.com",
						"name": "Benjamin Baron"
					}
				],
				"from": {
					"email": "hello@bmbaron.dev",
					"name": "Bmbaron Dev"
				},
				"headers": {
					"X-Message-Source": "bmbaron.dev"
				},
				"template_uuid": `${mailtrapTemplateID}`,
				"template_variables": {
					"name": `${submittedData.name}`,
					"email": `${submittedData.email}`,
					"reason": `${submittedData.reason}`,
					"message": `${submittedData.message}`
				}
			};

			const url = 'https://send.api.mailtrap.io/api/send';
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'Api-Token': `${mailtrapAPIToken}`
				},
				body: mailConfig
			};

			try {
				const response = await fetch(url, options);
				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.error(error);
			}

			return new Response(
				JSON.stringify({
					success: true,
					message: 'Form recaptcha validated successfully.',
					submittedData: submittedData
				}),
				{status: 200}
			);
		}


	} catch (error) {
		return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
	}
}