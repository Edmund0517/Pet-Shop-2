document.querySelector(".hamburger").addEventListener("click", function () {
	document.querySelector(".navBarShowOut").style.display = "flex";
});
document
	.querySelector(".closeNavBarShowOut")
	.addEventListener("click", function () {
		document.querySelector(".navBarShowOut").style.display = "none";
	});
