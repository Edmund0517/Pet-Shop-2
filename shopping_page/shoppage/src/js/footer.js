document.addEventListener("DOMContentLoaded", () => {
	const footerHandles = document.querySelectorAll(".footer");
	footerHandles.forEach((handle) => {
		handle.addEventListener("click", () => {
			const footer = handle.closest(".footer");
			footer.classList.toggle("footer-expanded");
		});
	});
});
