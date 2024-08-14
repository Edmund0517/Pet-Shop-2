import React, { useState, useEffect, useRef, useCallback } from "react";
import "../css/footer.css";

function Footer() {
	const [isExpanded, setIsExpanded] = useState(false);
	const footerRef = useRef(null);

	const handleClick = useCallback(() => {
		setIsExpanded((prevState) => !prevState);
	}, []);

	useEffect(() => {
		const footer = footerRef.current;
		if (footer) {
			footer.addEventListener("click", handleClick);
		}

		return () => {
			if (footer) {
				footer.removeEventListener("click", handleClick);
			}
		};
	}, [handleClick]);

	return (
		<div
			ref={footerRef}
			className={`footer ${isExpanded ? "footer-expanded" : ""}`}
		>
			<div className="footerIcon">
				<img
					src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/FFFFFF/external-instagram-social-media-tanah-basah-basic-outline-tanah-basah.png"
					alt="Instagram"
				/>
				<img
					src="https://img.icons8.com/ios/100/FFFFFF/line-me.png"
					alt="Line"
				/>
				<img
					src="https://img.icons8.com/ios-filled/100/FFFFFF/twitterx--v2.png"
					alt="Twitter"
				/>
			</div>
			<div id="buttonMoveUp">
				<img
					src="https://img.icons8.com/ios-filled/100/FFFFFF/up--v1.png"
					alt="Up"
				/>
				<p>see more</p>
				<span>地址:台中市公益路 二段 338號 8樓之8</span>
				<span>連絡電話 : 04-2278-5847</span>
				<span>隱私權政策</span>
				<hr />
				<span>Copy right©2024 Furry Health寵醫網</span>
			</div>
		</div>
	);
}

export default Footer;
