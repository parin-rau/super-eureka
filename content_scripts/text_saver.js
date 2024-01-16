(() => {
	if (window.hasRun) return;

	window.hasRun = true;

	// const getSelectedText = () => {
	// 	const selObj = window.getSelection();
	// 	const text = selObj.toString();
	// 	return text;
	// };

	const getSelectedText = () => {
		let text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
	};

	const downloadText = (text) => {
		if (!text) return console.log("No text selected.");

		const filename = text.split("\n")[0];

		const a = document.createElement("a");
		a.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(text)
		);
		a.setAttribute("download", filename);

		a.style.display = "none";
		document.body.appendChild(a);

		a.click();

		document.body.removeChild(a);
	};

	console.log(getSelectedText());

	// const onCreated = () => {
	// 	if (browser.runtime.lastError) {
	// 		console.error(`Error: ${browser.runtime.lastError}`);
	// 	} else {
	// 		console.log("Item created successfully");
	// 	}
	// };

	// browser.menus.create(
	// 	{
	// 		id: "save-selected",
	// 		title: "Save selected text",
	// 		contexts: ["selection"],
	// 		onclick: () => console.log(getSelectedText()),
	// 	},
	// 	onCreated
	// );

	// browser.menus.create(
	// 	{
	// 		id: "always present",
	// 		title: "test: always present button",
	// 		contexts: ["all"],
	// 		onclick: () => {
	// 			console.log("clicky");
	// 		},
	// 	},
	// 	onCreated
	// );

	// browser.commands.onCommand.addListener((command) => {
	// 	if (command === "save-selected") {
	// 		console.log("save-selected");
	// 	}
	// 	if (command === "save-selected-open") {
	// 		console.log("save and open");
	// 	}
	// });
})();

// browser.menus.create({
// 	id: "selected-only-test",
// 	title: "Test: shows up only when text is selected",
// 	contexts: ["selected"],
// 	onClick: () => {
// 		console.log("secret clicky");
// 	},
// });

// browser.menus.create({
// 	id: "save-selected",
// 	title: "Save selected text",
// 	contexts: ["all"],
// 	onClick: () => {
// 		console.log("clicky");
// 	},
// });
