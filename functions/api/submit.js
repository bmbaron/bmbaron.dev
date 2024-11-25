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

		// const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
		//
		// const verificationParams = new URLSearchParams();
		// verificationParams.append('secret', recaptchaSecretKey);
		// verificationParams.append('response', token);
		//
		// const verificationResponse = await fetch(verificationUrl, {
		// 	method: 'POST',
		// 	body: verificationParams
		// });
		// const verificationResult = await verificationResponse.json();

		const firstTimeVerifUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/bmbaron-dev-1731665083848/assessments?key=${recaptchaSecretKey}`

		const firstTimeVerifResponse = await fetch(firstTimeVerifUrl, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				event: {
					token: "03AFcWeA52ula2wRPSE7iL14IoEGjwhwZ9b4eChdCpPQLNmHuk_Re7_xMLGCvyng40IoIOQbwOVeo7a4BBg-WnbiSmfvxh0MIHpTRb8zOxi-qu11xdO-nzWb3KoczOXFuF7Ma1bUc-ebQhOX4tUM-YQM4LHaDHK0Z0rJ9ECNCx5kkUOiOMV0gqyjiMUdsFo6iEjlZ1LhhTrmB-r6ssFlNTJG9_2YRFx_New88jB_8QYfqqAenO1kj8UtHwmm3WfRVuZwbyhCSEBDiiKLyuWiSKSWf3rPKaxirWt4NjzXxAFhEh8XsinpNIhji0ON_xM_UJOMEh19IMZpn5lEXObSQFgMb1XxlSwut3KyYu1OKye4GlqxjNk4gftsp2etltWAC4OEOKsUZxG8eI4f7CMWHGArY-KzicE78BREOcn2iH9dqK3NleIqeeDCOA_icBN2u_YDa6SWOhclbGtY7D6xk2JYa6pVLrrv-oxxLL1dyFRAObfxOn1v2878wSMSsB71GexX1QYK-6eKfcbtjpTT3kVqHSLqVnwP0u8Na31BDgI-4hefC47KkCcozr6w6rnr8jprE-KNEUtDo5v_ECjgQ7bywi241sgKUHrobqz3z-E5NUXjAOF4JZg4dUTipkqPxhmCmGH478ur26eejBxH3nzpY8NlaH7pXHpXofDCJl7xwAmSIT9HJnqqBMIrKl0pHtiTp0i3KScxBoxcvCwC2vs-dn6y8xZtlcslpQHOi5_ADiaU7fBD3Lr0vjXY-aolqBFEPnBEtOnpCIer7OHcytlswGh_98Q03a4DANr2mAQx9heCttHg7THg3VxOMMTn_aNNTiB5IFStIjd6LyIG9IR_6pBWc86JvrVNo9RFk9Bfd2OeEMfy8ZavuzbBwSCIZ4YToyhzCXwCdBHT5N8SvLwyJvldD8K5PXJybDHRrRvvNTPXGF_SoRc5aMEJGvhOgSWDUOmIPbFeHxqOOoBM2Elq2HF0rYlXIiIuHA-HsdIPQ7ji8HWaQehXfIA2ACD_6OuOwqu84mcy0hZG5o5Dh-XaUUDKM6s4KpM2g6FNVFhHTkI0fhrEyq6jjsN1VWZDsiUtWquhfSse-KAq4Pk71-GBXo0mRIrebHJP9rZf7CJWgTNp6K4UWm6hpU4NZ8jItU74YDpzi0K86yKba3i7mKshelztc7CAM712C8hgGpFlGRwViYt5laE_49ck7I_li6KJKJZsSsPWLLrw4SrJ3Sh5FQZ5wuWygFjBf7b3FmaOLyvbaeiP01O3qmMb7smMfV0VaREyR81gjuQ1HidAfY7fNo_3FR3JKRcZuyfoql7zOYnkkXiZ13iV2PXPRdt5C1395Y5JPWCL75bP8ItOV10_NHnte3yIcSch6Zu5PUYOlJcbPqJUqfn6MelAfp1ET0Q5IA-ss9Endc7dTKdt1jYSRnHiWGDbsnH84K0XtPEKbX7Zh6qMX8HLoFaM4Ztgl_jExJ7pQhvC1PUNnJKEACI4wsqk5kdKkOqWniZ1Gqieqddd_hi8LsMAITGKmnNC8oTFSmsD_zcLGMh-wVp8XLDYFEsoxaYD-e5GFbQRNSE510m07NZyiAJz7rhUactJm4uMwgHBIKF5tAnAe9b0lKJFV7BXdXJOr2kYvm3sebnQ4wq1DE2TxYlSZdQ_x70bnmnObbcoAqnIe51K9oJzmWAKjxtl-fnP3EfISyV6Uwg0ozyVljYazNL3YdRhJ8mxRfcRnRYsur1Omyky4-6CzELuRPMyB7ijCOWanHApbo1gJMXJUKfWVAzZfZ5NlSRh6A5ZKs0KhFJMPGDSyleFJYlGEtKvV8Zxvk08XlEE3gAVvX7wGQTxdnN5_IbVt8Zok_7eMKQ8LrTgOzUCd1h325xbWPrkppzaxFD08OLwtSefroAFtwduNN7IuQ5sdND98sy8i_Thtgyuqo",
					siteKey: "6Ldo9H8qAAAAAOL_iJ8zY8jcJufd3O_sS-LY2AFx"
				}
			})
		});

		console.log(firstTimeVerifUrl)
		console.log(JSON.stringify(firstTimeVerifResponse));

		if (!firstTimeVerifResponse.success) {
			return new Response(JSON.stringify({ success: false, error: 'reCAPTCHA validation failed' }), { status: 403 });
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