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

const loadContent = (url, elementId) => {
	return fetch(url)
		.then(response => response.text())
		.then(data => {
			document.getElementById(elementId).innerHTML = data;
			if (elementId === 'footer') {
				const date = new Date().getFullYear() + '&nbsp;';
				document.getElementById('copyright').innerHTML += date;
				document.getElementById('copyright').innerHTML += 
					'<a target="_blank" href="https://github.com/bmbaron" title="open my GitHub profile">@bmbaron</a>';
			}
		})
		.catch(error => {
			console.error('Error loading content:', error);
		});
}

const sections = [
	{url: 'sections/header.html', id: 'header'},
	{url: 'sections/hero.html', id: 'hero'},
	{url: 'sections/about.html', id: 'about'},
	{url: 'sections/services.html', id: 'services'},
	{url: 'sections/projects.html', id: 'projects'},
	{url: 'sections/contact.html', id: 'contact'},
	{url: 'sections/footer.html', id: 'footer'}
];

const populateHTML = () => {
	return Promise.all(sections.map(section => loadContent(section.url, section.id)));
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
				link.style.color = 'var(--primary-color)';
			})
		} else {
			state.mobileNav.style.height = '0px';
			state.mobileNav.style.marginTop = '-100px';
			state.mobileNav.style.opacity = '0';
			linksArray.forEach((link) => {
				link.style.color = 'var(--off-white)';
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
	await populateHTML();
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
		const videos = document.querySelectorAll('video');
		videos.forEach(video => {
			video.playbackRate = 2;
		});
		state.firstImage1.addEventListener('mouseleave', () => {
			document.getElementById('first-video-1').currentTime = 0;
		});
		state.secondImage1.addEventListener('mouseleave', () => {
			document.getElementById('second-video-1').currentTime = 0;
		});
		state.secondImage1.addEventListener('mouseleave', () => {
			document.getElementById('first-video-2').currentTime = 0;
		});
		state.secondImage2.addEventListener('mouseleave', () => {
			document.getElementById('second-video-2').currentTime = 0;
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
	console.log('not mobile')
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



