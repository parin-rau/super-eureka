(() => {
	// if (window.hasRun) return;

	// window.hasRun = true;

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

	const onCreated = () => {
		if (browser.runtime.lastError) {
			console.error(`Error: ${browser.runtime.lastError}`);
		} else {
			console.log("Item created successfully");
		}
	};

	// function logTabs(tabs) {
	// 	if (tabs[0].url) console.log(tabs[0].url);
	// 	else console.log("nothing");
	// }

	// function onError(error) {
	// 	console.error(`Error: ${error}`);
	// }

	// browser.tabs
	// 	.query({ currentWindow: true, active: true })
	// 	.then(logTabs, onError);

	// const getCurrentTab = (tabs) => tabs[0].url;

	browser.menus.create(
		{
			id: "save-selected",
			title: "Save selected text",
			contexts: ["selection"],
			onclick: async () => {
				await browser.tabs.sendMessage(
					browser.tabs.query({ currentWindow: true, active: true }),
					{ id: "save-selected" }
				);
			},
		},
		onCreated
	);

	browser.menus.create(
		{
			id: "always present",
			title: "test: always present button",
			contexts: ["all"],
			onclick: () => {
				console.log("clicky");
			},
		},
		onCreated
	);

	browser.commands.onCommand.addListener((command) => {
		if (command === "save-selected") {
			console.log("save-selected");
		}
		if (command === "save-selected-open") {
			console.log("save and open");
		}
	});

	browser.menus.onClicked.addListener((info, tab) => {
		switch (info.menuItemId) {
			case "save-selected":
				downloadText(info.selectionText);
				break;
		}
	});

	//browser.tabs.executeScript({ file: "/content_scripts/text_saver.js" });
})();
