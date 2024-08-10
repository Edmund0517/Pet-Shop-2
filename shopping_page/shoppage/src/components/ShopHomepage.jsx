import React, { Component, createRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'bootstrap';
import ShoppingCart from './ShoppingCart';

// import '../css/header.css';
// import '../css/footer.css';
// import '../js/header';
// import '../js/footer';
// import '../js/bootstrap.bundle'

import '../css/homepage.css';
import '../css/homepage_carousel.css';
// import '../js/homepage';

class ShopHomepage extends Component {

    state = {
        bestSellProducts: [],
        brandSaleProducts: [],
        favoriteProducts: {},

        selectedFormats: {},
        selectedFhids: {},
        selectedFormats2: {},
        selectedFhids2: {},

        quantities: {},
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        memberId: 2,
        cartItems: []
    }

    // 加入購物車
    addToCart = async (productId, source) => {
        console.log(productId);
        let product;
        if(source == 'bestSell') {
            product = this.state.bestSellProducts.find(p => p.productId === productId);
        } else if (source === 'brandSale') {
            product = this.state.brandSaleProducts.find(p => p.productId === productId);
        }
        const quantity = this.state.quantities[productId] || 1;
        const selectedFhid = this.state.selectedFhids[productId] || product.fhids[0];
        const selectedFhid2 = this.state.selectedFhids2[productId] || product.fhids[0];
        console.log(product);
        console.log(quantity);
        console.log(selectedFhid);

        const dataToServer = {
            memberId: 2,
            productId: productId,
            quantity: quantity,
            fhid: (source === 'bestSell') ? selectedFhid : selectedFhid2
        }
        console.log( dataToServer);

        // 加入購物車，加到資料庫
        await axios.post("http://localhost:8000/shop",
            JSON.stringify(dataToServer),
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        );
        console.log("POST - OK");

        // 從資料庫讀取購物車資料

        const response = await axios.get("http://localhost:8000/shop/cart")
        const dataToRender = response.data.cartItems;
        console.log('購物車裡有' + dataToRender);

        this.setState({
            // cartItems: [...prevState.cartItems, productWithSize]
            cartItems: dataToRender
        });
    }

    // 輪播圖開始
    constructor(props) {
        super(props);
        this.carouselRef = React.createRef();
        this.carousel = null;
        this.containerRef = React.createRef();
    }

    componentDidMount = async () => {

        // 載入購物車資料
        this.loadCartItems();


        // 輪播
        if (this.carouselRef.current) {
            this.carousel = new Carousel(this.carouselRef.current, {
                interval: 3000,
                pause: 'hover'
            });
        }

        // 左右滑動功能
        const container = this.containerRef.current;
        container.addEventListener('mousedown', this.handleMouseDown);
        container.addEventListener('mouseleave', this.handleMouseLeave);
        container.addEventListener('mouseup', this.handleMouseUp);
        container.addEventListener('mousemove', this.handleMouseMove);


        // 連接資料庫 - bestSellProducts
        var result1 = await axios.get("http://localhost:8000/shop");
        var newState1 = { ...this.state };
        var pData1 = result1.data.products.map((product, index) => {
            return (
                {
                    'productId': product.productId,
                    'productName': product.productName,
                    'prices': product.prices,
                    'discounts': product.discounts,
                    'productImgs': product.productImgs,
                    'formats': product.formats,
                    'fhids': product.fhids,
                    // 'pHint': '約180g'
                }
            )
        });
        console.log(pData1);
        newState1.bestSellProducts = pData1;
        this.setState(newState1);

        // 連接資料庫 - brandSaleProducts
        var result2 = await axios.get("http://localhost:8000/shop");
        var newState2 = { ...this.state };
        var pData2 = result2.data.brand.map((product, index) => {
            return (
                {
                    'productId': product.productId,
                    'productName': product.productName,
                    'prices': product.prices,
                    'discounts': product.discounts,
                    'productImgs': product.productImgs,
                    'formats': product.formats,
                    'fhids': product.fhids,
                    // 'pHint': '約180g'
                }
            )
        });
        newState2.brandSaleProducts = pData2;
        this.setState(newState2);

        // 規格預設選第一個


        // const selectedFormats = {};
        // const selectedFhids = {};

        // this.state.bestSellProducts.forEach(product => {
        //     selectedFormats[product.productId] = 0;
        //     selectedFhids[product.productId] = product.fhids[0];
        // });

        // this.setState({ selectedFormats, selectedFhids });

    }

    componentWillUnmount() {
        if (this.carousel) {
            this.carousel.dispose();
        }

        // 左右滑動功能
        const container = this.containerRef.current;
        container.removeEventListener('mousedown', this.handleMouseDown);
        container.removeEventListener('mouseleave', this.handleMouseLeave);
        container.removeEventListener('mouseup', this.handleMouseUp);
        container.removeEventListener('mousemove', this.handleMouseMove);
    }

    loadCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8000/shop/cart");
            const dataToRender = response.data.cartItems;
            // console.log(dataToRender);

            this.setState({
                cartItems: dataToRender // 直接設置為從後端獲取的數組
            });
        } catch (error) {
            console.error("Error loading cart items:", error);
            // 你可能想在這裡添加一些錯誤處理邏輯
        }
    }

    handleMouseDown = (e) => {
        const container = this.containerRef.current;
        this.setState({
            isDown: true,
            startX: e.pageX - container.offsetLeft,
            scrollLeft: container.scrollLeft
        });
        container.classList.add('active');
    }

    handleMouseLeave = () => {
        this.setState({ isDown: false });
        this.containerRef.current.classList.remove('active');
    }

    handleMouseUp = () => {
        this.setState({ isDown: false });
        this.containerRef.current.classList.remove('active');
    }

    handleMouseMove = (e) => {
        if (!this.state.isDown) return;
        e.preventDefault();
        const container = this.containerRef.current;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - this.state.startX) * 2; // scroll-fast
        container.scrollLeft = this.state.scrollLeft - walk;
    }

    // 輪播圖進入離開
    carouselMouseEnter = () => {
        if (this.carousel) {
            this.carousel.pause();
        }
    }

    carouselMouseLeave = () => {
        if (this.carousel) {
            this.carousel.cycle();
        }
    }

    // 收藏按鈕
    handleFavoriteClick = (productId) => {
        this.setState(prevState => ({
            favoriteProducts: {
                ...prevState.favoriteProducts,
                [productId]: !prevState.favoriteProducts[productId]
            }
        }));
    }

    // 規格按鈕
    // 熱銷商品 - 規格按鈕
    handleFormatClick = (productId, index) => {
        this.setState(prevState => ({
            selectedFormats: {
                ...prevState.selectedFormats,
                [productId]: index
            },
            selectedFhids: {
                ...prevState.selectedFhids,
                [productId]: this.state.bestSellProducts.find(p => p.productId === productId)?.fhids[index] || [0]
            }
        }));
    }
    // 品牌特價 - 規格按鈕
    handleFormatClick2 = (productId, index) => {
        this.setState(prevState => ({
            selectedFormats2: {
                ...prevState.selectedFormats2,
                [productId]: index
            },
            selectedFhids2: {
                ...prevState.selectedFhids2,
                [productId]: this.state.brandSaleProducts.find(p => p.productId === productId)?.fhids[index] || [0]
            }
        }));
    }

    // 數量增減按鈕
    handleQuantityChange = (productId, change) => {
        this.setState(prevState => {
            const currentQuantity = prevState.quantities[productId] || 1;
            let newQuantity = currentQuantity + change;
            newQuantity = Math.max(1, newQuantity); // 確保數量不小於1

            return {
                quantities: {
                    ...prevState.quantities,
                    [productId]: newQuantity
                }
            };
        });
    }

    render() {

        return (
            <div>
                <ShoppingCart items={this.state.cartItems} />

                {/* <!-- Header --> */}
                {/* <header className="homeNavBar">
                    <span className="navItemLeft" id="navHome">首頁</span>
                    <span className="navItemLeft" id="navReserve">預約服務</span>
                    <div className="logoBg">
                        <div>
                            <img id="navBarLogo" src="./image/dog.png" alt="Logo" />
                        </div>
                    </div>
                    <span className="navItemRight" id="navShop" href="./homepage.html">購物</span>
                    <span className="navItemRight" id="navEdu">衛教知識</span>
                    <div className="navIcon">
                        <a href="#"><i style={{color: 'black'}} className="fa-regular fa-user"></i></a>
                        <a href="#"><i style={{color: 'black'}} className="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </header> */}
                {/* <!-- 底下是fontawesome icon  --> */}
                {/* <script src="https://kit.fontawesome.com/a89a722df2.js" crossOrigin="anonymous"></script> */}

                {/* <!-- 輪播圖 OK --> */}
                <div id="eventSlide" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000"
                    ref={this.carouselRef} onMouseEnter={this.carouselMouseEnter} onMouseLeave={this.carouselMouseLeave}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="" src="https://cdn-v4.petpetgo.com/1800/public/fc0bdf62-e954-43ec-9851-250bc0bac401.jpg"
                                alt="" />
                        </div>
                        <div className="carousel-item">
                            <img className="" src="https://cdn-v4.petpetgo.com/1800/public/401832d2-c93a-43b1-ae06-129eb124d2cf.jpg"
                                alt="" />
                        </div>
                        <div className="carousel-item">
                            <img className="" src="https://cdn-v4.petpetgo.com/1800/public/32267885-ccd8-422a-a671-748ea1447f13.jpg"
                                alt="" />
                        </div>
                    </div>
                </div>


                {/* <!-- 商品分類 OK --> */}
                <div id="productCategory">
                    <p className="titleName">商品類別</p>
                    <ul id="categories">
                        <li>
                            <a href="./category_page.html">
                                <img src="https://www.pet-pulse.com/petpulse_imgs/petpulse_1692935472" alt="" />
                            </a>
                            <a href="./category_page.html">
                                <p>貓咪飼料</p>
                                <img src="https://www.pet-pulse.com/petpulse_imgs/petpulse_1692935472" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img.freepik.com/premium-photo/pet-care-concept-various-pet-accessories-yellow-background_154515-5788.jpg"
                                    alt="" />
                            </a>
                            <a href="#">
                                <p>玩具</p>
                                <img src="https://img.freepik.com/premium-photo/pet-care-concept-various-pet-accessories-yellow-background_154515-5788.jpg"
                                    alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://cdn.thewirecutter.com/wp-content/media/2024/07/petcarriers-2048px-5235-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"
                                    alt="" />
                            </a>
                            <a href="#">
                                <p>寵物攜帶用品</p>
                                <img src="https://cdn.thewirecutter.com/wp-content/media/2024/07/petcarriers-2048px-5235-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"
                                    alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://springerpets.com/cdn/shop/files/DSC02675_f4ad954c-281b-447e-9372-c778b931688f_1024x1024.jpg?v=1699474376"
                                    alt="" />
                            </a>
                            <a href="#">
                                <p>牽繩</p>
                                <img src="https://springerpets.com/cdn/shop/files/DSC02675_f4ad954c-281b-447e-9372-c778b931688f_1024x1024.jpg?v=1699474376"
                                    alt="" />
                            </a>
                        </li>
                    </ul>
                </div>

                {/* <!-- 熱銷商品卡片 OK --> */}
                <div className="blockTitle titleName">
                    <p>熱銷商品</p>
                </div>
                <div className="bestsellerProduct" >
                    {this.state.bestSellProducts.map(product => {
                        const isFavorited = this.state.favoriteProducts[product.productId] || false;
                        const quantity = this.state.quantities[product.productId] || 1;
                        const selectedFormatIndex = this.state.selectedFormats[product.productId] || 0;
                        const price = product.prices[selectedFormatIndex];
                        const discount = product.discounts[selectedFormatIndex];
                        const salePrice = Math.round(price * discount);
                        return (
                            <div className="pCard" key={product.productId}>
                                <div className="pImage">
                                    <img src={product.productImgs[selectedFormatIndex]} alt="" />
                                    <button className={`btnFavorite ${isFavorited ? 'favorited' : ''}`}
                                        onClick={() => { this.handleFavoriteClick(product.productId) }}>
                                        {isFavorited ? (
                                            <i
                                                className="fa fa-heart"
                                                style={{ fontSize: '1rem', color: 'red' }}
                                            ></i>
                                        ) : (
                                            <i className="fa fa-heart-o"></i>
                                        )}
                                    </button>
                                </div>
                                <p className="pName">{product.productName}</p>
                                <p className="pPrice">${price}</p>
                                <p className="pSalePrice">${salePrice}</p>
                                <div className="pFastInfo">
                                    <p className="pSizeName">規格</p>
                                    <div className="pSizes">
                                        {product.formats.map((format, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`pSizeItem ${selectedFormatIndex === index ? 'selected' : ''}`}
                                                    onClick={() => this.handleFormatClick(product.productId, index)}>
                                                    {format}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="pNumberCtrl">
                                        <div
                                            className="cutNumber"
                                            onClick={() => { this.handleQuantityChange(product.productId, -1) }}
                                        >
                                            <i className="bi bi-dash"></i>
                                        </div>
                                        <input
                                            className="pNumber" type="number" name="pNumber" min="1" max="99"
                                            value={quantity} readOnly />
                                        <div
                                            className="plusNumber"
                                            onClick={() => { this.handleQuantityChange(product.productId, 1) }}
                                        >
                                            <i className="bi bi-plus"></i>
                                        </div>
                                        <button onClick={() => this.addToCart(product.productId, 'bestSell')} >
                                            <i className="bi bi-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* <!-- 品牌特價 OK --> */}
                <div className="brandSale">
                    <p className="titleName">品牌限時特價</p>
                    <div className="saleContainer" ref={this.containerRef}>
                        {this.state.brandSaleProducts.map((product, index) => {
                            const isFavorited = this.state.favoriteProducts[product.productId] || false;
                            const quantity = this.state.quantities[product.productId] || 1;
                            const selectedFormatIndex2 = this.state.selectedFormats2[product.productId] || 0;
                            // console.log(selectedFormatIndex2);
                            const price = product.prices[selectedFormatIndex2];
                            const discount = product.discounts[selectedFormatIndex2];
                            const salePrice = Math.round(price * discount);
                            return (
                                <div className="pCard" key={index}>
                                    <div className="pImage">
                                        <img src={product.productImgs[selectedFormatIndex2]} alt="" />
                                        <button className={`btnFavorite ${isFavorited ? 'favorited' : ''}`}
                                            onClick={() => { this.handleFavoriteClick(product.productId) }}>
                                            {isFavorited ? (
                                                <i
                                                    className="fa fa-heart"
                                                    style={{ fontSize: '1rem', color: 'red' }}
                                                ></i>
                                            ) : (
                                                <i className="fa fa-heart-o"></i>
                                            )}
                                        </button>
                                    </div>
                                    <p className="pName">{product.productName}</p>
                                    <p className="pPrice">${price}</p>
                                    <p className="pSalePrice">${salePrice}</p>
                                    <div className="pFastInfo">
                                        <p className="pSizeName">規格</p>
                                        <div className="pSizes">
                                            {product.formats.map((format, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`pSizeItem ${selectedFormatIndex2 === index ? 'selected' : ''}`}
                                                        onClick={() => this.handleFormatClick2(product.productId, index)}>
                                                        {format}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="pNumberCtrl">
                                            <div
                                                className="cutNumber"
                                                onClick={() => { this.handleQuantityChange(product.productId, -1) }}
                                            >
                                                <i className="bi bi-dash"></i>
                                            </div>
                                            <input
                                                className="pNumber" type="number" name="pNumber" min="1" max="99"
                                                value={quantity} readOnly />
                                            <div
                                                className="plusNumber"
                                                onClick={() => { this.handleQuantityChange(product.productId, 1) }}
                                            >
                                                <i className="bi bi-plus"></i>
                                            </div>
                                            <button  onClick={() => this.addToCart(product.productId, 'brandSale')} >
                                                <i className="bi bi-cart-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* <!-- footer --> */}
                {/* <div className="footer" onClick="toggleFooter()">
                    <div className="footerIcon">
                        <img
                            src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/FFFFFF/external-instagram-social-media-tanah-basah-basic-outline-tanah-basah.png" />
                        <img src="https://img.icons8.com/ios/100/FFFFFF/line-me.png" />
                        <img src="https://img.icons8.com/ios-filled/100/FFFFFF/twitterx--v2.png" />
                    </div>
                    <div id="buttonMoveUp">
                        <img src="https://img.icons8.com/ios-filled/100/FFFFFF/up--v1.png" />

                        <p>see more</p>
                        <span>地址:台中市公益路 二段 338號 8樓之8</span>
                        <span>連絡電話 : 04-2278-5847</span>
                        <span>隱私權政策</span>

                        <hr />
                        <span>Copy right©2024 Furry Health寵醫網</span>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default ShopHomepage;