(() => {
	// if (window.hasRun) return;

	// window.hasRun = true;

	// const div = document.createElement("div");
	// div.setAttribute("id", "clicky");
	// document.body.appendChild(div);

	// function onOpened() {
	// 	console.log(`Opened download item`);
	// }

	// function onError(error) {
	// 	console.log(`Error opening item: ${error}`);
	// }

	// function openDownload(downloadItems) {
	// 	if (downloadItems.length > 0) {
	// 		let opening = browser.downloads.open(downloadItems[0].id);
	// 		opening.then(onOpened, onError);
	// 	}
	// }

	// let searching = browser.downloads.search({
	// 	limit: 1,
	// 	orderBy: ["-startTime"],
	// });

	// searching.then(openDownload, onError);

	const downloadText = async (text) => {
		if (!text) return console.log("No text selected.");

		const filename = text.split("\n")[0];

		const a = document.createElement("a");
		//a.setAttribute("target", "_blank");
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

	// const getLatestDownload = () =>
	// 	browser.downloads.search({
	// 		limit: 1,
	// 		orderBy: ["-startTime"],
	// 	});
	//.then((d) => openDownload(d[0].id));

	const onCreated = () => {
		if (browser.runtime.lastError) {
			console.error(`Error: ${browser.runtime.lastError}`);
		} else {
			console.log("Item created successfully");
		}
	};

	browser.menus.create(
		{
			id: "save-selected",
			title: "Save selected text",
			contexts: ["selection"],
		},
		onCreated
	);

	browser.menus.create(
		{
			id: "save-selected-open",
			title: "Save selected text and open file for editing",
			contexts: ["selection"],
		},
		onCreated
	);

	// browser.commands.onCommand.addListener((command) => {
	// 	if (command === "save-selected") {
	// 		downloadText();
	// 	}
	// 	if (command === "save-selected-open") {
	// 		console.log("save and open");
	// 	}
	// });

	// let latestDownload = getLatestDownload()

	browser.menus.onClicked.addListener(async (info, tab) => {
		switch (info.menuItemId) {
			case "save-selected":
				downloadText(info.selectionText);
				break;
				// case "save-selected-open":
				// downloadText(info.selectionText);
				// latestDownload = getLatestDownload();
				// console.log({ latestDownload });
				// browser.downloads.open(latestDownload[0].id);

				//document.body.appendChild(div);
				// selectionText = info.selectionText;
				// div.click();

				//document.body.removeChild(div);

				break;
		}
	});

	// document.querySelector("#clicky").addEventListener("click", async () => {
	// 	const latestDownload = await downloadText(selectionText).then(
	// 		getLatestDownload
	// 	);
	// 	browser.downloads.open(latestDownload[0].id);
	// });
})();
