"use strict";

import Questions, {
	feedBacks
} from "./questions.js";

const body = document.querySelector("#body");
const logo = document.querySelector("#logo");
const html = document.getElementsByTagName("html");
const controlButtons = document.querySelector(".control-buttons");
const pTicle = document.querySelector(".particles-js-canvas-el");
const backCircle = document.querySelector(".backcircle");
const emailTextField = document.querySelector(".field-container");
const introText = document.querySelector(".introtext")
const rule = document.querySelector(".selection-rule")
const emailSent = document.querySelector(".email-sent")
const starBoy = document.querySelector(".big-thankyou")

const textInputFields = document.querySelectorAll(".ads");
const textFieldLabels = document.querySelectorAll("label");
const selectionChoice = document.querySelector(".selection-rule");
const ContinueButton = document.getElementById("continue");
const BackButton = document.querySelector(".back-button");
const ChangeEmailButton = document.getElementById("changeemail");
const svgCircle = document.getElementById("circle");
const progressSVG = document.querySelector(".progress");
const progress = document.querySelector(".percentage");
const currentStage = document.querySelector(".current-stage");
const errorMessage = document.querySelector(".error-message");
const loaderDOM = document.querySelector(".loader");
const changeEmailContainer = document.querySelector(".change-email");
const emailBox = document.getElementById("emailchange");
const editfield = document.getElementById("edit");
const cancel = document.querySelector(".cancel");
const changeEmail = document.querySelector(".saveemail");
const inner = document.querySelector(".inner");
const successText = document.querySelector(".sent-message");
const errorText = document.querySelector(".error-text");
const starterPage = document.querySelector(".q-container");
const startQuestion = document.querySelector(".main-Q-container");
const thankYou = document.querySelector(".thank-you");
const emojis = document.querySelector(".emojis");
const userEmail = document.getElementById("email");
const changeEmailBox = document.querySelector(".email");
const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
let usersEmailAddress = false;
let stepCounter = 0;

// body.classList.add("soft");

let anim;

function animDebounce(func, time) {
	if (anim) {
		clearTimeout(anim);
	}
	anim = setTimeout(func, time);
}

function welcomeAnimation() {
	introText.classList.add("animate__fadeInLeftBig");
	introText.style.setProperty("--animate-duration", "1s")

	controlButtons.classList.add("animate__fadeInUp");

	emailTextField.classList.add("animate__fadeInUp");
	emailTextField.style.setProperty("--animate-duration", ".4s")

	animDebounce(() => {
		introText.classList.remove("animate__fadeInLeftBig");
	}, 1000);

	starterPage.style.setProperty("opacity", "1")
	controlButtons.style.setProperty("opacity", "1")
}

window.onload = () => welcomeAnimation()

function goingOutOfWelcome(home, start) {
	home.classList.add("animate__fadeOutLeft");
	home.style.setProperty("--animate-duration", "1s")

	start.classList.add("animate__fadeInRight");
	start.style.setProperty("--animate-duration", ".5s")

	controlButtons.classList.remove("animate__fadeInUp")
	controlButtons.classList.add("animate__fadeOutDown")
	controlButtons.style.setProperty("--animate-duration", ".5s")
	setTimeout(() => {
		controlButtons.classList.remove("animate__fadeOutDown")
		controlButtons.classList.add("animate__fadeInUp")
	}, 500)

	emailTextField.classList.add("animate__fadeOutDown");

	animDebounce(() => {
		emailTextField.classList.remove("animate__fadeOutDown");
		home.classList.remove("animate__fadeOutLeft");
	}, 1000);
}

function backToWelcome(home, start) {
	home.classList.remove("animate__fadeOutLeft");
	home.classList.add("animate__fadeInLeft");
	home.style.setProperty("--animate-duration", ".5s")

	emailTextField.classList.add("animate__fadeInUp");

	controlButtons.classList.add("animate__fadeOutDown")
	setTimeout(() => {
		controlButtons.classList.remove("animate__fadeOutDown")
		controlButtons.classList.add("animate__fadeInUp")
	}, 500)

	start.classList.add("animate__fadeOutRight");
	start.style.setProperty("--animate-duration", ".5s")
	animDebounce(() => {
		start.classList.remove("animate__fadeOutRight");
	}, 500);
}

function continueDuringSurvey(question, answer) {
	// console.log(answer.classList)

	// question.style.setProperty("--animate-duration", ".5s")
	// answer.style.setProperty("--animate-duration", ".5s")
	// rule.style.setProperty("--animate-duration", ".5s")

	// question.classList.remove("animate__fadeInDown")
	// rule.classList.remove("animate__fadeInDown")
	// answer.classList.remove("animate__fadeInUp")



	rule.classList.add("animate__fadeOutUp")
	question.classList.add("animate__fadeOutUp")
	answer.classList.add("animate__fadeOutDown")
	// setTimeout(()=>{
	// 	answer.classList.add("animate__fadeOutDown")
	// 	console.log("Herw--------------", answer.classList)
	// },500)


	animDebounce(()=>{
		rule.classList.remove("animate__fadeOutUp")
		question.classList.remove("animate__fadeOutUp")
		answer.classList.remove("animate__fadeOutDown")

		answer.classList.add("animate__fadeInUp")
		question.classList.add("animate__fadeInDown")
		rule.classList.add("animate__fadeInDown")
	}, 500)

	// setTimeout(()=>{
	// 	answer.classList.add("animate__fadeOutDown")

	// }, 1000)





	// animDebounce(() => {
	// 	question.classList.remove("animate__fadeOutUp")
	// 	rule.classList.remove("animate__fadeOutUp")
	// 	answer.classList.remove("animate__fadeOutDown")



	// 	// answer.classList.add("animate__fadeInUp")
	// 	// 	question.classList.add("animate__fadeInDown")
	// 	// 	rule.classList.add("animate__fadeInDown")

	// 	// setTimeout(() => {
	// 	// 	answer.classList.add("animate__fadeInUp")
	// 	// 	question.classList.add("animate__fadeInDown")
	// 	// 	rule.classList.add("animate__fadeInDown")
	// 	// }, 1)
	// }, 5);

}

function submitingForm(home, start) {
	home.classList.add("animate__fadeOut");
	animDebounce(() => {
		home.classList.remove("animate__fadeOut")
	}, 600);

	controlButtons.classList.remove("animate__fadeInUp")
	controlButtons.classList.add("animate__fadeOutDown")
	controlButtons.style.setProperty("--animate-duration", ".5s")
	setTimeout(() => {
		controlButtons.classList.remove("animate__fadeOutDown")
		controlButtons.classList.add("animate__fadeInUp")
	}, 400)

	emailSent.classList.remove("animate__fadeOutDown")
	emailSent.classList.add("animate__fadeInUp")
	emailSent.style.setProperty("--animation-delay", "5s")

	starBoy.classList.remove("animate__fadeOut")
	starBoy.classList.add("animate__fadeIn")
	starBoy.style.setProperty("--animation-duration", ".3s")
	starBoy.style.setProperty("--animation-delay", "1s")

	startQuestion.classList.remove("animate__fadeInRight")
}

function backToForm(home, question, answer) {
	startQuestion.classList.add("animate__fadeIn");
	startQuestion.style.setProperty("--animate-duration", ".5s")

	body.classList.remove("blurbody")
	controlButtons.classList.remove("animate__fadeInUp")
	controlButtons.classList.add("animate__fadeOutDown")
	controlButtons.style.setProperty("--animate-duration", ".5s")
	setTimeout(() => {
		controlButtons.classList.remove("animate__fadeOutDown")
		controlButtons.classList.add("animate__fadeInUp")
	}, 500)

	emailSent.classList.remove("animate__fadeInUp")
	emailSent.classList.add("animate__fadeOutDown")
	emailSent.style.setProperty("--animation-delay", "0s")

	starBoy.classList.remove("animate__fadeIn")
	starBoy.classList.add("animate__fadeOut")
	starBoy.style.setProperty("--animation-duration", ".5s")
}

function keydownHandler(e) {
	if (stepCounter <= Object.values(REVIEW).length + 1) {
		if (e.key === "ArrowRight") {
			gotoNextStep(stepCounter, Questions);
		}

		if (e.key === "ArrowLeft") {
			gotoPreviousStep(stepCounter, Questions);
		}
	}
}

function enterKeyPressHandler(e) {
		if (stepCounter < Object.values(REVIEW).length + 1) {
			if (e.key === "Enter") {
				gotoNextStep(stepCounter, Questions);
			}
		}
}

changeEmailBox.addEventListener("click", (e) => {
	editfield.focus()
})


const showCircleSVG = (bool) => {
	bool
		?
		svgCircle.classList.add("showCircle") :
		svgCircle.classList.remove("showCircle");
};

showCircleSVG(false);
ContinueButton.classList.add("widen");

if (window.screen.availWidth <= 480) {
	currentStage.x.baseVal[0].value = 100;
	currentStage.y.baseVal[0].value = 145;
	ContinueButton.classList.add("widen");
}

let REVIEW = new Object({
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

function reset() {
	let filled = Object.entries(REVIEW)
		.map((f) => f[1])
		.filter((a) => Object.keys(a).length > 0);

	if (filled.length > 1) {
		animateErrorMessage(
			3000,
			600,
			20,
			"Survey has been reset because you changed your Primary Area Of Expertise.",
			"show-reset-message",
			"remove-reset-message"
		);

		REVIEW = {
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
		eventTypes.forEach((eType) => {
			el.addEventListener(eType, (e) => {
				if (e.target.nodeName === "LABEL") {
					e.target.nextElementSibling.focus();
					e.target.nextElementSibling.click();
				}

				if (e.target.nodeName === "INPUT") {
					e.target.offsetParent.children[1].style.borderBottom =
						"1px solid #2260ff";
					e.target.offsetParent.firstElementChild.classList += " move-up";


				}

				if (e.target.classList.value.includes("ads")) {
					window.removeEventListener("keydown", keydownHandler, {
						capture: false
					})
				}
			});



		});
	});

	element.forEach((el) => {
		el.addEventListener("blur", (e) => {
			if (e.target.classList.value.includes("ads")) {
				try {
					if (e.target.value.trim().length === 0) {
					e.target.offsetParent.firstElementChild.classList.remove("move-up");
					e.target.offsetParent.children[1].style.borderBottom = "";
				}
				} catch (error) {

				}

				window.addEventListener("keydown", keydownHandler)
				// if (e.target.classList.value.includes("inner")) {
				// 	gotoNextStep(stepCounter, Questions);
				// }
			}
		});
	});
});

if (textInputFields[0].value.length > 0) {
	textInputFields[0].offsetParent.firstElementChild.classList += " move-up";
	e.target.offsetParent.children[1].style.borderBottom = "1px solid #2260ff";
}

let id, id2, id3, id4, bd;

function debounce(func, time) {
	if (id) {
		clearTimeout(id);
	}

	id = setTimeout(func, time);
}

function debounce2(func, time) {
	if (id2) {
		clearTimeout(id2);
	}

	id2 = setTimeout(func, time);
}

function debounce4(func, time) {
	if (id4) {
		clearTimeout(id4);
	}

	id4 = setTimeout(func, time);
}

function debounce3(func, time) {
	if (id3) {
		clearTimeout(id3);
	}

	id3 = setTimeout(func, time);
}

function buttonDebounce(func) {
	if (bd) {
		clearTimeout(bd);
	}
	bd = setTimeout(func, 500);
}

// Error Message Animation
function animateErrorMessage(
	ERROR_MESSAGE_DURATION,
	ERROR_MESSAGE_ANIMATION_DURATION,
	INITIAL_ERROR_MESSAGE_WIDTH,
	ERROR_MESSAGE,
	SHOW_ERROR_CLASS,
	REMOVE_ERROR_CLASS
) {
	buttonDebounce(() => {
		// Turns the email field bg color to red
		userEmail.classList.add("empty-email-field");
		errorText.innerText = "";

		if (errorText.innerText.length === 0) {
			errorText.innerText = ERROR_MESSAGE;
			const errorMessageNodeWidth = errorMessage.offsetWidth;

			// Remove the reove-error-message and add show-error-message class to show the error message
			let showErrorName = ["remove-error-message", "remove-reset-message"];
			for (let className of showErrorName) {
				errorMessage.classList.remove(className);
			}
			errorMessage.classList.add(SHOW_ERROR_CLASS);

			// Set the Error Message Container width to 20px
			if (window.screen.availWidth >= 1024) {
				errorMessage.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;
			}

			if (window.screen.availWidth < 1024) {
				errorMessage.style.width = "100%";
			}

			// After 300 millisecs set the Error Message container width to its full width
			setTimeout(() => {
				if (window.screen.availWidth >= 1024) {
					errorMessage.style.width = errorMessageNodeWidth + "px";
					return;
				}

				errorMessage.style.width = "100%";
			}, ERROR_MESSAGE_ANIMATION_DURATION / 2);

			// After 600 millisecs make the error message text obvious
			setTimeout(() => {
				errorText.style.opacity = "1";
			}, ERROR_MESSAGE_ANIMATION_DURATION);

			// After 3secs Remove the Error Message
			setTimeout(() => {
				let errorMessageClassLists = [
					"show-error-message",
					"show-reset-message",
				];

				if (window.screen.availWidth >= 1024) {
					errorMessage.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;
				}

				errorText.style.opacity = "0";

				setTimeout(() => {
					for (let className of errorMessageClassLists) {
						errorMessage.classList.remove(className);
					}
					errorMessage.classList.add(REMOVE_ERROR_CLASS);
				}, ERROR_MESSAGE_ANIMATION_DURATION / 2);
			}, ERROR_MESSAGE_DURATION);

			// After 3+ millsecs reset the Error Message container and text container
			setTimeout(() => {
				if (window.screen.availWidth >= 1024) {
					errorMessage.style.width = "auto";
				}

				if (window.screen.availWidth < 1024) {
					errorMessage.style.width = "100%";
				}

				// errorText.innerText = "";
				userEmail.classList.remove("empty-email-field");
			}, ERROR_MESSAGE_DURATION + ERROR_MESSAGE_ANIMATION_DURATION);
		}
	});
}

function showSending(MESSAGE, INITIAL_ERROR_MESSAGE_WIDTH, STAY_TIME) {
	clearTimeout(id4);
	debounce3(() => {
		successText.innerText = MESSAGE;
		const errorMessageNodeWidth = loaderDOM.offsetWidth;

		// Remove the reove-error-message and add show-error-message class to show the error message
		loaderDOM.classList.remove("remove");
		loaderDOM.classList.add("show");
		loaderDOM.style.backgroundColor = "orange";

		// Set the Error Message Container width to 20px
		loaderDOM.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;

		// After 300 millisecs set the Error Message container width to its full width
		setTimeout(() => {
			loaderDOM.style.width = errorMessageNodeWidth + "px";
		}, 300);

		// After 600 millisecs make the error message text obvious
		setTimeout(() => {
			successText.style.opacity = "1";
		}, STAY_TIME);
	}, STAY_TIME);
}

function showSent(MESSAGE, INITIAL_ERROR_MESSAGE_WIDTH, STAY_TIME) {
	clearTimeout(id3);
	successText.style.opacity = "0";

	setTimeout(() => {
		successText.innerText = MESSAGE;
		loaderDOM.style.backgroundColor = "#11bd05";
		loaderDOM.style.width = `${successText.scrollWidth + 50}px`;
	}, 200);

	setTimeout(() => {
		successText.style.opacity = "1";
	}, 300);

	debounce4(() => {
		successText.style.opacity = "0";

		setTimeout(() => {
			loaderDOM.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;
		}, 300);

		setTimeout(() => {
			loaderDOM.classList.remove("show");
			loaderDOM.classList.add("remove");
		}, 600);

		setTimeout(() => {
			loaderDOM.style.width = "auto";
		}, 1000);
	}, STAY_TIME);
}

function removeMessage() {
	successText.style.opacity = "0";

	setTimeout(() => {
		// loaderDOM.style.width = `${20}px`;
	}, 300);

	setTimeout(() => {
		loaderDOM.classList.remove("show");
		loaderDOM.classList.add("remove");
	}, 600);

	setTimeout(() => {
		loaderDOM.style.width = "auto";
	}, 1000);
}

function validateEmail(userEmail, step) {
	let email = userEmail.innerText || userEmail.value.trim();

	if (!emailRegex.test(email)) {
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
		// Save the user's email address to the local storage
		usersEmailAddress = email;

		// Go to next stage
		if (step <= Questions.length - 1) {
			step + 1;
		}

		return true;
	}
}

function animateProgress(step) {
	let filled = Object.entries(REVIEW)
		.map((f) => f[1])
		.filter((a) => Object.keys(a).length > 0);

	let totalQuestions = Object.keys(REVIEW).length;
	let completedPercentage = Math.floor((filled.length / totalQuestions) * 100);
	let svgPercentage = Math.floor((completedPercentage / 100) * 502);

	progressSVG.style.transition = "1s";
	progressSVG.style.strokeDashoffset = 502 - svgPercentage;
	progress.innerHTML = `${completedPercentage}%`;

	step >= Questions.length ?
		(currentStage.innerHTML = `${step - 1} / ${totalQuestions}`) :
		(currentStage.innerHTML = `${step} / ${totalQuestions}`);
}

function sendEmail(email) {
	let filled = Object.entries(REVIEW)
		.map((f) => f[1])
		.filter((a) => Object.keys(a).length === 0);

	if (filled.length === 0) {
		let file = Object.values(REVIEW);
		let nArr = [];
		let result = document.querySelector(".result");

		for (let i in file) {
			if (i === "2" || i === "8" || i === "9") {
				nArr = [
					...nArr,
					Object.values(file[i])
					.map((list) => list.answerText)
					.join(", "),
				];
			} else {
				nArr = [...nArr, Object.values(file[i])[0].answerText];
			}
		}

		let y = "";
		let xa = "";

		const see = (i) => {
			if (i === 2 || i === 3) {
				return Questions[i].question + nArr[0];
			} else {
				return Questions[i].question;
			}
		};

		for (let i = 1; i <= nArr.length; i++) {
			xa += `<div id="test" style="background-color: blueviolet; padding: 10px 15px; border-radius:10px; width:auto; margin-top:30px">
						<h1 style="font-family: 'Merriweather', sans-serif; font-weight:800; font-size: 1.1rem; letter-spacing:.5px; padding: 0px; border-radius: 5px; width: auto;color:white; ">${see(
							i
						)}</h1>
						<p class="ra" style="color: #161b22; font-size:1rem; box-shadow:0px 20px 20px 10px black; background-color: white; padding:10px; border-radius:4px; font-family: 'Open Sans', sans-serif; font-weight: 800; margin-top:15px">${
							nArr[i - 1]
						}</p>
					</div>`;
		}

		let html = `<!DOCTYPE html>
						<html>
						<head>
							<meta charset="UTF-8">
							<title>Email Template</title>
							<link rel="preconnect" href="https://fonts.googleapis.com">
							<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
							<link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans&display=swap" rel="stylesheet">

							<style>
								body {
									font-family: 'Open Sans',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;;
								}

								@media only screen and (max-width:600px){
									#body{padding:5px;background-color:red;}
								}
							</style>
						</head>
						<body id="body" style="
						font-family: 'Open Sans',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
						margin: 0; padding: 0px; background-color: #FAF4FD; border-radius:10px;  font-size: 14px; line-height: 1.6; color: #333333;">

							<table width="100%" border="0" cellspacing="0" cellpadding="0">

								<tr>
									<td align="center" valign="top" style="">
										<table width="100%" border="0" cellspacing="00" cellpadding="00" style="width:100%; max-width:650px; border-collapse: seperate;
							border-spacing: 10px; margin: 0 auto; background-color: #FAF4FD; border-radius:10px">
											<tr style="border-radius:10px" style="width:100%; padding:10px">
												<td align="start" valign="top" style="width:100%; padding:10px" >
												<h1>🎉 Hurray!</h1>
												<p style="font-size:.9rem">Below are your answers to each Questions asked</p>
													${xa}
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</body>
						</html>`;

		// result.innerHTML = html;

		debounce(() => {
			showSending("Submitting Form...", 20, 600);
		}, 500);

		let htmlTemplate = {
			my_html: html,
			user: email,
		};

		debounce2(() => {
			showSent("Form Submitted Successfully", 20, 2000);

			submitingForm(startQuestion)

			setTimeout(() => {
				ContinueButton.style.display = "none";
				BackButton.classList.add("widen")
				showCircleSVG(false);
			}, 400)

			setTimeout(() => {
				thankYou.style.display = "flex";
				starterPage.style.display = "none";
				startQuestion.style.display = "none";
				body.classList.add("blurbody")
			}, 600)
			// emailjs
			// 	.send(
			// 		"service_7e6832l",
			// 		"template_72qo6da",
			// 		htmlTemplate,
			// 		"nBCyRCnTpya5flZa7"
			// 	)
			// 	.then(
			// 		function (response) {
			// 			showSent("Form Submitted Successfully", 20, 5000);
			// 			showCircleSVG(false);
			// 			submitingForm(starterPage, startQuestion)

			// 			setTimeout(() => {
			// 				ContinueButton.style.display = "none";
			// 				BackButton.classList.add("widen")
			// 			}, 400)

			// 			setTimeout(() => {
			// 				thankYou.style.display = "flex";
			// 				starterPage.style.display = "none";
			// 				startQuestion.style.display = "none";
			// 			}, 600)
			// 		},
			// 		function (error) {
			// 			let message =
			// 				error.status === 412 ?
			// 				"please try again later. Thank you." :
			// 				error.status === 429 ?
			// 				alert("Quota") :
			// 				error.text;
			// 			removeMessage();
			// 			animateErrorMessage(
			// 				10000,
			// 				600,
			// 				20,
			// 				`Error occurred, ${message || "no internet connection"}`,
			// 				"show-error-message",
			// 				"remove-error-message"
			// 			);
			// 		}
			// 	);
		}, 2000);
	}
}

function gotoNextStep(step, question) {
	const answersField = document.querySelector(".answer-field");
	const questionElement = document.querySelector(".Question");

	// Proceed to QA if email address field is filled
	if (step === 0) {
		showCircleSVG(false);

		// Save User's email is inputed
		let emailIsEmpty = userEmail.value.trim().length === 0;

		// Show Error Message if the email field is empty
		if (emailIsEmpty) {
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
			if (!validateEmail(userEmail, step)) {
				return;
			}
			// validateEmail(userEmail, step);
			goingOutOfWelcome(introText, startQuestion);
		}
	}

	// Control the form steps
	step++;
	if (step >= question.length) {
		// emojis.innerHTML = "";
		// feedBacks.forEach((fb, index) => {
		// 	emojis.innerHTML += `<div class="ans-box" data-id="${index}">${fb}</div>`;
		// });

		inner.innerText = usersEmailAddress;
		sendEmail(usersEmailAddress);

		stepCounter = step;
		animateProgress(20);
	}

	// Start QA on the Condition

	if (step <= question.length && step > 0) {
		// Put off the welcome page and put on the QA page
		// body.style.backgroundColor = "#ffffffdd";
		// body.classList.add("soft");
		body.classList.remove("soft");
		backCircle.style.opacity = "0";
		controlButtons.classList.add("csoft");
		thankYou.style.display = "none";
		debounce3(() => {
			ContinueButton.children[0].innerText = "Continue";
			ContinueButton.style.display = "flex";
			BackButton.style.display = "flex";
			ContinueButton.classList.remove("widen");
			BackButton.classList.remove("widen");
			// startQuestion.style.display = "flex";
			// starterPage.style.display = "none";
		}, 500);

		showCircleSVG(true);

		try {
			ChangeEmailButton.style.display = "none";
		} catch (error) {}

		// Show error message is no option is selected
		try {
			if (Object.keys(REVIEW[step - 1])) {
				// If the User Object for the paticular step is empty, show the error message
				if (Object.keys(REVIEW[step - 1]).length === 0) {
					animateErrorMessage(
						3000,
						600,
						20,
						"Please select an option.",
						"show-error-message",
						"remove-error-message"
					);
					return;
				}
			}
		} catch (error) {}


		if (step <= question.length - 1 && step > 1) {
			continueDuringSurvey(questionElement, answersField)
		}

		setTimeout(() => {
			// Display Question
			questionElement.innerHTML =
				`<h1 class="qnumbering">${step}</h1>` +
				askQuestionsInteractively(questionElement, step, question);

			// Display Answers
			displayAnswersInteractively(answersField, step, question);
		}, 500);
	}

	if (step >= question.length) step = question.length;

	stepCounter = step;

	// Animate progress forwards
	animateProgress(stepCounter);
}

function gotoPreviousStep(step, question) {
	const answersField = document.querySelector(".answer-field");
	const questionElement = document.querySelector(".Question");

	step--;
	if (step <= 0) {
		step = 0;
	}

	stepCounter = step;
	// Animate progress backwards
	animateProgress(stepCounter);



	if (step === parseInt(Object.keys(REVIEW).length)) {
		backToForm(startQuestion, questionElement, answersField)
	}

	if (step <= 0) {
		thankYou.style.display = "none";


		debounce3(() => {
			BackButton.style.display = "none";
			ContinueButton.classList.add("widen");
			controlButtons.classList.remove("csoft");
			startQuestion.style.display = "none";
			starterPage.style.display = "flex";
		}, 500);

		backToWelcome(introText, startQuestion);

		backCircle.style.opacity = "";
		showCircleSVG(false);
		return;
	}

	if (step > 0) {
		continueDuringSurvey(questionElement, answersField)
		setTimeout(() => {
			ContinueButton.style.display = "flex";
			BackButton.style.display = "flex";
			BackButton.classList.remove("widen");
			ContinueButton.classList.remove("widen");
		}, 500)
		showCircleSVG(true);



		setTimeout(() => {
			// Display Question
			questionElement.innerHTML =
				`<h1 class="qnumbering">${step}</h1>` +
				askQuestionsInteractively(questionElement, step, question);
				console.log(questionElement.classList)

			// Display Answers
			displayAnswersInteractively(answersField, step, question);
		}, 500)
	}
}

function markAlreadyChosenSelections(step) {
	const answers = document.querySelectorAll(".ans-box");
	let chosen = Object.entries(REVIEW[step]).map((c) => c[0]);

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

function askQuestionsInteractively(questionElement, step, question) {
	// console.log(questionElement.classList)
	switch (step) {
		case 2:
		case 3:
			let answers = [];

			for (let i in REVIEW[1]) {
				answers.push(REVIEW[1][i].answerText);
			}

			return `${question[step].question} ${answers[0]} ?`

		default:
			return question[step].question;
	}
}

function displayAnswersInteractively(answersField, step, question) {
	console.log(answersField.classList.value)
	let listCl = ["eight-ans-grid", "icon-text-ans", "continous-two", "ans-with-4ans-textonly", "ans-with-5option-textonly", "straight-ans", "ans-with-2options"]
			listCl.forEach(a => {
				if (answersField.classList.value.includes(a)) {
					answersField.classList.remove(a)
					console.log(answersField.classList.value)
				}
			})
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

			// answersField.innerHTML += `<div class="ans-box" ></div>`;

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

			// Handling the Answer clicks
			handleAnswers(step);
		}, 0);
	}

	if (question[step].answers[0].text) {
		question[step].answers.forEach((ans, index) => {
			// Fill up the Answers Field
			display(index, ans);
		});
	}

	if (!question[step].answers[0].text) {
		let primaryAreaOfExpertise = parseInt(Object.keys(REVIEW[1])[0]);

		function returnMatchingAnswers(aIndex) {
			question[step].answers[aIndex].forEach((ans, index) => {
				display(index, ans);
			});
		}

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

const addCheckAnimationForImgTextBox = (checkerDir, containerDir) => {
	let checker = checkerDir;
	let container = containerDir;
	checker.classList.add("checked2");
	// container.classList.toggle("border");
};

const removeCheckAnimationForImgTextBox = (checkerDir, containerDir) => {
	let checker = checkerDir;
	let container = containerDir;
	checker.classList.remove("checked2");
};

const addCheckAnimationForTextBoxOnly = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.add("text-checked");
	container.classList.add("textcontainer-checked");
};

const removeCheckAnimationForTextBoxOnly = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.remove("text-checked");
	container.classList.remove("textcontainer-checked");
};

const addCheckAnimationForIconAndText = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.add("opacity");
	container.classList.add("tools-ans-checked");
};

const removeCheckAnimationForIconAndText = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.remove("opacity");
	container.classList.remove("tools-ans-checked");
};

const addCheckAnimationForTwoAns = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.add("opacity");
	container.classList.add("two-ans-container-checked");
};

const removeCheckAnimationForTwoAns = (checkDir, containerDir) => {
	let checker = checkDir;
	let container = containerDir;
	checker.classList.remove("opacity");
	container.classList.remove("two-ans-container-checked");
};

function addClass(e) {
	let boxlist = [
		e.target,
		e.target.parentElement,
		e.target.parentElement.parentElement,
		e.target.parentElement.parentElement.parentElement,
	];

	for (let i in boxlist) {
		if (boxlist[i].classList.value.includes("text-imgbox")) {
			addCheckAnimationForImgTextBox(boxlist[i].children[0], boxlist[i]);
			break;
		}

		if (boxlist[i].classList.value.includes("textonlybox")) {
			addCheckAnimationForTextBoxOnly(boxlist[i].children[0], boxlist[i]);
			break;
		}

		if (boxlist[i].classList.value.includes("bare-ans")) {
			addCheckAnimationForIconAndText(boxlist[i].children[0], boxlist[i]);
			break;
		}

		if (boxlist[i].classList.value.includes("two-ans")) {
			addCheckAnimationForTwoAns(boxlist[i].children[0], boxlist[i]);
			break;
		}
	}
}

function removeClass(e) {
	let boxlist = [
		e.target,
		e.target.parentElement,
		e.target.parentElement.parentElement,
		e.target.parentElement.parentElement.parentElement,
	];

	for (let i in boxlist) {
		if (boxlist[i].classList.value.includes("text-imgbox")) {
			removeCheckAnimationForImgTextBox(boxlist[i].children[0], boxlist[i]);
			break;
		}

		if (boxlist[i].classList.value.includes("textonlybox")) {
			removeCheckAnimationForTextBoxOnly(boxlist[i].children[0], boxlist[i]);
			break;
		}

		if (boxlist[i].classList.value.includes("bare-ans")) {
			removeCheckAnimationForIconAndText(boxlist[i].children[0], boxlist[i]);
			break;
		}

		if (boxlist[i].classList.value.includes("two-ans")) {
			removeCheckAnimationForTwoAns(boxlist[i].children[0], boxlist[i]);
			break;
		}
	}
}

function markAndSaveSelections(bool, answers, step) {
	if (!bool) {
		selectionChoice.innerText = "Please select only one.";
		answers.forEach((ans) => {
			ans.addEventListener("click", (e) => {
				let pickedAnswer = e.target; // To get the ans ID and text

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

				addClass(e);

				if (step === 1) {
					// Reset the user's object when their primarey area of expertise has been changed.
					reset();
				}

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
		selectionChoice.innerText = "You can select as many as you wish.";
		answers.forEach((ans) => {
			ans.addEventListener("click", (e) => {
				let pickedAnswer = [
					e.target,
					e.target.parentElement,
					e.target.parentElement.parentElement,
					e.target.parentElement.parentElement.parentElement,
				];

				for (let i in pickedAnswer) {
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

function handleAnswers(step) {
	const answers = document.querySelectorAll(".ans-box");
	const multipleSelections = moreThanOneSelectionIsPermitted(step);

	document.querySelectorAll(".end").forEach((btn) => {
		btn.disabled = true;
	});

	if (step <= Questions.length - 1 && step > 0) {
		starterPage.style.display = "none";
		startQuestion.style.display = "flex";
		thankYou.style.display = "none";

		// Mark already-chosen
		markAlreadyChosenSelections(step);

		// Mark and Save Selection
		markAndSaveSelections(multipleSelections, answers, step);
	}
}

function removeAnswerToPersonObject(answerId, step) {
	delete REVIEW[step][answerId];
}

function addAnswerToPersonObject(
	allowMoreThanOneAnswers,
	answerId,
	answerText,
	step
) {
	if (allowMoreThanOneAnswers) {
		REVIEW[step][answerId] = {
			...REVIEW[step][answerId],
			answerText,
		};
	}

	if (!allowMoreThanOneAnswers) {
		REVIEW[step] = {
			[answerId]: {
				answerText,
			},
		};
	}
}

changeEmailContainer.style.display = "none";

inner.onfocus = () => {
	const inemail = document.querySelector(".email");
	inemail.style.overflow = "scroll";
	inner.classList.remove("turndot", "turndot");
};

inner.onblur = () => {
	const inemail = document.querySelector(".email");
	inner.classList.add("turndot");
	inemail.style.overflow = "hidden";
	if (editfield.innerText !== usersEmailAddress) {
		if (validateEmail(editfield)) {
			changeEmailContainer.classList.remove("remove-change-email-modal");
			changeEmailContainer.classList.add("show-change-email-modal");
		}
	}
};

changeEmail.onclick = () => {
	usersEmailAddress = editfield.innerText;
	sendEmail(usersEmailAddress);
	changeEmailContainer.classList.add("remove-change-email-modal");
};

cancel.onclick = () => {
	changeEmailContainer.classList.add("remove-change-email-modal");
};

// Continue button
ContinueButton.addEventListener("click", (e) => {
	debounce4(() => gotoNextStep(stepCounter, Questions), 100)
});

BackButton.addEventListener("click", (e) => {
	debounce4(() => gotoPreviousStep(stepCounter, Questions), 200)
});



// Continue to Next Step On Press Enter
window.addEventListener("keydown", keydownHandler);
window.addEventListener("keydown", enterKeyPressHandler)

animateProgress(0);
export default REVIEW;