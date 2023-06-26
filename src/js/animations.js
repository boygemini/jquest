"use strict";
import Questions from "./questions.js";

const pagePreloader = document.querySelector(".sitepreloader");
const loader = document.querySelector(".loadd");

let deviceScreenWidth = screen.width;
const animate = gsap.timeline({
	defaults: {
		duration: 0.5,
		ease: "power2.out",
	},
});

let count = 0;
let timer = setInterval(() => {
	count++;
	loader.style.width = `${count}%`;
}, 1);

window.onload = () => {
	loader.style.width = "100%";
	clearInterval(timer);

	setTimeout(() => {
		pagePreloader.style.opacity = 0;
		setTimeout(() => {
			pagePreloader.style.display = "none";
		}, 200);

		window.scrollTo(0, 0);

		setTimeout(() => {
			animate.fromTo(
				".q-heading",
				{
					y: 200,
				},
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
				}
			);

			animate.fromTo(
				".q-subtext",
				{
					y: 100,
				},
				{
					opacity: 1,
					y: 0,
				},
				"<25%"
			);

			animate.fromTo(
				".field-container",
				{
					y: 100,
				},
				{
					opacity: 1,
					y: 0,
				},
				"<25%"
			);

			animate.fromTo(
				".control-buttons",
				{
					y: 100,
				},
				{
					opacity: 1,
					y: 0,
				},
				"<"
			);
		}, 210);
	}, 500);
};

export function goingOutOfWelcome() {
	animate.to(".control-buttons", {
		opacity: 0,
		y: 100,
	});

	animate.to(
		".field-container",
		{
			opacity: 0,
			y: 100,
		},
		"<50%"
	);

	animate.to(
		".q-subtext",
		{
			opacity: 0,
			y: 100,
		},
		"<"
	);

	animate.to(
		".q-heading",
		{
			opacity: 0,
			y: 50,
			duration: 0.25,
		},
		"<10%"
	);

	/** Sliding In the Question at the start */
	animate.fromTo(
		".main-Q-container",
		{
			x: deviceScreenWidth,
		},
		{
			x: 0,
			opacity: 1,
			duration: 0.5,
		},
		">"
	);

	animate.to(
		".control-buttons",
		{
			opacity: 1,
			y: 0,
		},
		"<75%"
	);

	animate.to(
		".circle-progress",
		{
			opacity: 1,
			duration: 0.25,
		},
		"<75%"
	);
}

export function backToWelcome() {
	/** Sliding out the Question at the start */
	animate.to(".main-Q-container", {
		x: deviceScreenWidth,
		opacity: 0,
		duration: 0.45,
		ease: "power1.in",
	});

	animate.fromTo(
		".control-buttons",
		{
			opacity: 1,
			y: 0,
		},
		{
			y: 100,
			opacity: 0,
		},
		"<"
	);

	animate.to(
		".circle-progress",
		{
			opacity: 0,
			duration: 0.25,
		},
		"<25%"
	);

	/** Sliding in the homepage */

	animate.fromTo(
		".field-container",
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
			duration: 1,
		},
		">"
	);

	animate.fromTo(
		".q-subtext",
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
		},
		"<50%"
	);

	animate.fromTo(
		".q-heading",
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
		},
		"<"
	);

	animate.fromTo(
		".control-buttons",
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
		},
		"<75%"
	);
}

export function continueDuringSurvey() {
	// Slideout
	animate.fromTo(
		".Question",
		{
			y: 0,
			opacity: 1,
		},
		{
			y: -200,
			opacity: 0,
		}
	);

	animate.fromTo(
		".selection-rule",
		{
			y: 0,
			opacity: 1,
		},
		{
			y: -100,
			opacity: 0,
		},
		"<"
	);

	animate.fromTo(
		".answer-field",
		{
			y: 0,
			opacity: 1,
		},
		{
			y: 200,
			opacity: 0,
		},
		"<"
	);

	// Slidin
	animate.to(
		".Question",
		{
			y: 0,
			opacity: 1,
			duration: 0.5,
		},
		">"
	);

	animate.to(
		".selection-rule",
		{
			y: 0,
			opacity: 1,
		},
		"<"
	);

	animate.to(
		".answer-field",
		{
			y: 0,
			opacity: 1,
		},
		"<"
	);
}

export function showThankYouPage() {
	// Fadeout
	animate.fromTo(
		".main-Q-container",
		{
			opacity: 1,
		},
		{
			opacity: 0,
		}
	);

	// animate.to(".control-buttons", {
	//     opacity: 0,
	//     y: 100,
	// }, "<20%");

	// Fadein
	animate.fromTo(
		".thank-you",
		{
			opacity: 0,
		},
		{
			opacity: 1,
		},
		">"
	);

	animate.to(
		".control-buttons",
		{
			opacity: 1,
			y: 0,
		},
		"<75%"
	);

	animate.fromTo(
		".email-sent",
		{
			opacity: 0,
			y: 500,
		},
		{
			opacity: 1,
			y: 0,
			ease: "back.out(1.4)",
			duration: 1,
		},
		"<50%"
	);
}

export function backToForm() {
	// Fadeout
	animate.fromTo(
		".thank-you",
		{
			opacity: 1,
		},
		{
			opacity: 0,
		},
		">"
	);

	animate.to(
		".control-buttons",
		{
			opacity: 1,
			y: 100,
		},
		"<20%"
	);

	// Fadein
	animate.to(
		".main-Q-container",
		{
			opacity: 1,
		},
		">"
	);

	animate.to(
		".control-buttons",
		{
			opacity: 1,
			y: 0,
		},
		"<20%"
	);

	animate.to(
		".circle-progress",
		{
			opacity: 1,
		},
		"<"
	);
}
