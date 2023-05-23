"use strict";

import Questions, { feedBacks } from "./questions.js";

const textInputFields = document.querySelectorAll("input[type=email]");
const textFieldLabels = document.querySelectorAll("label");
const selectionChoice = document.querySelector(".selection-rule");
const ContinueButton = document.getElementById("continue");
const BackButton = document.querySelector(".back-button");
const progressSVG = document.querySelector(".progress");
const progress = document.querySelector(".percentage");
const currentStage = document.querySelector(".current-stage");
const errorMessage = document.querySelector(".error-message");
const errorText = document.querySelector(".error-text");
const starterPage = document.querySelector(".q-container");
const startQuestion = document.querySelector(".main-Q-container");
const thankYou = document.querySelector(".thank-you");
const emojis = document.querySelector(".emojis");
const userEmail = document.getElementById("email");
const userEmail2 = document.querySelector(".email");
const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

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
	21: {},
	22: {},
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
			21: {},
			22: {},
		};
	}
}

let stepCounter = 0;

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
					e.target.offsetParent.firstElementChild.classList += " move-up";
				}
			});
		});
	});

	element.forEach((el) => {
		el.addEventListener("blur", (e) => {
			if (e.target.nodeName === "INPUT") {
				if (e.target.value.trim().length === 0) {
					e.target.offsetParent.firstElementChild.classList.remove("move-up");
				}
			}
		});
	});
});

if (textInputFields[0].value.length > 0) {
	textInputFields[0].offsetParent.firstElementChild.classList += " move-up";
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
	console.log(errorMessage.classList);
	// Turns the email field bg color to red
	userEmail.classList.add("empty-email-field");

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
		errorMessage.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;

		// After 300 millisecs set the Error Message container width to its full width
		setTimeout(() => {
			errorMessage.style.width = errorMessageNodeWidth + "px";
		}, ERROR_MESSAGE_ANIMATION_DURATION / 2);

		// After 600 millisecs make the error message text obvious
		setTimeout(() => {
			errorText.style.opacity = "1";
		}, ERROR_MESSAGE_ANIMATION_DURATION);

		// After 3secs Remove the Error Message
		setTimeout(() => {
			let errorMessageClassLists = ["show-error-message", "show-reset-message"];
			errorMessage.style.width = `${INITIAL_ERROR_MESSAGE_WIDTH}px`;
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
			errorMessage.style.width = "auto";
			errorText.innerText = "";
			userEmail.classList.remove("empty-email-field");
		}, ERROR_MESSAGE_DURATION + ERROR_MESSAGE_ANIMATION_DURATION);
	}
}

function validateEmail(step) {
	let email = userEmail.value.trim();

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
		localStorage.setItem("usersEmailAddress", userEmail.value);

		// Go to next stage
		step + 1;

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

	step >= Questions.length
		? (currentStage.innerHTML = `${step - 1} / ${totalQuestions}`)
		: (currentStage.innerHTML = `${step} / ${totalQuestions}`);
}

function sendEmail(email) {
	let filled = Object.entries(REVIEW)
		.map((f) => f[1])
		.filter((a) => Object.keys(a).length === 0);

	if (filled.length === 0) {
		console.log("hey");
		let file = Object.values(REVIEW);
		let nArr = [];
		let result = document.querySelector(".result");

		for (let i of file) {
			nArr = [...nArr, Object.values(i)[0].answerText];
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
			xa += `<div id="test" style="background-color: white; padding: 10px 15px; border-radius:10px; width:auto; margin-top:30px">
		<h1 style="color:blueviolet; font-family: 'Merriweather', sans-serif; font-weight:400; font-size: 1.2em; letter-spacing:.5px; padding: 0px; border-radius: 5px; width: auto;">${see(
			i
		)}</h1>
		<p class="ra" style="color: #161b22; font-size:.9rem; border-left:2px solid blueviolet, font-family: 'Open Sans', sans-serif; font-weight: 500; margin-top:15px">${
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
									font-family: 'Merriweather',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;;
								}
							</style>
						</head>
						<body style="margin: 0; padding: 0; background-color: #f4f4f5; border-radius:10px;  font-size: 14px; line-height: 1.6; color: #333333;">

							<table width="100%" border="0" cellspacing="0" cellpadding="0">

								<tr>
									<td align="center" valign="top" style="">
										<table width="100%" border="0" cellspacing="00" cellpadding="00" style="width:100%; border-collapse: seperate;
							border-spacing: 10px; margin: 0 auto; background-color: transparent;border-radius:10px">
											<tr style="border-radius:10px" style="width:100%; padding:10px">
												<td align="start" valign="top" style="width:100%; padding:10px" >
												<h1>🎉 Hurray!</h1>
												<p>Below are your answers to each Questions asked</p>
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

		var Email = {
			send: function (a) {
				return new Promise(function (n, e) {
					(a.nocache = Math.floor(1e6 * Math.random() + 1)),
						(a.Action = "Send");
					var t = JSON.stringify(a);
					Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
						n(e);
					});
				});
			},
			ajaxPost: function (e, n, t) {
				var a = Email.createCORSRequest("POST", e);
				a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
					(a.onload = function () {
						var e = a.responseText;
						null != t && t(e);
					}),
					a.send(n);
			},
			ajax: function (e, n) {
				var t = Email.createCORSRequest("GET", e);
				(t.onload = function () {
					var e = t.responseText;
					null != n && n(e);
				}),
					t.send();
			},
			createCORSRequest: function (e, n) {
				var t = new XMLHttpRequest();
				return (
					"withCredentials" in t
						? t.open(e, n, !0)
						: "undefined" != typeof XDomainRequest
						? (t = new XDomainRequest()).open(e, n)
						: (t = null),
					t
				);
			},
		};

		Email.send({
			Host: "smtp.elasticemail.com",
			Username: "loyalty@friendship.com",
			Password: "31C8255B222BAADB73B74A0F7E91380F63B5",
			To: email,
			From: "Surv<ericdan12301@gmail.com>",
			Subject: "Hello World",
			Body: html,
		})
			.then((message) => {
				if (message === "OK") {
					starterPage.style.display = "none";
					startQuestion.style.display = "none";
					thankYou.style.display = "flex";
					ContinueButton.style.display = "none";
				}
			})
			.catch((error) => {
				animateErrorMessage(
					15000,
					600,
					20,
					`An Error Occurred : ${error}`,
					"show-error-message",
					"remove-error-message"
				);
			});
	}
}

function gotoNextStep(step, question) {
	const answersField = document.querySelector(".answer-field");
	const questionElement = document.querySelector(".Question");

	// Proceed to QA if email address field is filled
	if (step === 0) {
		starterPage.style.display = "flex";
		startQuestion.style.display = "none";
		BackButton.style.display = "none";

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
			if (!validateEmail(step)) {
				return;
			}

			if (validateEmail(step)) {
				validateEmail(step);
			}
		}
	}

	// Control the form steps
	step++;
	if (step >= question.length) {
		emojis.innerHTML = "";
		feedBacks.forEach((fb, index) => {
			emojis.innerHTML += `<div class="ans-box" data-id="${index}">${fb}</div>`;
		});

		userEmail2.innerText = localStorage.getItem("usersEmailAddress");

		sendEmail(localStorage.getItem("usersEmailAddress"));
		setTimeout(() => {
			sendEmail(localStorage.getItem("usersEmailAddress"));
		}, 2000);

		stepCounter = step;
	}

	// Start QA on the Condition
	if (step <= question.length - 1 && step > 0) {
		// Put off the welcome page and put on the QA page
		startQuestion.style.display = "flex";
		starterPage.style.display = "none";
		thankYou.style.display = "none";
		ContinueButton.style.display = "flex";
		BackButton.style.display = "flex";

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

		// Display Question
		questionElement.innerText = askQuestionsInteractively(step, question);

		// Display Answers
		displayAnswersInteractively(answersField, step, question);
	}

	if (step >= question.length) {
		step = question.length;
	}

	stepCounter = step;

	// Animate progress forwards
	animateProgress(stepCounter);

	// console.log("Forward > ", `Step : ${step}`, `StepCounter : ${stepCounter}`);
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

	if (step <= 0) {
		startQuestion.style.display = "none";
		thankYou.style.display = "none";
		starterPage.style.display = "flex";
		BackButton.style.display = "none";
		return;
	}

	if (step > 0) {
		ContinueButton.style.display = "flex";

		// Display Question
		questionElement.innerText = askQuestionsInteractively(step, question);

		// Display Answers
		displayAnswersInteractively(answersField, step, question);
	}

	// console.log("Backward > ", `Step : ${step}`, `StepCounter : ${stepCounter}`);
}

function markAlreadyChosenSelections(step) {
	const answers = document.querySelectorAll(".ans-box");
	let chosen = Object.entries(REVIEW[step]).map((c) => c[0]);

	answers.forEach((ans) => {
		chosen.filter((ch) => {
			if (ans.dataset.id === ch) {
				ans.classList.add("picked");
			}
		});
	});
}

function askQuestionsInteractively(step, question) {
	switch (step) {
		case 2:
		case 3:
			let answers = [];

			for (let i in REVIEW[1]) {
				answers.push(REVIEW[1][i].answerText);
			}

			return `${question[step].question} ${answers[0]} ?`;

		default:
			return question[step].question;
	}
}

function displayAnswersInteractively(answersField, step, question) {
	function display(index, ans) {
		// Empty the Answers Field/Container
		answersField.innerHTML = "";

		setTimeout(() => {
			answersField.innerHTML += `<div class="ans-box" data-id="${index}">${ans}</div>`;

			// Handling the Answer clicks
			handleAnswers(step);
		}, 10);
	}

	if (typeof question[step].answers[0] !== "object") {
		question[step].answers.forEach((ans, index) => {
			// Fill up the Answers Field
			display(index, ans);
		});
	}

	if (typeof question[step].answers[0] === "object") {
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

function markAndSaveSelections(bool, answers, step) {
	if (!bool) {
		selectionChoice.innerText = "Please select only one.";
		answers.forEach((ans) => {
			ans.addEventListener("click", (e) => {
				let pickedAnswer = e.target;

				// Reset the user's object when their primarey area of expertise has been changed.
				if (step === 1) {
					reset();
				}

				answers.forEach((all) => {
					all.classList.remove("picked");
				});

				pickedAnswer.classList.add("picked");

				addAnswerToPersonObject(
					bool,
					pickedAnswer.dataset.id,
					pickedAnswer.innerText,
					step
				);
			});
		});
	}

	if (bool) {
		selectionChoice.innerText = "You can select as many as you wish.";
		answers.forEach((ans) => {
			ans.addEventListener("click", (e) => {
				let pickedAnswer = e.target;

				if (pickedAnswer.classList.contains("picked")) {
					pickedAnswer.classList.remove("picked");
					removeAnswerToPersonObject(pickedAnswer.dataset.id, step);
				} else {
					pickedAnswer.classList.add("picked");
					addAnswerToPersonObject(
						bool,
						pickedAnswer.dataset.id,
						pickedAnswer.innerText,
						step
					);
				}
			});
		});
	}
}

function moreThanOneSelectionIsPermitted(step) {
	switch (step) {
		case 3:
		case 11:
		case 12:
			return true;
		case 1:
		case 2:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
		case 21:
		case 22:
			return false;

		default:
			break;
	}
}

function handleAnswers(step) {
	const answers = document.querySelectorAll(".ans-box");
	const multipleSelections = moreThanOneSelectionIsPermitted(step);

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

// Continue button
ContinueButton.addEventListener("click", () => {
	gotoNextStep(stepCounter, Questions);
});

BackButton.addEventListener("click", (e) => {
	gotoPreviousStep(stepCounter, Questions);
});

// Continue to Next Step On Press Enter
window.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		gotoNextStep(stepCounter, Questions);
	}

	if (e.key === "ArrowLeft") {
		gotoPreviousStep(stepCounter, Questions);
	}
});

// gotoNextStep(0, Questions);
animateProgress(0);
export default REVIEW;
