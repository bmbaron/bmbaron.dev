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
};
const updateState = () => {
	state.hamburgerButton = document.getElementById("hamburger");
	state.project1Button = document.getElementById("project-1");
	state.project2Button = document.getElementById("project-2");
	state.projectItem1 = document.getElementById('project-item-1');
	state.projectItem2 = document.getElementById('project-item-2')
	state.firstImage1 = document.getElementById("first-image-1");
	state.secondImage1 = document.getElementById("second-image-1");
	state.firstImage2 = document.getElementById("first-image-2");
	state.secondImage2 = document.getElementById("second-image-2");
	state.hamburgerIcon = document.getElementById("hamburger-icon");
	state.closeIcon = document.getElementById("close-icon");
	state.mobileNav = document.getElementById("mobile-nav");
};
const smoothScrollToAnchor = () => {
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const href = this.getAttribute('href');
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({ behavior: "smooth", block: "start"});
				link.active = true;
				state.mobileNav.style.height = '0px';
				state.mobileNav.style.marginTop = '-100px';
				state.hamburgerIcon.classList.remove("hidden");
				state.closeIcon.classList.add("hidden");
				document.body.style.overflowY = 'auto';
				state.isHidden = !state.isHidden;
			} else {
				link.active = false;
			}
		});
	});
}

const showMenu = () => {
	if (state.mobileNav) {
		if (state.isHidden) {
			state.mobileNav.style.height = 'calc(100vh - 60px)';
			state.mobileNav.style.marginTop = '0px';
		} else {
			state.mobileNav.style.height = '0px';
			state.mobileNav.style.marginTop = '-100px';
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

window.addEventListener("DOMContentLoaded", () => {
	updateState();
	smoothScrollToAnchor();
	if (state.hamburgerButton) {
		state.hamburgerButton.addEventListener("click", () => {
			showMenu();
			if (state.isHidden) {
				state.hamburgerIcon.classList.add("hidden");
				state.closeIcon.classList.remove("hidden");
				document.body.style.overflowY = 'hidden';
			} else {
				state.hamburgerIcon.classList.remove("hidden");
				state.closeIcon.classList.add("hidden");
				document.body.style.overflowY = 'auto';
			}
			state.isHidden = !state.isHidden;
		});
	}
	if (state.project1Button && state.project2Button) {
		state.project1Button.addEventListener("click", () => {
			state.project2Button.classList.add('button-inverse');
			state.project1Button.classList.remove('button-inverse');
			handleProjectToggle(1);
		});
		state.project2Button.addEventListener("click", () => {
			state.project1Button.classList.add('button-inverse');
			state.project2Button.classList.remove('button-inverse');
			handleProjectToggle(2);
		});
	}
});

const intersectionOptions = {
	root: null,
	rootMargin: "0px",
	threshold: 0.5,
};

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

callback = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			animateProjectsIn();
			observer.unobserve(entry.target);
		}
	});
};

let observer = new IntersectionObserver(callback, intersectionOptions);
const projects = document.getElementById("projects");
observer.observe(projects);


document.getElementById('form').addEventListener('submit', (e) => {
	e.preventDefault();
});