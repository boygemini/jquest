"use strict";

import { showThankYouPage } from "./animations.js";
import { animateErrorMessage } from "./script.js";

const starterPage = document.querySelector(".q-container");
const startQuestion = document.querySelector(".main-Q-container");
const thankYou = document.querySelector(".thank-you");
const BackButton = document.querySelector(".back-button");
const ContinueButton = document.getElementById("continue");
const userEmail = document.getElementById("email");
const svgCircle = document.getElementById("circle");
const submitLoader = document.querySelector(".circle-loader");
const successMark = document.querySelector(".checkmark");
const loaderDOM = document.querySelector(".loader");
const successText = document.querySelector(".sent-message");

let usersEmailAddress, id6;
let submitCounter = 0,
	id14,
	id13,
	id8,
	id9,
	id10,
	id11,
	id12;

const accounts = [
	{
		service_id: "service_tiasju5",
		private_key: "NqngqYKOhNbJ0aN0t",
		template_id: "template_fxfuxe5",
	},
	{
		service_id: "service_n4tb1ha",
		private_key: "553cr3LqBwR3V1yHi",
		template_id: "template_sro3gse",
	},
	{
		service_id: "service_eh22glb",
		private_key: "oq4te25-e_vrky4GI",
		template_id: "template_8y9c0gs",
	},
	{
		service_id: "service_cjhw2oe",
		private_key: "-ocSYzWHneaaZ8UZT",
		template_id: "template_icnqby5",
	},
	{
		service_id: "service_gc9vpzo",
		private_key: "qhGwOj-IOX_k4_Zwd",
		template_id: "template_14i3eyg",
	},
	{
		service_id: "service_37nokyn",
		private_key: "AEVSR73UEzQfljwPE",
		template_id: "template_hodpaud",
	},
	{
		service_id: "service_b1knpny",
		private_key: "dnShHyxYDfuySlqjM",
		template_id: "template_vyuvjc8",
	},
	{
		service_id: "service_uxffrih",
		private_key: "FRKDvLQPDDt4PLBhf",
		template_id: "template_lyfrll2",
	},
	{
		service_id: "service_xn6nsa7",
		private_key: "MIIOq6D9L2EV06G3Z",
		template_id: "template_ea4sfpq",
	},
	{
		service_id: "service_swbf9hg",
		private_key: "aHfhzJXbYdkZSXcie",
		template_id: "template_dpir5fh",
	},
	{
		service_id: "service_xa00ci3",
		private_key: "PUycQm4Vca8CQFXCo",
		template_id: "template_rn63s3x",
	},
];

function debounce13(func, time) {
	if (id13) {
		clearTimeout(id13);
	}

	id13 = setTimeout(func, time);
}

function debounce14(func, time) {
	if (id14) {
		clearTimeout(id14);
	}

	id14 = setTimeout(func, time);
}

function debounce8(func, time) {
	if (id8) {
		clearTimeout(id8);
	}

	id8 = setTimeout(func, time);
}

function debounce9(func, time) {
	if (id9) {
		clearTimeout(id9);
	}

	id9 = setTimeout(func, time);
}

function debounce10(func, time) {
	if (id10) {
		clearTimeout(id10);
	}

	id10 = setTimeout(func, time);
}

function debounce11(func, time) {
	if (id11) {
		clearTimeout(id11);
	}

	id11 = setTimeout(func, time);
}

function debounce12(func, time) {
	if (id12) {
		clearInterval(id12);
	}

	id12 = setTimeout(func, time);
}

const showCircleSVG = (bool) => {
	bool
		? svgCircle.classList.add("showCircle")
		: svgCircle.classList.remove("showCircle");
};

export let submittedForm = false;
export let didntSendEmailDueToError = false;

function showSent(MESSAGE) {
	clearTimeout(id6);
	successText.style.opacity = "0";

	setTimeout(() => {
		successText.innerText = MESSAGE;
		successText.style.display = "none";
		loaderDOM.style.justifyContent = "center";
		// loaderDOM.style.backgroundColor = "#11bd05";
		// loaderDOM.style.width = `${successText.scrollWidth + 50}px`;

		submitLoader.classList.add("load-complete");
		loaderDOM.style.backgroundColor = "#11bd05";
		loaderDOM.style.width = `${submitLoader.scrollWidth + 50}px`;
	}, 200);

	debounce8(() => {
		successMark.style.display = "flex";
		successText.style.display = "none";
	}, 300);

	debounce9(() => {
		successText.style.opacity = "0";

		debounce10(() => {
			loaderDOM.style.width = `${submitLoader.scrollWidth + 50}px`;
		}, 300);

		debounce11(() => {
			loaderDOM.classList.remove("show");
			loaderDOM.classList.add("remove");
			submitLoader.classList.remove("load-complete");
			successMark.style.display = "none";
		}, 600);
	}, 1000);
}

/**
 * Removes the `loading` container
 * @param successText holds the text in the `loading` container
 */
export function removeMessage() {
	successText.style.opacity = "0";

	setTimeout(() => {
		loaderDOM.classList.remove("show");
		loaderDOM.classList.add("remove");
	}, 600);

	setTimeout(() => {
		loaderDOM.style.width = "auto";
	}, 1000);
}

/**
 * This function retries the next api account if the former account returns any error by recursion
 * @param htmlTemplate holds the the users submission in html format to send the to email api and then to the users email address
 *
 */
async function accountRotator(htmlTemplate) {
	let { service_id, private_key, template_id } = accounts[submitCounter];
	// console.log(submitCounter, accounts.length);
	emailjs.send(service_id, template_id, htmlTemplate, private_key).then(
		function () {
			showSent("Form Submitted Successfully");

			showThankYouPage(startQuestion);

			debounce13(() => {
				ContinueButton.style.display = "none";
				BackButton.classList.add("widen");
				showCircleSVG(false);
			}, 400);

			debounce14(() => {
				thankYou.style.display = "flex";
				starterPage.style.display = "none";
				startQuestion.style.display = "none";
				body.classList.add("blurbody");
			}, 600);

			userEmail.value = sessionStorage.getItem("email");
			submittedForm = true;
		},
		function (error) {
			let numOfAccounts = accounts.length - 1;

			submitCounter++;

			/**
			 * Return an error is all api accounts quota has been exhausted
			 */
			if (submitCounter === numOfAccounts) {
				let message;
				if (error.text) {
					message = "please try again later. Thank you.";
				}

				removeMessage();
				animateErrorMessage(
					10000,
					600,
					20,
					`Error occurred : ${message || "no internet connection"}`,
					"show-error-message",
					"remove-error-message"
				);
				console.log(submitCounter, accounts.length);
				submitCounter = 0;
				return;
			}

			debounce12(() => {
				accountRotator(htmlTemplate);
			}, 1000);
		}
	);
}

export default accountRotator;
