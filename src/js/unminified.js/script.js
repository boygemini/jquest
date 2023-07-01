"use strict";

import Questions from "./questions.min.js";
import {
	backToForm,
	continueDuringSurvey,
	backToWelcome,
	goingOutOfWelcome,
} from "./animations.min.js";
import accountRotator, {
	submittedForm,
} from "../minified.js/accountrotator.min.js";

const body = document.querySelector("#body");
const controlButtons = document.querySelector(".control-buttons");
const textInputFields = document.querySelectorAll(".ads");
const textFieldLabels = document.querySelectorAll("label");
const selectionChoice = document.querySelector(".selection-rule");
export const ContinueButton = document.getElementById("continue");
export const BackButton = document.querySelector(".back-button");
const ChangeEmailButton = document.getElementById("changeemail");
const progressSVG = document.querySelector(".progress");
const progress = document.querySelector(".percentage");
const currentStage = document.querySelector(".current-stage");
const errorMessage = document.querySelector(".error-message");
const loaderDOM = document.querySelector(".loader");
const changeEmailContainer = document.querySelector(".change-email");
const resubmitEmailContainer = document.querySelector(".resubmitmodal");
const editfield = document.getElementById("edit");
const cancel = document.querySelectorAll(".cancel");
const changeEmail = document.querySelectorAll(".saveemail");
const inner = document.querySelector(".inner");
const successText = document.querySelector(".sent-message");
const errorText = document.querySelector(".error-text");
const starterPage = document.querySelector(".q-container");
const startQuestion = document.querySelector(".main-Q-container");
const thankYou = document.querySelector(".thank-you");
const userEmail = document.getElementById("email");
const changeEmailBox = document.querySelector(".email");
const dontResubmitButton = document.querySelector(".no");
const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const buttons = document.querySelectorAll(".btnn");
const menuContainer = document.querySelector(".menu");
const menuCancelButton = document.querySelector(".menu-cancel");
const menuChildren = document.querySelectorAll(".menu-child");
const homeButton = document.querySelector(".home");
const menuChangeEmailButton = document.querySelector(".change");
const menuButton = document.querySelector(".menu-button-container");
const saveNewEmailModal = document.querySelector(".changeemailmodal");
const saveNewEmailButton = document.querySelector(".savemynewemail");
const changeEmailCancelButton = document.querySelector(".changecancel");
const saveNewEmailField = document.querySelector("#changemyemail");
const allModalsAndMenu = document.querySelectorAll(".mod");

const submitLoader = document.querySelector(".circle-loader");
let otfp = false; // If user is on the completion page

// a style names soft
body.classList.add("soft");

// debounce function to control the setTimeout functions
export function debounce(func, time) {
	let id;

	return function (...args) {
		if (id) {
			clearTimeout(id);
		}

		id = setTimeout(() => {
			func.apply(this, args);
		}, time);
	};
}

export const disableButtons = (bool) => {
	buttons.forEach((btn) => {
		if (bool) btn.disabled = true;
		if (!bool) btn.disabled = false;
	});
};

/**
 * Focus the client on the email change field
 */
changeEmailBox.addEventListener("click", (e) => {
	editfield.focus();
	editfield.contentEditable = true;
});

// Stretched the button
ContinueButton.classList.add("widen");

// If the screen is smaller than 480px, the button will be stretched
if (window.screen.availWidth <= 480) {
	currentStage.x.baseVal[0].value = 100;
	currentStage.y.baseVal[0].value = 145;
	ContinueButton.classList.add("widen");
}

// Object holding all user's entries
let USERS_FILE = new Object({
	1: {},
	2: {},
	3: {},
	4: {},
	5: {},
	6: {},
	7: {},
	8: {},
	9: {},
	10: {},
	11: {},
	12: {},
	13: {},
	14: {},
	15: {},
	16: {},
	17: {},
	18: {},
	19: {},
	20: {},
});

// Function to save the users progress in the browsers session storage
export function setStage(stage) {
	sessionStorage.setItem("form-stage", stage.toString());
}

// Stage is set to zero initally
setStage(0);

// Function to recover the user's current stage on the form
export function currentFormStage() {
	let stage = parseInt(sessionStorage.getItem("form-stage"));
	return stage;
}

// Function to resent the form i.e if the user changes their primary area of experitise
function reset() {
	let filled = Object.entries(USERS_FILE)
		.map((f) => f[1])
		.filter((a) => Object.keys(a).length > 0); // returns objects with user privided answers

	// Now if the user already started the form its been the USERS_FILE is resent to original
	if (filled.length > 1) {
		// Show reset notification
		animateErrorMessage(
			3000,
			600,
			20,
			"Survey has been reset because you changed your Primary Area Of Expertise.",
			"show-reset-message",
			"remove-reset-message"
		);

		USERS_FILE = {
			1: {},
			2: {},
			3: {},
			4: {},
			5: {},
			6: {},
			7: {},
			8: {},
			9: {},
			10: {},
			11: {},
			12: {},
			13: {},
			14: {},
			15: {},
			16: {},
			17: {},
			18: {},
			19: {},
			20: {},
		};
	}
}

// Controlling the Email Field's onfocus and onblur events
[textFieldLabels, textInputFields].forEach((element) => {
	element.forEach((el) => {
		let eventTypes = ["click", "focus"];

		// Add event listeners for click and focus events
		eventTypes.forEach((eType) => {
			el.addEventListener(eType, (e) => {
				if (e.target.nodeName === "LABEL") {
					// If the event target is a label, focus the next sibling input element and trigger a click event
					e.target.nextElementSibling.focus();
					e.target.nextElementSibling.click();
				}

				if (e.target.nodeName === "INPUT") {
					// If the event target is an input, apply styling changes
					e.target.offsetParent.children[1].style.border = "1px solid #2260ff";
					e.target.offsetParent.firstElementChild.classList += " move-up";
				}
			});
		});
	});

	element.forEach((el) => {
		el.addEventListener("blur", (e) => {
			if (e.target.classList.value.includes("ads")) {
				// Check if the input element has the "ads" class

				try {
					if (e.target.value.trim().length === 0) {
						// If the input value is empty, remove styling changes
						e.target.offsetParent.firstElementChild.classList.remove("move-up");
						e.target.offsetParent.children[1].style.border = "";
					}
				} catch (error) {}
			}
		});
	});
});

// Apply initial styling changes if the first text input field has a value
if (textInputFields[0].value.length > 0) {
	textInputFields[0].offsetParent.firstElementChild.classList += " move-up";
	textInputFields[0].offsetParent.children[1].style.border =
		"1px solid #2260ff";
}

// Menu
function openMenu() {
	// Open the menu
	menuContainer.style.display = "flex";
	gsap.fromTo(
		menuContainer,
		{
			x: -100,
			opacity: 0,
		},
		{
			x: 0,
			opacity: 1,
			duration: 0.8,
			ease: "power4.out",
		}
	);

	menuChildren.forEach((menu) => {
		gsap.fromTo(
			menu,
			{
				x: -100,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.15,
			},
			"<20%"
		);
	});
}

function closeMenu() {
	// Close the menu

	menuChildren.forEach((menu) => {
		if (menu.classList.value.includes("home")) {
			gsap.fromTo(
				menu,
				{
					x: 0,
					opacity: 1,
				},
				{
					x: -100,
					opacity: 0,
					duration: 0.25,
				}
			);
		}

		if (!menu.classList.value.includes("home")) {
			gsap.fromTo(
				menu,
				{
					x: 0,
					opacity: 1,
				},
				{
					x: -100,
					opacity: 0,
					duration: 0.25,
				},
				"<25%"
			);
		}
	});

	gsap.fromTo(
		menuContainer,
		{
			x: 0,
			opacity: 1,
		},
		{
			x: -100,
			opacity: 0,
			duration: 0.5,
			ease: "power4.out",
		},
		">"
	);

	debounce(() => {
		menuContainer.style.display = "none";
	}, 800)();
}

// Function to show the change email modal
function showChangeEmailModal() {
	closeMenu();
	saveNewEmailModal.style.display = "flex";

	gsap.to(saveNewEmailModal, {
		opacity: 1,
		duration: 0.3,
	});
}

// Function to validate and save a new user email
function validateAndSaveNewUserEmail() {
	let email = saveNewEmailField.value.trim();

	if (emailRegex.test(email)) {
		sessionStorage.setItem("email", email);
		saveNewEmailField.classList.remove("empty-email-field");
		closeModal();
		userEmail.focus();
		userEmail.value = email;
	}

	if (!emailRegex.test(email)) {
		saveNewEmailField.classList.add("empty-email-field");
		animateErrorMessage(
			3000,
			600,
			20,
			"Please enter a valid email address.",
			"show-error-message",
			"remove-error-message"
		);
	}
}

// Function to go back to the home page
function goHome() {
	closeMenu();
	backToWelcome();
	debounce(() => {
		starterPage.style.display = "flex";
		ContinueButton.classList.add("widen");
		ContinueButton.style.display = "flex";
		BackButton.style.display = "none";
		body.classList.remove("blurbody");
		setStage(0);
	}, 450)();
}

// Function to close the modal
function closeModal() {
	gsap.to(changeEmailContainer, {
		opacity: 0,
		duration: 0.25,
	});

	gsap.to(resubmitEmailContainer, {
		opacity: 0,
		duration: 0.25,
	});

	gsap.to(saveNewEmailModal, {
		opacity: 0,
		duration: 0.25,
	});

	window.addEventListener("keydown", entkeydownHandler);
	window.addEventListener("keydown", lrkeydownHandler);

	// Delayed function to hide the changeEmailContainer and resubmitEmailContainer after the animations finish
	debounce(() => {
		changeEmailContainer.style.display = "none";
		resubmitEmailContainer.style.display = "none";
		saveNewEmailModal.style.display = "none";
	}, 250)();
}

// Event listener for the home button click
homeButton.onclick = () => goHome();

// Event listener for the change email cancel button click
changeEmailCancelButton.onclick = () => closeModal();

// Event listener for the menu change email button click
menuChangeEmailButton.onclick = () => showChangeEmailModal();

// Event listener for the menu cancel button click
menuCancelButton.onclick = () => closeMenu();

// Event listener for the menu button click
menuButton.onclick = () => openMenu();

// Event listener for the save new email button click
saveNewEmailButton.onclick = () => validateAndSaveNewUserEmail();

// Event listener for the keydown event on the save new email field
saveNewEmailField.onkeydown = (e) => {
	if (e.key === "Enter") {
		window.removeEventListener("keydown", entkeydownHandler);
		validateAndSaveNewUserEmail();
	}

	if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
		window.removeEventListener("keydown", lrkeydownHandler);
	}
};

// Event listener for the window click
window.onclick = (e) => {
	if (!e.target.classList.value.includes("mod")) {
		closeMenu();
	}
};

// Error Message Animation
export function animateErrorMessage(
	ERROR_MESSAGE_DURATION,
	ERROR_MESSAGE_ANIMATION_DURATION,
	INITIAL_ERROR_MESSAGE_WIDTH,
	ERROR_MESSAGE,
	SHOW_ERROR_CLASS,
	REMOVE_ERROR_CLASS
) {
	// Turns the email field bg color to red
	errorText.innerText = ERROR_MESSAGE;
	const errorMessageNodeWidth = errorText.scrollWidth + 30;

	// Remove the reove-error-message and add show-error-message class to show the error message
	let showErrorName = ["remove-error-message", "remove-reset-message"];
	for (let className of showErrorName) {
		errorMessage.classList.remove(className);
	}
	errorMessage.classList.add(SHOW_ERROR_CLASS);

	if (window.screen.availWidth <= 1024 && currentFormStage() > 0) {
		gsap.to(".circle-progress", { opacity: 0, duration: 0.3 });
	}

	// Set the Error Message Container width to 20px
	if (window.screen.availWidth >= 1024) {
		errorMessage.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;
	}

	if (window.screen.availWidth < 1024) {
		errorMessage.style.width = "100%";
	}

	// After 300 millisecs set the Error Message container width to its full width
	const debounce1 = debounce(() => {
		if (window.screen.availWidth >= 1024) {
			errorMessage.style.width = errorMessageNodeWidth + "px";
			return;
		}

		errorMessage.style.width = "100%";
	}, ERROR_MESSAGE_ANIMATION_DURATION / 2);
	debounce1();

	// After 600 millisecs make the error message text obvious
	const debounce2 = debounce(() => {
		errorText.style.opacity = "1";
	}, ERROR_MESSAGE_ANIMATION_DURATION);
	debounce2();

	// After 3secs Remove the Error Message
	const debounce3 = debounce(() => {
		// The error message classlist
		let errorMessageClassLists = ["show-error-message", "show-reset-message"];

		// if the client's screen is >= 1024, the error messageDOM would first resize to about
		// 20px before expanding to its full width
		if (window.screen.availWidth >= 1024) {
			errorMessage.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;
		}

		// The error text is originally set to 0 opacity
		errorText.style.opacity = "0";

		const debounce4 = debounce(() => {
			// if any of the classes in the array about at < showErrorName >
			// is present in the error messageDOM classlist, it should be removed
			for (let className of errorMessageClassLists) {
				errorMessage.classList.remove(className);
			}

			// Add the new classist for the new error to be displayed
			errorMessage.classList.add(REMOVE_ERROR_CLASS);
		}, ERROR_MESSAGE_ANIMATION_DURATION / 2);
		debounce4();

		if (window.screen.availWidth <= 1024 && currentFormStage() > 0) {
			gsap.to(".circle-progress", { opacity: 1, duration: 0.3, delay: 0.6 });
		}
	}, ERROR_MESSAGE_DURATION);
	debounce3();

	// After 3+ millsecs reset the Error Message container and text container
	const debounce5 = debounce(() => {
		if (window.screen.availWidth >= 1024) {
			errorMessage.style.width = "auto";
		}

		if (window.screen.availWidth < 1024) {
			errorMessage.style.width = "100%";
		}

		// Reverts the email field's color back to normal
		userEmail.classList.remove("empty-email-field");
	}, ERROR_MESSAGE_DURATION + ERROR_MESSAGE_ANIMATION_DURATION);
	debounce5();
}

// Function to show indicate that the form is making a submit request
/**
 *
 * @param {*} MESSAGE
 * @param successText is the text inside the form-submit loader box
 * @param loaderDOM is the form-submit box
 * @param submitLoader is the loader/spinner inside
 */
function showSending(MESSAGE) {
	// Set the success text opacity to 0 and update the text content with the provided message
	successText.style.opacity = "0";
	successText.innerText = MESSAGE;

	// Set the width of the loaderDOM element to accommodate the submit loader and additional padding
	loaderDOM.style.width = submitLoader.scrollWidth + 50 + "px";

	// Remove the "remove-error-message" class and add the "show-error-message" class to show the loader
	loaderDOM.classList.remove("remove");
	loaderDOM.classList.add("show");

	// Set the background color of the loaderDOM to orange
	loaderDOM.style.backgroundColor = "orange";

	// Perform additional animations and adjustments for screens wider than 767px
	if (screen.width > 1024) {
		// Use debouncing to delay the execution of certain actions

		// Debounce function to adjust the layout after a delay
		const debounce6 = debounce(() => {
			successText.style.display = "flex";
			loaderDOM.style.justifyContent = "flex-start";
			loaderDOM.style.width =
				submitLoader.scrollWidth + successText.scrollWidth + 50 + "px";
		}, 700);
		debounce6();

		// Debounce function to make the success text more visible after a delay
		const debounce7 = debounce(() => {
			successText.style.opacity = "1";
		}, 900);
		debounce7();
	}
}

// Function to validate email
function validateEmail(userEmail, step) {
	let email = userEmail;

	// Check if the email is valid using a regular expression
	if (!emailRegex.test(email)) {
		// If the email is invalid, animate an error message and return false
		animateErrorMessage(
			3000,
			600,
			20,
			"Please enter a valid email address.",
			"show-error-message",
			"remove-error-message"
		);
		return false;
	}

	if (emailRegex.test(email)) {
		// If the email is valid, go to the next stage
		if (step <= Questions.length - 1) {
			step + 1;
		}

		return true;
	}
}

// This function controls the progress circle svg showing the user's progress
function animateProgress(step) {
	// Retrieve the filled answers from USERS_FILE and filter out objects with user-provided answers
	let filled = Object.entries(USERS_FILE)
		.map((f) => f[1])
		.filter((a) => Object.keys(a).length > 0);

	let totalQuestions = Object.keys(USERS_FILE).length;
	let completedPercentage = Math.floor((filled.length / totalQuestions) * 100);
	let svgPercentage = Math.floor((completedPercentage / 100) * 502);

	// Update the progress circle SVG
	progressSVG.style.transition = ".5s";
	progressSVG.style.strokeDashoffset = 502 - svgPercentage;
	progress.innerHTML = `${completedPercentage}%`;

	// Update the current stage information
	step >= Questions.length
		? (currentStage.innerHTML = `${step - 1} / ${totalQuestions}`)
		: (currentStage.innerHTML = `${step} / ${totalQuestions}`);
}

// Function to send html email
function sendEmail(email) {
	let filled = Object.entries(USERS_FILE)
		.map((f) => f[1])
		.filter((a) => Object.keys(a).length === 0); // check is all objects in the USERS_FILE is filled

	if (filled.length === 0) {
		let file = Object.values(USERS_FILE);
		let nArr = [];

		// Iterate over the elements in the 'file' array
		for (let i in file) {
			// Check if the current index matches certain conditions
			if (i === "2" || i === "8" || i === "9") {
				// Join all the answerText values in the current array together in a string, separated by commas
				nArr = [
					...nArr,
					Object.values(file[i])
						.map((list) => list.answerText)
						.join(", "),
				];
			} else {
				// Add the answerText value of the first element in the current array to 'nArr'
				nArr = [...nArr, Object.values(file[i])[0].answerText];
			}
		}

		let xa = "";

		// This function adds the user's chosen area of expertise to the current question to be sent to the user's email
		const see = (i) => {
			if (i === 2 || i === 3) {
				// If the current index is 2 or 3, append the user's chosen area of expertise to the current question
				return Questions[i].question + nArr[0];
			} else {
				// Otherwise, return the original question without appending the user's chosen area of expertise
				return Questions[i].question;
			}
		};

		// This are the boxes holding each questions and answers to be displayed in html format in the users email
		for (let i = 1; i <= nArr.length; i++) {
			xa += `<div id="test"
						style="background-color: #344854;
						padding: 15px;
						border-radius:5px;
						width:auto;
						max-width:650px;
						text-align:left !important;
						margin-top:30px">
							<h1
							style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
							font-weight:400;
							font-size: 1rem;
							letter-spacing:.3px;
							padding: 0px;
							border-radius: 5px;
							width: auto;
							text-align:left !important;
							color:whitesmoke; ">${see(i)}</h1>
							<p class="ra"
							style="color:#344654;
							font-size:0.9rem;
							padding:15px;
							background-color: #f2c744;
							background: linear-gradient(
								310deg,
								#f2c745 0%,
								#f3c144 33%,
								#f3bc44 48%,
								#f4b643 58%,
								#f4b043 67%,
								#f3aa44 76%,
								#f3a444 84%,
								#f29e45 100%
							);
							border:none;
							border-radius:4px;
							font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
							font-weight: 600;
							text-align:left !important;
							margin-top:15px  !important"
							margin-bottom:0  !important>${nArr[i - 1]}</p>
					</div>`;
		}

		// the full html
		let html = `<!DOCTYPE html>
						<html>
						<head>
							<meta charset="UTF-8">
							<title>Email Template</title>
							<link rel="preconnect" href="https://fonts.googleapis.com">
							<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
							<link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans&display=swap" rel="stylesheet">

							<style>
							*{
								padding:0;
								margin:0;
								box-sizing:border-box;
							}
								body {
									font-family: 'Open Sans',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;;
								}

								@media only screen and (max-width:600px){
									#body{}
								}

								.end{
									padding:7px 10px;
									border-radius:3px;
									background-color:#344654
									color:  #f2c744;
								}
							</style>
						</head>
						<body
						id="body"
						style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
						margin: 0;
						border-radius:0px;
						font-size: 14px;
						line-height: 1.6;
						padding:0 !important;
						color: #333333;">

							<table
							width="100%"
							border="0"
							cellspacing="0"
							cellpadding="0" align="center">

								<tr align="center">
									<td
									align="center"
									valign="top"
									style="">
										<table
										align="center"
										width="100%"
										border="0"
										cellspacing="00"
										cellpadding="00"
										style="width:100%;
										max-width:900px;
										border-collapse: seperate;
										border-spacing: 0px;
										margin: auto;
										display:flex;
										justify-content:center;
										background-color: white;
										padding-bottom:10px">
										<tbody align="center"
											style="width:100% !important;
											padding:0px">
												<tr
												align="center"
												style="width:100% !important;
												padding:0px">
													<td
													align="start"
													valign="top"
													style="width:100%;
													padding:0px;
													color:white; ">
													<h1
														style="color:#344854;
														text-align:left !important;">🎉 Hurray!</h1>
													<p
													style="
													font-size:.9rem;
													margin-top:15px;
													color:#344854;
													text-align:left !important;">Below are your answers to each Questions asked</p>
														${xa}
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</table>
						</body>
						</html>`;

		const debounce8 = debounce(() => {
			showSending("Submitting Form...");

			// If device's screen width is less than 415px fade out the progress circle svg
			if (window.screen.availWidth <= 415)
				gsap.to(".circle-progress", { opacity: 0, duration: 0.25 });

			window.removeEventListener("keydown", lrkeydownHandler);
			window.removeEventListener("keydown", entkeydownHandler);
			disableButtons(true); // Disable buttons while form is submitting
		}, 500);
		debounce8();

		// HTML and user info and my email is put in the reply to field
		let htmlTemplate = {
			my_html: html,
			user: email,
			reply_to: "gbadebojubril@gmail.com",
		};

		const debounce9 = debounce(() => {
			// Function controlling the form send/submit
			accountRotator(htmlTemplate);
		}, 2000);
		debounce9();
	}
}

// Display the logo as fixed if the user is at the home page devices screen is less that 768 px
function lockLogo(step) {
	if (step === 0 && window.screen.availWidth <= 767) {
		document.querySelector(".logo").style.position = "fixed";
	}

	if (step > 0 && window.screen.availWidth <= 767) {
		document.querySelector(".logo").style.position = "relative";
	}
}
lockLogo(0);

// Function to proceed to the next of the form
function gotoNextStep(step, question) {
	const answersField = document.querySelector(".answer-field");
	const questionElement = document.querySelector(".Question");

	// Proceed to QA if email address field is filled
	if (step === 0) {
		// Save User's email is inputed
		let emailIsEmpty = userEmail.value.trim().length === 0;

		// Show Error Message if the email field is empty
		if (emailIsEmpty) {
			userEmail.classList.add("empty-email-field");
			animateErrorMessage(
				3000,
				600,
				20,
				"Please enter your email address to continue.",
				"show-error-message",
				"remove-error-message"
			);
			return;
		}

		// Proceed to validate user's email
		if (!emailIsEmpty) {
			if (!validateEmail(userEmail.value.trim(), step)) {
				userEmail.classList.add("empty-email-field");
				return;
			}

			// Animation function
			goingOutOfWelcome();

			// Save the user's email address to the local storage
			sessionStorage.setItem("email", userEmail.value.trim());
		}
	}

	// Control the form steps
	step++;
	lockLogo(step);
	// If user is still filling the form
	if (step >= question.length) {
		inner.innerText = sessionStorage.getItem("email");

		// If user already subitted form once but made attept to resubit
		if (submittedForm === true) {
			// Show the modal asking if the user wants to resubmit the form
			resubmitEmailContainer.style.display = "flex";
			gsap.fromTo(
				resubmitEmailContainer,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.3,
				}
			);

			// If user clicks no
			dontResubmitButton.onclick = () => {
				gsap.fromTo(
					resubmitEmailContainer,
					{
						opacity: 1,
					},
					{
						opacity: 0,
						duration: 0.3,
					}
				);

				gsap.to(
					".control-buttons",
					{
						opacity: 1,
						y: 0,
					},
					"<50%"
				);

				gsap.to(
					".circle-progress",
					{
						opacity: 1,
					},
					"<"
				);

				// Remove the modal
				const debounce10 = debounce(() => {
					resubmitEmailContainer.style.display = "none";
				}, 400);
				debounce10();

				// revert to the current step and saves it
				// this is because the moment the user makes the attempt to make another submit the form stage
				// has already been incremented by 1 so solve that i reverted it back to the right stage
				step = step - 1;
				setStage(step);
			};
		}

		// Submit form immediate if user has never submitted form
		if (submittedForm === false) {
			sendEmail(sessionStorage.getItem("email"));
		}

		// Track progress (SVG)
		animateProgress(20);

		// to stop the step++ from going past the number of the total form questions
		step = question.length;
	}

	// Start form when the user click the Let's Get Started button
	if (step <= question.length && step > 0) {
		// Put off the welcome page and put on the QA page
		body.classList.add("soft");
		controlButtons.classList.add("csoft");
		thankYou.style.display = "none"; // dont display the thank you page in other works the completion page

		const debounce11 = debounce(() => {
			ContinueButton.children[0].innerText = "Continue";
			ContinueButton.style.display = "flex";
			BackButton.style.display = "flex";
			ContinueButton.classList.remove("widen");
			BackButton.classList.remove("widen");
		}, 500);
		debounce11();

		try {
			ChangeEmailButton.style.display = "none";
		} catch (error) {}

		// Show error message is no option is selected
		try {
			if (Object.keys(USERS_FILE[step - 1])) {
				// If the User Object for the paticular step is empty, show the error message
				if (Object.keys(USERS_FILE[step - 1]).length === 0) {
					animateErrorMessage(
						3000,
						600,
						20,
						"Please select an option",
						"show-error-message",
						"remove-error-message"
					);
					return;
				}
			}
		} catch (error) {}

		// Animation while the user is still filling the form
		if (step <= question.length - 1 && step > 1) {
			continueDuringSurvey(questionElement, answersField);
		}

		const debounce12 = debounce(() => {
			// the if is just to double check for unnecessary errors
			if (question[step]) {
				// Display Question
				questionElement.innerHTML =
					`<h1 class="qnumbering">Question ${step} of ${
						question.length - 1
					}</h1>` + askQuestionsInteractively(step, question);

				// Display Answers
				displayAnswersInteractively(answersField, step, question);
			}
		}, 500);
		debounce12();
	}

	// Saves form current stage
	setStage(step);

	// Animate progress forwards
	animateProgress(currentFormStage());
}

// Function to revert to the previous step in the form
function gotoPreviousStep(step, question) {
	const answersField = document.querySelector(".answer-field");
	const questionElement = document.querySelector(".Question");

	// Decrease the step/form stage by 1 each time the user clicks the Back button
	step--;
	if (step <= 0) {
		step = 0;
	}

	debounce(() => {
		lockLogo(step);
	}, 500);

	// Save the progress
	setStage(step);

	// Animate progress backwards
	animateProgress(currentFormStage());

	// If the user is at the thank you page and clicks to go back, the animation is displayed and the page's blur class is removed
	if (step === parseInt(Object.keys(USERS_FILE).length)) {
		backToForm(startQuestion, questionElement, answersField);
		controlButtons.style.display = "flex";
		body.classList.remove("blurbody");
	}

	if (currentFormStage() === 0) {
		controlButtons.style.display = "flex";
		body.classList.remove("blurbody");
	}

	// If the user is back at the home page
	if (step <= 0 || currentFormStage() === 0) {
		thankYou.style.display = "none";

		// Debounce function to delay execution of the animation
		const debounce13 = debounce(() => {
			BackButton.style.display = "none";
			ContinueButton.classList.add("widen");
			controlButtons.classList.remove("csoft");
			startQuestion.style.display = "none";
			starterPage.style.display = "flex";
		}, 500);
		debounce13();

		// Run the back-to-home animation
		backToWelcome();
		return;
	}

	// If the user clicks to start the form again
	if (step > 0) {
		if (step < parseInt(Object.keys(USERS_FILE).length)) {
			continueDuringSurvey(questionElement, answersField);
		}

		setTimeout(() => {
			ContinueButton.style.display = "flex";
			BackButton.style.display = "flex";
			BackButton.classList.remove("widen");
			ContinueButton.classList.remove("widen");
		}, 500);

		// Display Questions and Answers
		setTimeout(() => {
			// Display Question
			questionElement.innerHTML =
				`<h1 class="qnumbering">Question ${step} of ${
					question.length - 1
				}</h1>` + askQuestionsInteractively(step, question);

			// Display Answers
			displayAnswersInteractively(answersField, step, question);
		}, 500);
	}
}

function markAlreadyChosenSelections(step) {
	// This function marks the already chosen selections by adding appropriate styles

	const answers = document.querySelectorAll(".ans-box"); // Selecting all the options
	let chosen = Object.entries(USERS_FILE[step]).map((c) => c[0]); // Getting the IDs of the chosen options

	// Adding styles to mark the chosen options
	answers.forEach((ans) => {
		chosen.filter((ch) => {
			if (ans.dataset.id === ch) {
				if (ans.classList.value.includes("textonlybox")) {
					addCheckAnimationForTextBoxOnly(ans.children[0], ans);
				}

				if (ans.classList.value.includes("text-imgbox")) {
					addCheckAnimationForImgTextBox(ans.children[0], ans);
				}

				if (ans.classList.value.includes("bare-ans")) {
					addCheckAnimationForIconAndText(ans.children[0], ans);
				}

				if (ans.classList.value.includes("two-ans")) {
					addCheckAnimationForTwoAns(ans.children[0], ans);
				}
			}
		});
	});
}

// I.e if the user chose that he/she is a frontEnd Dev, the questions on the next stages asks 'how long have you been a frontEnd Dev'
function askQuestionsInteractively(step, question) {
	// This function generates the interactive question based on the current step and the question object

	switch (step) {
		case 2:
		case 3:
			// For step 2 and 3, retrieve the answers from USERS_FILE[1] and generate the question
			let answers = [];

			for (let i in USERS_FILE[1]) {
				answers.push(USERS_FILE[1][i].answerText);
			}

			return `${question[step].question} ${answers[0]} ?`;

		default:
			// For other steps, simply return the question
			return question[step].question;
	}
}

// Display the options to the user
function displayAnswersInteractively(answersField, step, question) {
	let listCl = [
		"eight-ans-grid",
		"icon-text-ans",
		"continous-two",
		"ans-with-4ans-textonly",
		"ans-with-5option-textonly",
		"straight-ans",
		"ans-with-2options",
	];

	// Remove the style of the container holding the options as required by the form's current stage to be updated later below
	listCl.forEach((a) => {
		if (answersField.classList.value.includes(a)) {
			answersField.classList.remove(a);
		}
	});

	function display(index, ans) {
		// Empty the Answers Field/Container
		answersField.innerHTML = "";

		setTimeout(() => {
			switch (step) {
				// Text and big image
				case 1:
				case 9:
				case 10:
					answersField.innerHTML += `
					<div class="text-imgbox ans-box" id="ss" data-answer="${ans.text}" data-id="${index}">
						<div class="checker2" data-answer="${ans.text}" data-id="${index}" ></div>
						<div class="image-container2" style="background-image:url(${ans.img})" data-answer="${ans.text}" data-id="${index}">
							<div class="shade" data-answer="${ans.text}" data-id="${index}">
								<h2 class="ans-text img-ans-text"  data-answer="${ans.text}" data-id="${index}">${ans.text}</</h2>
							</div>
						</div>

					</div>`;
					break;

				// 2-Options Only
				case 11:
					answersField.classList.add("ans-with-2options");
					answersField.innerHTML += `<div class="two-ans ans-box" id="two-ans-box" data-answer="${ans.text}" data-id="${index}">
					<div class="tools-ans-checker"></div>
					<div id ="two-ans-logo-disp" style='background-image:url("${ans.img}")'  class="ans-logo" data-answer="${ans.text}" data-id="${index}"></div>
						<p class="textt" data-answer="${ans.text}" data-id="${index}"> ${ans.text}</p>
					</div>`;
					break;

				// Text Only
				case 2:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 13:
				case 14:
				case 15:
				case 16:
				case 17:
				case 18:
				case 19:
				case 20:
				case 12:
					answersField.innerHTML += `
					<div class="textonlybox ans-box" data-answer="${ans.text}" data-id="${index}">
						<div class="text-checker" data-answer="${ans.text}" data-id="${index}"></div>
						<div class="text-content" data-answer="${ans.text}" data-id="${index}">
							<p class="box-text" data-answer="${ans.text}" data-id="${index}">${ans.text}</p>
						</div>
					</div>`;
					break;

				// With software logo and text
				case 3:
					answersField.innerHTML += `
					<div class="bare-ans ans-box" data-answer="${ans.text}" data-id="${index}">
					<div class="tools-ans-checker"></div>
					<div id ="logo-disp" style='background-image:url("${ans.img}")'  class="ans-logo" data-answer="${ans.text}" data-id="${index}"></div>
						<p data-answer="${ans.text}" data-id="${index}"> ${ans.text}</p>
					</div>`;
					break;

				default:
					break;
			}

			// Changes style of the container holding the options as required by the form's current stage
			switch (step) {
				case 1:
				case 9:
				case 10:
					answersField.classList.add("eight-ans-grid");
					break;

				case 3:
					answersField.classList.add("icon-text-ans");
					break;

				case 13:
					answersField.classList.add("continous-two");
					break;

				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 14:
				case 15:
					answersField.classList.add("ans-with-4ans-textonly");
					break;

				case 16:
				case 17:
				case 18:
				case 12:
					const allBox2 = document.querySelectorAll(".ans-box");
					allBox2.forEach((box) => box.classList.add("five-texts-ans"));
					answersField.classList.add("ans-with-5option-textonly");
					break;

				case 19:
				case 20:
				case 2:
					answersField.classList.add("straight-ans");
					break;

				default:
					break;
			}

			// Handling the option clicks
			handleAnswers(step);
		}, 0);
	}

	// The core function to display answers
	if (question[step].answers[0].text) {
		// If the answers contain text, iterate through each answer and display them
		question[step].answers.forEach((ans, index) => {
			// Fill up the Answers Field
			display(index, ans);
		});
	}

	if (!question[step].answers[0].text) {
		// If the answers do not contain text, determine the user's primary area of expertise
		let primaryAreaOfExpertise = parseInt(Object.keys(USERS_FILE[1])[0]); // returns the user-filled primary area of expertise

		function returnMatchingAnswers(aIndex) {
			// This function displays the options related to the user's field of expertise
			question[step].answers[aIndex].forEach((ans, index) => {
				display(index, ans);
			});
		}

		// Based on the user's primary area of expertise, return the matching answers
		switch (primaryAreaOfExpertise) {
			case 0:
			case 2:
				returnMatchingAnswers(0);
				break;
			case 1:
			case 3:
				returnMatchingAnswers(1);
				break;
			case 4:
				returnMatchingAnswers(2);
				break;
			case 5:
				returnMatchingAnswers(3);
				break;
			case 6:
				returnMatchingAnswers(4);
				break;
			case 7:
				returnMatchingAnswers(5);
				break;
			default:
				return;
		}
	}
}

// Just as named ...
// This function adds the "checked2" class to the image-text box checker to display the check animation
const addCheckAnimationForImgTextBox = (checkerDir) => {
	let checker = checkerDir;
	checker.classList.add("checked2");
};

// This function removes the "checked2" class from the image-text box checker to hide the check animation
const removeCheckAnimationForImgTextBox = (checkerDir) => {
	let checker = checkerDir;
	checker.classList.remove("checked2");
};

// This function adds the "text-checked" class to the text-only box checker and the "textcontainer-checked"
// class to the container to display the check animation
const addCheckAnimationForTextBoxOnly = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.add("text-checked");
	container.classList.add("textcontainer-checked");
};

// This function removes the "text-checked" class from the text-only box checker and the "textcontainer-checked"
// class from the container to hide the check animation
const removeCheckAnimationForTextBoxOnly = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.remove("text-checked");
	container.classList.remove("textcontainer-checked");
};

// This function adds the "opacity" class to the icon and text box checker and the "tools-ans-checked"
// class to the container to display the check animation
const addCheckAnimationForIconAndText = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.add("opacity");
	container.classList.add("tools-ans-checked");
};

// This function removes the "opacity" class from the icon and text box checker and the "tools-ans-checked"
// class from the container to hide the check animation
const removeCheckAnimationForIconAndText = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.remove("opacity");
	container.classList.remove("tools-ans-checked");
};

// This function adds the "opacity" class to the two-ans box checker and the "two-ans-container-checked"
// class to the container to display the check animation
const addCheckAnimationForTwoAns = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.add("opacity");
	container.classList.add("two-ans-container-checked");
};

// This function removes the "opacity" class from the two-ans box checker and the "two-ans-container-checked"
// class from the container to hide the check animation
const removeCheckAnimationForTwoAns = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.remove("opacity");
	container.classList.remove("two-ans-container-checked");
};

// This function adds the appropriate class to the clicked option to mark it as clicked
function addClass(e) {
	// Store the clicked option and its parent elements in an array
	let boxlist = [
		e.target,
		e.target.parentElement,
		e.target.parentElement.parentElement,
		e.target.parentElement.parentElement.parentElement,
	];

	for (let i in boxlist) {
		// Check if the option is an image-text box
		if (boxlist[i].classList.value.includes("text-imgbox")) {
			// Add the check animation for the image-text box
			addCheckAnimationForImgTextBox(boxlist[i].children[0], boxlist[i]);
			break;
		}

		// Check if the option is a text-only box
		if (boxlist[i].classList.value.includes("textonlybox")) {
			// Add the check animation for the text-only box
			addCheckAnimationForTextBoxOnly(boxlist[i].children[0], boxlist[i]);
			break;
		}

		// Check if the option is an icon and text box
		if (boxlist[i].classList.value.includes("bare-ans")) {
			// Add the check animation for the icon and text box
			addCheckAnimationForIconAndText(boxlist[i].children[0], boxlist[i]);
			break;
		}

		// Check if the option is a two-ans box
		if (boxlist[i].classList.value.includes("two-ans")) {
			// Add the check animation for the two-ans box
			addCheckAnimationForTwoAns(boxlist[i].children[0], boxlist[i]);
			break;
		}
	}
}

// This function removes the clicked option's marking to indicate that it has been clicked
function removeClass(e) {
	// Store the clicked option and its parent elements in an array
	let boxlist = [
		e.target,
		e.target.parentElement,
		e.target.parentElement.parentElement,
		e.target.parentElement.parentElement.parentElement,
	];

	for (let i in boxlist) {
		// Check if the option is an image-text box
		if (boxlist[i].classList.value.includes("text-imgbox")) {
			// Remove the check animation for the image-text box
			removeCheckAnimationForImgTextBox(boxlist[i].children[0], boxlist[i]);
			break;
		}

		// Check if the option is a text-only box
		if (boxlist[i].classList.value.includes("textonlybox")) {
			// Remove the check animation for the text-only box
			removeCheckAnimationForTextBoxOnly(boxlist[i].children[0], boxlist[i]);
			break;
		}

		// Check if the option is an icon and text box
		if (boxlist[i].classList.value.includes("bare-ans")) {
			// Remove the check animation for the icon and text box
			removeCheckAnimationForIconAndText(boxlist[i].children[0], boxlist[i]);
			break;
		}

		// Check if the option is a two-ans box
		if (boxlist[i].classList.value.includes("two-ans")) {
			// Remove the check animation for the two-ans box
			removeCheckAnimationForTwoAns(boxlist[i].children[0], boxlist[i]);
			break;
		}
	}
}

/**
 * Mark ans save the clicked option
 * @param {*} bool if the form currect stage allows users to choose more than one option or not
 * @param {*} answers all the options in the forms current stage
 * @param {*} step current fro stage
 */
function markAndSaveSelections(bool, answers, step) {
	if (!bool) {
		selectionChoice.innerText = "Please select only one.";
		answers.forEach((ans) => {
			ans.addEventListener("click", (e) => {
				let pickedAnswer = e.target; // To get the option ID and text

				answers.forEach((ans) => {
					if (ans.classList.value.includes("text-imgbox")) {
						removeCheckAnimationForImgTextBox(ans.children[0], ans);
						return;
					}

					if (ans.classList.value.includes("textonlybox")) {
						removeCheckAnimationForTextBoxOnly(ans.children[0], ans);
						return;
					}

					if (ans.classList.value.includes("bare-ans")) {
						removeCheckAnimationForIconAndText(ans.children[0], ans);
					}

					if (ans.classList.value.includes("two-ans")) {
						removeCheckAnimationForTwoAns(ans.children[0], ans);
					}
					// ans.classList.remove("border");
				});

				// Add the appropriate class the the currently clicked option
				addClass(e);

				if (step === 1) {
					// Reset the user's object when their primarey area of expertise has been changed.
					reset();
				}

				// Save user's answer
				addAnswerToPersonObject(
					bool,
					pickedAnswer.dataset.id,
					pickedAnswer.dataset.answer,
					step
				);
			});
		});
	}

	if (bool) {
		// Update the selection choice text to indicate that multiple selections are allowed
		selectionChoice.innerText = "You can select as many as you wish.";

		// Add click event listeners to each answer
		answers.forEach((ans) => {
			ans.addEventListener("click", (e) => {
				// Store the clicked answer and its parent elements in an array
				let pickedAnswer = [
					e.target,
					e.target.parentElement,
					e.target.parentElement.parentElement,
					e.target.parentElement.parentElement.parentElement,
				];

				for (let i in pickedAnswer) {
					// If the user clicked on an already selected option, remove it from the user's file
					if (
						(pickedAnswer[i].classList.value.includes("text-imgbox") &&
							pickedAnswer[i].children[0].classList.value.includes(
								"checked2"
							)) ||
						(pickedAnswer[i].classList.value.includes("textonlybox") &&
							pickedAnswer[i].children[0].classList.value.includes(
								"text-checked"
							)) ||
						(pickedAnswer[i].classList.value.includes("bare-ans") &&
							pickedAnswer[i].children[0].classList.value.includes(
								"opacity"
							)) ||
						(pickedAnswer[i].classList.value.includes("two-ans") &&
							pickedAnswer[i].children[0].classList.value.includes("opacity"))
					) {
						removeClass(e);
						removeAnswerToPersonObject(pickedAnswer[i].dataset.id, step);
						break;
					}

					// If the user clicked on an unselected option, add it to the user's file
					if (
						(pickedAnswer[i].classList.value.includes("bare-ans") &&
							!pickedAnswer[i].children[0].classList.value.includes(
								"opacity"
							)) ||
						(pickedAnswer[i].classList.value.includes("textonlybox") &&
							!pickedAnswer[i].children[0].classList.value.includes(
								"text-checked"
							)) ||
						(pickedAnswer[i].classList.value.includes("text-imgbox") &&
							!pickedAnswer[i].children[0].classList.value.includes(
								"checked2"
							)) ||
						(pickedAnswer[i].classList.value.includes("two-ans") &&
							pickedAnswer[i].children[0].classList.value.includes("opacity"))
					) {
						addClass(e);
						addAnswerToPersonObject(
							bool,
							pickedAnswer[i].dataset.id,
							pickedAnswer[i].dataset.answer,
							step
						);
					}
				}
			});
		});
	}
}

// Function controll the form stages that user is allowed to click more than on options
function moreThanOneSelectionIsPermitted(step) {
	switch (step) {
		case 3:
		case 9:
		case 10:
			return true;
		case 1:
		case 2:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
			return false;

		default:
			break;
	}
}

// Handling user click one options
function handleAnswers(step) {
	// Get all answer boxes
	const answers = document.querySelectorAll(".ans-box");

	// Check if multiple selections are allowed for the current step
	const multipleSelections = moreThanOneSelectionIsPermitted(step);

	// Disable all end buttons
	document.querySelectorAll(".end").forEach((btn) => {
		btn.disabled = true;
	});

	// Check if the step is within the range of Questions array
	if (step <= Questions.length - 1 && step > 0) {
		// Hide starter page, show question page, hide thank you page
		starterPage.style.display = "none";
		startQuestion.style.display = "flex";
		thankYou.style.display = "none";

		// Mark already chosen selections
		markAlreadyChosenSelections(step);

		// Mark and save selections
		markAndSaveSelections(multipleSelections, answers, step);
	}
}

// Removes a previously saved user option if the user clicked to remove it
function removeAnswerToPersonObject(answerId, step) {
	// Delete the answer from the USERS_FILE object
	delete USERS_FILE[step][answerId];
}

// Adds the clicked option to the user's file depending on whether the current form stage allows multiple options
function addAnswerToPersonObject(
	allowMoreThanOneAnswers,
	answerId,
	answerText,
	step
) {
	if (allowMoreThanOneAnswers) {
		// Add the answer to the USERS_FILE object
		USERS_FILE[step][answerId] = {
			...USERS_FILE[step][answerId],
			answerText,
		};
	}

	if (!allowMoreThanOneAnswers) {
		// Replace the entire USERS_FILE object for the current step with the new answer
		USERS_FILE[step] = {
			[answerId]: {
				answerText,
			},
		};
	}
}

changeEmailContainer.style.display = "none"; // Change email modalDOM
resubmitEmailContainer.style.display = "none"; // Resubmit email modalDOM

// if the change email field is focused on
inner.onfocus = () => {
	const inemail = document.querySelector(".email");

	// Allow scroll
	inemail.style.overflow = "scroll";

	// remove eclipses class
	inner.classList.remove("turndot", "turndot");

	// enable it to be editabe
	inner.contentEditable = true;

	// user is on the completion page
	otfp = true;
};

// If the change email container loses focus
inner.onblur = () => {
	// user is not on the final page
	otfp = false;

	const inemail = document.querySelector(".email");

	// Add eclipses class
	inner.classList.add("turndot");

	// Dont allow scrolling
	inemail.style.overflow = "hidden";

	// if the content input is different from the inially put email
	if (editfield.innerText !== sessionStorage.getItem("email")) {
		// if the content input is a valid email
		if (validateEmail(editfield.innerText)) {
			// display modal asking to resubmit form
			changeEmailContainer.style.display = "flex";
			gsap.fromTo(
				changeEmailContainer,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.3,
				}
			);
		}

		// if content input is not a valid email
		if (!validateEmail(editfield.innerText))
			// Revert to the original email
			inner.innerText = sessionStorage.getItem("email");
	}
};

// While the user is typing in the change email container
inner.onkeydown = (e) => {
	otfp = true;

	// If enter key is pressed
	if (e.key === "Enter") {
		// Stops the container from being editable
		editfield.contentEditable = false;

		// If the input content is different from the initially input email
		if (editfield.innerText !== sessionStorage.getItem("email")) {
			// If input content is a valid email address
			if (validateEmail(editfield.innerText)) {
				changeEmailContainer.style.display = "flex"; // Show the resubmit modal
				gsap.fromTo(
					changeEmailContainer,
					{
						opacity: 0,
					},
					{
						opacity: 1,
						duration: 0.3,
					}
				);
			}

			// If the input content is not a valid email
			if (!validateEmail(editfield.innerText)) {
				editfield.contentEditable = true;
				editfield.innerText = sessionStorage.getItem("email");
				editfield.style.width = "auto";
			}
		}
	}
};

// if user clicked to change email i.e change email/resubmit button has been clicked
changeEmail.forEach((x) => {
	x.onclick = () => {
		// Update saved user email in sessionStorage
		sessionStorage.setItem("email", editfield.innerText);

		// Resubmit form and send email to the new input email
		sendEmail(sessionStorage.getItem("email", editfield.innerText));

		// Animations to hide the changeEmailContainer and resubmitEmailContainer
		gsap.to(changeEmailContainer, {
			opacity: 0,
			duration: 0.3,
		});

		gsap.to(resubmitEmailContainer, {
			opacity: 0,
			duration: 0.3,
		});

		// Delayed function to hide the changeEmailContainer and resubmitEmailContainer after the animations finish
		const debounce14 = debounce(() => {
			changeEmailContainer.style.display = "none"; // Remove the modal
			resubmitEmailContainer.style.display = "none"; // Remove the modal
		}, 300);
		debounce14();
	};
});

// if cancel button is clicked
cancel.forEach((c) => {
	c.onclick = (e) => {
		// Animations to hide the changeEmailContainer and resubmitEmailContainer
		closeModal();

		if (e.target.classList.value.includes("c2")) {
			// Revert form stage to the current stage because it has been incremented already when the continue button was clicked
			setStage(currentFormStage() - 1);
		}
	};
});

// Debounce functions for the back button, continue button, left and right keys
// The functions are created seperately because somehow the functions supposed to be called by the buttons gets called the number of times
// user clicked on the button or pressed key instead of running just once.
let fk, fy, ckdb, bkdb;
function enterKeyDebounce(func, time) {
	clearTimeout(fk);
	fk = setTimeout(func, time);
}

function leftnRightkeyDebounce(func, time) {
	clearTimeout(fy);
	fy = setTimeout(func, time);
}

function continueButtonDebounce(func, time) {
	clearTimeout(ckdb);
	ckdb = setTimeout(func, time);
}

function backButtonDebounce(func, time) {
	clearTimeout(bkdb);
	bkdb = setTimeout(func, time);
}

// Continue button
ContinueButton.addEventListener("click", (e) => {
	// Run the progressing animation
	continueButtonDebounce(
		() => gotoNextStep(currentFormStage(), Questions),
		400
	);
});

// Back button
BackButton.addEventListener("click", (e) => {
	// Run the progressing animation
	backButtonDebounce(
		() => gotoPreviousStep(currentFormStage(), Questions),
		400
	);
});

// Continue to Next Step On Left or Right key press
window.addEventListener("keydown", lrkeydownHandler);

// Continue to Next Step On Press Enter
window.addEventListener("keydown", entkeydownHandler);

export function lrkeydownHandler(e) {
	leftnRightkeyDebounce(() => {
		keydownHandler(e);
	}, 400);
}

export function entkeydownHandler(e) {
	enterKeyDebounce(() => {
		enterKeyPressHandler(e);
	}, 400);
}

// Arrow Key press handler
function keydownHandler(e) {
	// Stop the left and right arrow key from pressing if user is on the
	// completion page in other to allow user to use them while editting the change email field
	if (otfp === true) {
		return;
	}

	// Allow only left arrow key when the user is on the final page but not editing the change email field
	if (currentFormStage() === Object.values(USERS_FILE).length + 1) {
		if (e.key === "ArrowLeft") {
			gotoPreviousStep(currentFormStage(), Questions);
		}
		return;
	}

	//  Only allow both arrow key press functions when the user
	// is not on the home page and not on the completion page
	if (
		currentFormStage() <= Object.values(USERS_FILE).length &&
		currentFormStage() > 0
	) {
		if (e.key === "ArrowRight") {
			gotoNextStep(currentFormStage(), Questions);
		}

		if (e.key === "ArrowLeft") {
			gotoPreviousStep(currentFormStage(), Questions);
		}
	}
}

// Enter Key press handler
function enterKeyPressHandler(e) {
	// Stop the enter key from pressing if user is on the completion page
	// in other to allow user to use it while editting the change email field
	if (currentFormStage() < Object.values(USERS_FILE).length + 1) {
		if (e.key === "Enter") {
			gotoNextStep(currentFormStage(), Questions);
		}
	}
}

// Function to animate the progress bar (at start)
animateProgress(0);
