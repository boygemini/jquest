"use strict";

import { showThankYouPage } from "./animations.js";
import questions from "./questions.js";
import { animateErrorMessage, setStage, debounce } from "./script.js";

const starterPage = document.querySelector(".q-container");
const startQuestion = document.querySelector(".main-Q-container");
const thankYou = document.querySelector(".thank-you");
const BackButton = document.querySelector(".back-button");
const ContinueButton = document.getElementById("continue");
const userEmail = document.getElementById("email");
const submitLoader = document.querySelector(".circle-loader");
const successMark = document.querySelector(".checkmark");
const loaderDOM = document.querySelector(".loader");
const successText = document.querySelector(".sent-message");

let submitCounter = 0;

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

export let submittedForm = false;
export let didntSendEmailDueToError = false;

export function showSent(MESSAGE) {
	successText.style.opacity = "0";

	setTimeout(() => {
		successText.innerText = MESSAGE;
		successText.style.display = "none";
		loaderDOM.style.justifyContent = "center";

		submitLoader.classList.add("load-complete");
		loaderDOM.style.backgroundColor = "#11bd05";
		loaderDOM.style.width = `${submitLoader.scrollWidth + 50}px`;
	}, 200);

	const debounce1 = debounce(() => {
		successMark.style.display = "flex";
		successText.style.display = "none";
	}, 300);
	debounce1();

	const debounce2 = debounce(() => {
		successText.style.opacity = "0";

		const debounce3 = debounce(() => {
			loaderDOM.style.width = `${submitLoader.scrollWidth + 50}px`;
		}, 300);
		debounce3();

		const debounce4 = debounce(() => {
			loaderDOM.classList.remove("show");
			loaderDOM.classList.add("remove");
			submitLoader.classList.remove("load-complete");
			successMark.style.display = "none";
		}, 600);
		debounce4();
	}, 1000);
	debounce2();
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

	emailjs.send(service_id, template_id, htmlTemplate, private_key).then(
		function () {
			showSent("Form Submitted Successfully");

			showThankYouPage(startQuestion);

			const debounce5 = debounce(() => {
				ContinueButton.style.display = "none";
				BackButton.classList.add("widen");
			}, 400);
			debounce5();

			const debounce6 = debounce(() => {
				thankYou.style.display = "flex";
				starterPage.style.display = "none";
				startQuestion.style.display = "none";
				body.classList.add("blurbody");
			}, 600);
			debounce6();

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

				gsap.to(".control-buttons", {
					opacity: 1,
					y: 0,
					duration: 0.5,
				});

				gsap.to(
					".circle-progress",
					{
						opacity: 1,
					},
					"<"
				);

				removeMessage();
				animateErrorMessage(
					10000,
					600,
					20,
					`Error occurred : ${message || "no internet connection"}`,
					"show-error-message",
					"remove-error-message"
				);

				setStage(questions.length - 1);
				submitCounter = 0;
				return;
			}

			const debounce7 = debounce(() => {
				accountRotator(htmlTemplate);
			}, 1000);
			debounce7();
		}
	);
}

export default accountRotator;
