let isMobile = false;
if (window.innerWidth <= 1000) {
	isMobile = true;
}

const loadIconScript = () => {
	const script = document.createElement('script');
	script.src = 'https://unpkg.com/feather-icons';
	script.onload = () => feather.replace();
	document.body.appendChild(script);
}

const loadContent = (html, elementId) => {
	document.getElementById(elementId).innerHTML = html;
	if (elementId === 'footer') {
		const date = new Date().getFullYear() + '&nbsp;';
		document.getElementById('copyright').innerHTML += date;
		document.getElementById('copyright').innerHTML += '<span style="font-weight: 700;">bmbaron</span>';
	}
}

const populateHTML = () => {
	return sections.map(section => loadContent(section.html, section.id));
};

const state = {
	isHidden: true,
	hamburgerButton: null,
	project1Button: null,
	project2Button: null,
	projectItem1: null,
	projectItem2: null,
	firstImage1: null,
	secondImage1: null,
	firstImage2: null,
	secondImage2: null,
	hamburgerIcon: null,
	closeIcon: null,
	mobileNav: null,
	mobileLinks: [null],
	textarea: null,
	form: null,
	submitButton: null,
};
const updateState = () => {
	state.hamburgerButton = document.getElementById('hamburger');
	state.project1Button = document.getElementById('project-1');
	state.project2Button = document.getElementById('project-2');
	state.projectItem1 = document.getElementById('project-item-1');
	state.projectItem2 = document.getElementById('project-item-2')
	state.firstImage1 = document.getElementById('first-image-1');
	state.secondImage1 = document.getElementById('second-image-1');
	state.firstImage2 = document.getElementById('first-image-2');
	state.secondImage2 = document.getElementById('second-image-2');
	state.hamburgerIcon = document.getElementById('hamburger-icon');
	state.closeIcon = document.getElementById('close-icon');
	state.mobileNav = document.getElementById('mobile-nav');
	state.mobileLinks = document.getElementsByClassName('mobile-link');
	state.textarea = document.getElementById('notes');
	state.form = document.getElementById('form');
	state.submitButton = document.getElementById('submit-button');

};
const smoothScrollToAnchor = () => {
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const href = this.getAttribute('href');
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({behavior: 'smooth', block: 'start'});
				link.active = true;
				state.mobileNav.style.height = '0px';
				state.mobileNav.style.marginTop = '-100px';
				state.hamburgerIcon.classList.remove('hidden');
				state.closeIcon.classList.add('hidden');
				document.body.style.overflowY = 'auto';
				state.isHidden = !state.isHidden;
			} else {
				link.active = false;
			}
		});
	});
}

const showMobileMenu = () => {
	if (state.mobileNav && state.mobileLinks) {
		const linksArray = Array.from(state.mobileLinks);
		if (state.isHidden) {
			state.mobileNav.style.height = '100vh';
			state.mobileNav.style.marginTop = '0px';
			state.mobileNav.style.opacity = '1';
			linksArray.forEach((link) => {
				link.style.color = 'var(--primary)';
			})
		} else {
			state.mobileNav.style.height = '0px';
			state.mobileNav.style.marginTop = '-100px';
			state.mobileNav.style.opacity = '0';
			linksArray.forEach((link) => {
				link.style.color = 'var(--light)';
			})
		}
	}
}

const handleProjectToggle = (buttonClicked) => {
	state.firstImage1 = document.getElementById('first-image-1');
	state.secondImage1 = document.getElementById('second-image-1');
	state.firstImage2 = document.getElementById('first-image-2');
	state.secondImage2 = document.getElementById('second-image-2');
	if (buttonClicked === 1) {
		state.firstImage2.classList.remove('fade-in');
		state.secondImage2.classList.remove('fade-in');
		state.firstImage1.classList.add('fade-in');
		state.secondImage1.classList.add('fade-in');
		state.projectItem1.style.display = 'flex';
		state.projectItem2.style.display = 'none';
		return;
	}
	state.firstImage1.classList.remove('fade-in');
	state.secondImage1.classList.remove('fade-in');
	state.firstImage2.classList.add('fade-in');
	state.secondImage2.classList.add('fade-in');
	state.projectItem1.style.display = 'none';
	state.projectItem2.style.display = 'flex';
}

window.addEventListener('DOMContentLoaded', async () => {
	populateHTML();
	loadIconScript();
	updateState();
	smoothScrollToAnchor();
	if (state.hamburgerButton) {
		state.hamburgerButton.addEventListener('click', () => {
			showMobileMenu();
			if (state.isHidden) {
				state.hamburgerIcon.classList.add('hidden');
				state.closeIcon.classList.remove('hidden');
				document.body.style.overflowY = 'hidden';
			} else {
				state.hamburgerIcon.classList.remove('hidden');
				state.closeIcon.classList.add('hidden');
				document.body.style.overflowY = 'auto';
			}
			state.isHidden = !state.isHidden;
		});
	}
	if (state.project1Button && state.project2Button) {
		state.project1Button.addEventListener('click', () => {
			state.project2Button.classList.add('button-inverse');
			state.project1Button.classList.remove('button-inverse');
			handleProjectToggle(1);
		});
		state.project2Button.addEventListener('click', () => {
			state.project1Button.classList.add('button-inverse');
			state.project2Button.classList.remove('button-inverse');
			handleProjectToggle(2);
		});
		if (isMobile) {
			state.project1Button.click();
		}
	}
	if (state.firstImage1 && state.firstImage2 && state.secondImage1 && state.secondImage2) {
		const overlays = document.querySelectorAll('.overlay');
		overlays.forEach(overlay => {
			const video = overlay.nextElementSibling;
			overlay.addEventListener('click', () => {
				if (!video) return;
				video.load();
				video.play();
				if (video.requestFullscreen) {
					video.requestFullscreen();
				} else if (video.webkitRequestFullscreen) { /* Safari */
					video.webkitRequestFullscreen();
				} else if (video.msRequestFullscreen) { /* IE11 */
					video.msRequestFullscreen();
				}
			});
		});
	}
	if (state.textarea) {
		state.textarea.addEventListener('mouseenter', () => {
			state.textarea.style.height = '100px';
		});
		state.textarea.addEventListener('mouseleave', () => {
			if (state.textarea.value.length === 0) {
				state.textarea.style.height = '40px';
			}
		});
	}
	if (state.form) {
		state.form.addEventListener('submit', handleFormSubmission);
	}
	if (isMobile) {
		AOS.init({
			offset: 0,
			duration: 0,
			delay: 0,
		});
	}
	else {
		AOS.init({
			offset: 200,
			duration: 600,
			easing: 'ease-in-sine',
			delay: 100,
			mirror: false,
		});
	}
});

const animateProjectsIn = () => {
	state.firstImage2.classList.remove('fade-in');
	state.secondImage2.classList.remove('fade-in');
	state.firstImage1.classList.remove('fade-in');
	state.secondImage1.classList.remove('fade-in');
	state.projectItem2.style.display = 'none';
	state.projectItem1.style.display = 'flex';
	state.project1Button.classList.remove('button-inverse');
	setTimeout(() => {
		state.firstImage1.classList.add('fade-in');
		state.secondImage1.classList.add('fade-in');
	}, 1000);
}

const intersectionOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.5,
};

intersectionProjectsHandler = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			animateProjectsIn();
			observer.unobserve(entry.target);
		}
	});
};

let observer = new IntersectionObserver(intersectionProjectsHandler, intersectionOptions);
const projects = document.getElementById('projects');
if (!isMobile) {
	observer.observe(projects);
}



const handleFormSubmission = (event) => {
	event.preventDefault();
	grecaptcha.ready(function () {
		grecaptcha.execute('6Ldo9H8qAAAAAOL_iJ8zY8jcJufd3O_sS-LY2AFx', {action: 'submit'}).then(function (token) {
			state.submitButton.innerHTML = 'Sending...'
			const formData = new FormData(state.form);
			formData.append('g-recaptcha-response', `${token}`);
			fetch('/api/submit', {
				method: 'POST',
				body: formData,
			}).then(response => response.json())
				.then(data => {
					console.log(data);
					state.submitButton.innerHTML = 'Sent. Thank you!'
					state.submitButton.style.background = 'var(--green)';
					state.submitButton.style.borderColor = 'var(--green)';
					state.submitButton.style.pointerEvents = 'none';
				}).catch(error => console.error('Error:', error));
		});
	})
}

const sections = [
	{
		id: 'header',
		html:
			`<div class="mobile-menu-button box-shadow" id="hamburger">
				<i id="hamburger-icon" data-feather="menu"></i>
				<i class="hidden" id="close-icon" data-feather="x-square"></i>
			</div>
			<nav aria-label="Mobile Navigation" class="mobile-nav" id="mobile-nav">
				<ul>
					<li>
						<a href="#header" class="mobile-link">
							<div class="mobile-row">HOME</div>
						</a>
					</li>
					<li>
						<a href="#about" class="mobile-link">
							<div class="mobile-row">ABOUT</div>
						</a>
					</li>
					<li>
						<a href="#services" class="mobile-link">
							<div class="mobile-row">COMPETENCIES</div>
						</a>
					</li>
					<li>
						<a href="#projects" class="mobile-link">
							<div class="mobile-row">PROJECTS</div>
						</a>
					</li>
					<li>
						<a href="#contact" class="mobile-link">
							<div class="mobile-row">CONTACT</div>
						</a>
					</li>
				</ul>
				<img src="./assets/logo.webp" alt="DevOptimist Logo"/>
			</nav>
			<nav aria-label="Main Navigation" class="main-nav">
				<img src="./assets/logo.webp" alt="DevOptimist Logo"/>
				<ul>
					<li>
						<a href="#about" class="center-clean">ABOUT</a>
					</li>
					<li>
						<a href="#services" class="center-clean">COMPETENCIES</a>
					</li>
					<li>
						<a href="#projects" class="center-clean">PROJECTS</a>
					</li>
					<li>
						<a class="button box-shadow center-clean" href="#contact">CONTACT</a>
					</li>
				</ul>
			</nav>`
	},
	{
		id: 'hero',
		html:
			`<div class="hero-content">
				<article class="hero-text">
					<h1 class="center-clean">Welcome to <span style="color: black; font-weight: 700;">bmbaron.dev</span> <span class="exclamation">!</span></h1>
					<p>I like to make stuff with code</p>
					<a href="#about" class="center-clean">
						<div class="hero-button">
							<p>SEE MORE</p>
							<div class="icon-wrapper">
								<i class="phone-icon" data-feather="corner-right-down"></i>
							</div>
						</div>
					</a>
				</article>
			</div>`,
	},
	{
		id: 'about',
		html:
			`<article class="about-content">
			<div class="about-image" data-aos="fade-left">
				<figure>
					<img src="../assets/about.webp" class="box-shadow" id="about-image" alt="About Us"
						 loading="lazy"/>
					<!--            <figcaption id="about-image-caption">Pssst! Click to give me a coffee</figcaption>-->
				</figure>
			</div>
			<div class="about-text" data-aos="fade-right">
				<h3>About Ben</h3>
				<p>I fell in love with coding at the University of Iowa when I made my first game using Java. Now,
					as a frontend developer, I enjoy creating beautiful, interactive elements from custom designs. I
					have experience in all aspects of web development - including deployment.</p>
				<p>Contact me if you need someone to dive into your codebase and find out why your site isn't
					looking or working the way it should be.</p>
				<a class="button box-shadow center-clean" href="#contact">Contact</a>
			</div>
		</article>`
	},
	{
		id:'services',
		html:
			`<h2>Core Competencies</h2>
			<div class="services-wrapper">
				<article class="services-card box-shadow center-clean" data-aos="fade-up" data-aos-delay="300">
					<img alt="Service 1" class="top-image" src="../assets/service-1.webp" loading="lazy"/>
					<div class="services-content">
						<h3>Web Development</h3>
						<p class="summary">Capable of quickly converting designs to functional UI and comfortable with every aspect of the development process.</p>
						<div class="quoted-content">
							<p>I'm passionate about developing accurate solutions that are made thoughtfully, using best practices, and with performance in mind. I can create vanilla static content using HTML, CSS, and JavaScript or more interactive content using modern tooling such as React.</p>
						</div>
					</div>
				</article>
				<article class="services-card box-shadow center-clean" data-aos="fade-up">
					<img alt="Service 2" class="top-image" src="../assets/service-2.webp" loading="lazy"/>
					<div class="services-content">
						<h3>Technical Communication</h3>
						<p class="summary">Able to work seamlessly with clients, support teams, and developers to gather requirements and produce results.</p>
						<div class="quoted-content">
							<p>Working in diverse teams has taught me that software development is heavily dependent on efficient collaboration, and I pride myself on my ability to work with diverse stakeholders and maintaining professional, empathetic communication.</p>
						</div>
					</div>
				</article>
				<article class="services-card box-shadow center-clean" data-aos="fade-up" data-aos-delay="300">
					<img alt="Service 3" class="top-image" src="../assets/service-3.webp" loading="lazy"/>
					<div class="services-content">
						<h3>Problem Solving</h3>
						<p class="summary">Dedicated to researching, exploring, and experimenting to find optimal solutions to fix bugs and improve undesired behavior.</p>
						<div class="quoted-content">
							<p>With enough time and resources, I can figure out just about any problem and am not afraid to ask for help and guidance from my peers to deliver results when I run into an issue in a domain that's not yet in my wheelhouse.</p>
						</div>
					</div>
				</article>
			</div>`
	},
	{
		id: 'projects',
		html:
			`<h2 class="center-clean">My Projects</h2>
			<div class="button-container" id="button-container">
				<button class="button button-inverse box-shadow center-clean" id="project-1">First</button>
				<button class="button button-inverse box-shadow center-clean" id="project-2">Second</button>
			</div>
			<article class="project-item" id="project-item-1">
				<div class="project-item-text box-shadow">
					<div class="left-text">
						<h5 class="location">Full-stack</h5>
						<h4>Memrys Web App</h4>
						<a href="https://github.com/bmbaron/memrys" class="project-link" target="_blank">
							Check out the code
							<i data-feather="external-link" stroke-width="2px"></i>
						</a>
					</div>
					<div class="right-text">
						<ul>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								Frontend: React, <br/>Mantine, TypeScript
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								Backend: Express, PostgreSQL
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								Cloud: AWS <br/> (S3 + Lambda)
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								Deployment: <br/> Cloudflare CI/CD
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								AI: Gemini for auto tagging images
							</li>
						</ul>
					</div>
				</div>
				<div class="images-container">
					<div class="first-image" id="first-image-1">
						<div class="overlay">
							<p class="box-shadow">UI Example</p>
							<i class="video-icon" data-feather="play-circle" stroke-width="1px" color="var(--light)"></i>
						</div>
						<video muted id="first-video-1" controls preload="none">
							<source src="https://pub-cce7ff3e71de4fc782e13d598fbb7888.r2.dev/memrys-video-1.mov" type="video/mp4">
						</video>
						<img src="../assets/memrys-1.webp" alt="before image" loading="lazy"/>
					</div>
					<div class="second-image" id="second-image-1">
						<div class="overlay">
							<p class="box-shadow">AI Integration</p>
							<i class="video-icon" data-feather="play-circle" stroke-width="1px" color="var(--light)"></i>
						</div>
						<video muted id="first-video-2" controls preload="none">
							<source src="https://pub-cce7ff3e71de4fc782e13d598fbb7888.r2.dev/memrys-video-2.mov" type="video/mp4">
						</video>
						<img src="../assets/memrys-2.webp" alt="after image" loading="lazy"/>
					</div>
				</div>
			</article>
			<article class="project-item" id="project-item-2">
				<div class="project-item-text box-shadow">
					<div class="left-text">
						<h5 class="location">Vanilla HTML, CSS, JS</h5>
						<h4>Static Site Template</h4>
						<a href="https://vanilla-static-landing.netlify.app/" class="project-link" target="_blank">
							Open live deployment
							<i data-feather="external-link" stroke-width="2px"></i>
						</a>
					</div>
					<div class="right-text">
						<ul>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								minimalistic and <br/>blazing-fast
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								can be quickly copied and extended
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								focus on HTML best practices
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								currently deployed for <br/>3 clients
							</li>
							<li>
								<i class="project-icon" data-feather="check-circle" stroke-width="3px"></i>
								excellent Lighthouse scores
							</li>
						</ul>
					</div>
				</div>
				<div class="images-container">
					<div class="first-image" id="first-image-2">
						<div class="overlay">
							<p class="box-shadow">Smooth and simple</p>
							<i class="video-icon" data-feather="play-circle" stroke-width="1px" color="var(--light)"></i>
						</div>
						<video muted id="second-video-1" controls preload="none">
							<source src="https://pub-cce7ff3e71de4fc782e13d598fbb7888.r2.dev/vanilla-video-1.mov" type="video/mp4">
						</video>
						<img src="../assets/vanilla-1.webp" alt="before image" loading="lazy"/>
					</div>
					<div class="second-image" id="second-image-2">
						<div class="overlay">
							<p class="box-shadow">Fully responsive</p>
							<i class="video-icon" data-feather="play-circle" stroke-width="1px" color="var(--light)"></i>
						</div>
						<video muted id="second-video-2" controls preload="none">
							<source src="https://pub-cce7ff3e71de4fc782e13d598fbb7888.r2.dev/vanilla-video-2.mov" type="video/mp4">
						</video>
						<img src="../assets/vanilla-2.webp" alt="before image" loading="lazy"/>
					</div>
				</div>
			</article>`
	},
	{
		id: 'contact',
		html:
			`<article class="contact-content">
		<div class="contact-image" data-aos="zoom-out-right">
			<img src="../assets/contact.webp" class="box-shadow" alt="" loading="lazy"/>
		</div>
		<div class="contact-form">
			<h4>Get in Touch</h4>
			<form id="form" autocomplete="on">
				<fieldset>
					<div>
						<label for="name">Name</label><br/>
						<input type="text" id="name" name="name"/><br/>
					</div>
					<div>
						<label class="required" for="email">Email</label><br/>
						<input required type="email" id="email" name="email"/><br/>
					</div>
					<div>
						<label class="required" for="reason">Reason</label><br/>
						<select required type="select" id="reason" name="reason">
							<option value="" selected disabled hidden>Why are you reaching out?</option>
							<option value="job">Work opportunity</option>
							<option value="feedback">Feedback on website or profile</option>
							<option value="other">Other / just saying "hi"</option>
						</select><br/>
					</div>
					<div>
						<label class="required" for="notes">Your Message</label><br/>
						<textarea required id="notes" name="notes"></textarea><br/>
					</div>
				</fieldset>
				<button class="button submit-button" id="submit-button" type="submit">
					> SEND INTO THE DARK ETHER
				</button>
				<p class="recaptcha-text">This site is protected by reCAPTCHA and the Google
					<a href="https://policies.google.com/privacy">Privacy Policy</a> and
					<a href="https://policies.google.com/terms">Terms of Service</a> apply.
				</p>
			</form>
		</div>
	</article>`
	},
	{
		id: 'footer',
		html:
			`<div class="footer-content">
				<div class="footer-left">
					<p id="copyright">
						Copyright ©
					</p>
				</div>
				<div class="footer-right">
					<address>
						<ul>
							<li class="social-wrapper box-shadow">
								<a href="https://github.com/bmbaron" target="_blank">
									<i class="social" data-feather="github" stroke-width="1px"></i>
								</a>
							</li>
							<li class="social-wrapper box-shadow">
								<a href="https://www.linkedin.com/in/benjamin-baron-850b264a/" target="_blank">
									<i class="social" data-feather="linkedin" stroke-width="1px"></i>
								</a>
							</li>
							<li class="social-wrapper box-shadow">
								<a href="https://youtube.com/@devoptimist" target="_blank">
									<i class="social" data-feather="youtube" stroke-width="1px"></i>
								</a>
							</li>
						</ul>
					</address>
				</div>
			</div>`
	}
];



