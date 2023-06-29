"use strict";

import { showThankYouPage } from "./animations.js";
import questions from "./questions.js";
import {
	animateErrorMessage,
	setStage,
	debounce,
	disableButtons,
} from "./script.js";
import accounts from "./config.js";

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

export let submittedForm = false; // Variable to track whether the form has been submitted or not
export let didntSendEmailDueToError = false; // Variable to track if the email couldn't be sent due to an error

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

	// Display the success mark after a debounce of 300 milliseconds
	const debounce1 = debounce(() => {
		successMark.style.display = "flex";
		successText.style.display = "none";
	}, 300);
	debounce1();

	// Hide the success text after a debounce of 1000 milliseconds
	const debounce2 = debounce(() => {
		successText.style.opacity = "0";

		// Adjust the width of the loader DOM element after a debounce of 300 milliseconds
		const debounce3 = debounce(() => {
			loaderDOM.style.width = `${submitLoader.scrollWidth + 50}px`;
		}, 300);
		debounce3();

		// Remove classes and hide elements related to the loader after a debounce of 600 milliseconds
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

	// Remove the "show" class and add the "remove" class to the loaderDOM element after a timeout of 600 milliseconds
	setTimeout(() => {
		loaderDOM.classList.remove("show");
		loaderDOM.classList.add("remove");
	}, 600);

	// Set the width of the loaderDOM element to "auto" after a timeout of 1000 milliseconds
	setTimeout(() => {
		loaderDOM.style.width = "auto";
	}, 1000);
}

/**
 * This function retries the next API account if the former account returns any error by recursion
 * @param htmlTemplate Holds the user's submission in HTML format to send it to the email API and then to the user's email address
 */

async function accountRotator(htmlTemplate) {
	let { service_id, private_key, template_id } = accounts[submitCounter];

	// Send the email using emailjs library
	emailjs.send(service_id, template_id, htmlTemplate, private_key).then(
		function () {
			// Handle successful form submission

			// Display the "Form Submitted Successfully" message
			showSent("Form Submitted Successfully");

			// Show the thank you page and perform related animations
			showThankYouPage(startQuestion);

			// Delayed actions using debouncing
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

			// Set the value of the userEmail field to the saved email from sessionStorage
			userEmail.value = sessionStorage.getItem("email");
			submittedForm = true; // Set the submittedForm flag to true
			disableButtons(false); // Enable the buttons after sucessful submission
		},
		function (error) {
			// Handle email sending error

			let numOfAccounts = accounts.length - 1;

			submitCounter++;

			if (error.status === 412) {
				removeMessage(); // Remove the success/loading message

				// Display error message using animateErrorMessage function
				animateErrorMessage(
					8000,
					600,
					20,
					`Error occurred : Your email address appears to be invalid, please check and resubmit form`,
					"show-error-message",
					"remove-error-message"
				);

				setStage(questions.length - 1); // Set the stage to the last question
				submitCounter = 0; // Reset the submitCounter
				disableButtons(false);
				return;
			}

			// Return an error if all API accounts' quota has been exhausted
			if (submitCounter === numOfAccounts) {
				let message;
				if (error.text) {
					message = "please try again later. Thank you.";
				}

				// Perform animations and display error message
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

				removeMessage(); // Remove the success/loading message

				// Display error message using animateErrorMessage function
				animateErrorMessage(
					8000,
					600,
					20,
					`Error occurred : ${message || "no internet connection"}`,
					"show-error-message",
					"remove-error-message"
				);

				setStage(questions.length - 1); // Set the stage to the last question
				submitCounter = 0; // Reset the submitCounter
				disableButtons(false); // Enable the buttons after sucessful submission
				return;
			}

			// Retry with the next API account after a debounce of 100 milliseconds
			const debounce7 = debounce(() => {
				accountRotator(htmlTemplate);
			}, 100);
			debounce7();
		}
	);

	// Reset for another request
}

export default accountRotator;
