import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../css/header.css";

function Header({ cartClick }) {
	const [isNavVisible, setNavVisible] = useState(false);
	// const navigate = useNavigate();

	const toggleNav = () => {
		setNavVisible(!isNavVisible);
	};

	const shoppingBtn = () => {
		window.location = '/shop'
	}

	// const navigateTo = (path) => {
	// 	navigate(path);
	// 	setNavVisible(false); // 關閉導航菜單（如果打開）
	// };

	return (
		<header className="homeNavBar">
			<div className={`navBarShowOut ${isNavVisible ? "show" : ""}`}>
				<img
					className="closeNavBarShowOut"
					src="https://img.icons8.com/ios-glyphs/60/FFFFFF/delete-sign.png"
					alt="Close"
					onClick={toggleNav}
				/>
				<button>首頁</button>
				<button>預約服務</button>
				<button onClick={shoppingBtn}>購物</button>
				<button>衛教知識</button>
			</div>
			<img
				className="hamburger"
				src="https://img.icons8.com/stamp/32/menu.png"
				alt="menu"
				onClick={toggleNav}
			/>
			<span
				className="navItemLeft"
				id="navHome"

			// onClick={("/")}
			>
				首頁
			</span>
			<span
				className="navItemLeft"
				id="navReserve"

			// onClick={("/reservation")}
			>
				預約服務
			</span>
			<div className="logoBg">
				<div
				// onClick={("/")}
				>
					<img
						id="navBarLogo"
						src="/dog.png"
						alt="Logo"
					/>
				</div>
			</div>
			<span
				className="navItemRight"
				id="navShop"
				onClick={shoppingBtn}
			>
				購物
			</span>
			<span
				className="navItemRight"
				id="navEdu"
			// 
			// onClick={("/health")}
			>
				衛教知識
			</span>
			<div className="navIcon">
				<button
				// onClick={("/user")}
				>
					{/* <i style={{ color: "black" }} className="fa-regular fa-user"></i> */}
					<span>吳康人</span>
				</button>
				<button onClick={cartClick} className="btnCart">
					<i
						style={{ color: "black" }}
						className="fa-solid fa-cart-shopping"
					></i>
				</button>
			</div>
		</header>
	);
}

export default Header;
