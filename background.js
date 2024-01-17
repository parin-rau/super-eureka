(() => {
	const downloadText = async (text) => {
		if (!text) return console.log("No text selected.");

		const filename = text.split("\n")[0];

		const a = document.createElement("a");
		a.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(text)
		);
		a.setAttribute("download", filename + ".txt");

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

	browser.menus.create(
		{
			id: "save-selected",
			title: "Save selected text",
			contexts: ["selection"],
		},
		onCreated
	);

	browser.menus.onClicked.addListener(async (info, tab) => {
		switch (info.menuItemId) {
			case "save-selected":
				downloadText(info.selectionText);
				break;
		}
	});
})();
