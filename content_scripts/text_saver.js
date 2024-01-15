// const fileContent = "testing123";
// const fileName = "test.txt";
// const options = { type: "text/plain" };

// const file = new File([fileContent], fileName, options);

// const download = () => {
// 	const link = document.createElement("a");
// 	const url = URL.createObjectURL(file);

// 	link.href = url;
// 	link.download = file.name;
// 	document.body.appendChild(link);
// 	link.click();

// 	document.body.removeChild(link);
// 	window.URL.revokeObjectURL(url);
// };

// download();
(() => {
	const download = (text) => {
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

	//browser.ContextType("selection")
	browser.menus.create({});

	browser.commands.onCommand.addListener((command) => {
		if (command === "save-selected") {
			console.log("save-selected");
		}
		if (command === "save-selected-open") {
			console.log("save and open");
		}
	});
})();
