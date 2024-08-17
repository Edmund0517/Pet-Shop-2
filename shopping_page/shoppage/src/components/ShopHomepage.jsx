import React, { Component, createRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'bootstrap';
import ShoppingCart from './ShoppingCart';
import Footer from './Footer';

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
    addToCart = async (shid, source) => {
        console.log(shid);
        let product;
        if (source == 'bestSell') {
            product = this.state.bestSellProducts.find(p => p.shid === shid);
        } else if (source === 'brandSale') {
            product = this.state.brandSaleProducts.find(p => p.shid === shid);
        }
        const quantity = this.state.quantities[shid] || 1;
        const selectedFhid = this.state.selectedFhids[shid] || product.productIds[0];
        const selectedFhid2 = this.state.selectedFhids2[shid] || product.productIds[0];
        console.log(product);
        console.log(quantity);
        console.log(selectedFhid);

        const dataToServer = {
            memberId: 2,
            productId: (source === 'bestSell') ? selectedFhid : selectedFhid2,
            quantity: quantity,
            // fhid: (source === 'bestSell') ? selectedFhid : selectedFhid2
        }
        console.log(dataToServer);

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
                interval: 2000,
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
                    'shid': product.shid,
                    'productIds': product.productIds,
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
        // console.log(pData1);
        newState1.bestSellProducts = pData1;
        this.setState(newState1);

        // 連接資料庫 - brandSaleProducts
        var result2 = await axios.get("http://localhost:8000/shop");
        var newState2 = { ...this.state };
        var pData2 = result2.data.brand.map((product, index) => {
            return (
                {
                    'shid': product.shid,
                    'productIds': product.productIds,
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
        //     selectedFormats[product.shid] = 0;
        //     selectedFhids[product.shid] = product.productIds[0];
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

    goToFood = () => {
        window.location = '/shop/Food'
    }

    // 收藏按鈕
    handleFavoriteClick = (shid) => {
        this.setState(prevState => ({
            favoriteProducts: {
                ...prevState.favoriteProducts,
                [shid]: !prevState.favoriteProducts[shid]
            }
        }));
    }

    // 規格按鈕
    // 熱銷商品 - 規格按鈕
    handleFormatClick = (shid, index) => {
        this.setState(prevState => ({
            selectedFormats: {
                ...prevState.selectedFormats,
                [shid]: index
            },
            selectedFhids: {
                ...prevState.selectedFhids,
                [shid]: this.state.bestSellProducts.find(p => p.shid === shid)?.productIds[index] || [0]
            }
        }));
    }
    // 品牌特價 - 規格按鈕
    handleFormatClick2 = (shid, index) => {
        this.setState(prevState => ({
            selectedFormats2: {
                ...prevState.selectedFormats2,
                [shid]: index
            },
            selectedFhids2: {
                ...prevState.selectedFhids2,
                [shid]: this.state.brandSaleProducts.find(p => p.shid === shid)?.productIds[index] || [0]
            }
        }));
    }

    // 數量增減按鈕
    handleQuantityChange = (shid, change) => {
        this.setState(prevState => {
            const currentQuantity = prevState.quantities[shid] || 1;
            let newQuantity = currentQuantity + change;
            newQuantity = Math.max(1, newQuantity); // 確保數量不小於1

            return {
                quantities: {
                    ...prevState.quantities,
                    [shid]: newQuantity
                }
            };
        });
    }

    // 購物車數量更新按鈕
    updateItemQuantity = async (productId, change) => {
        // 找到當前商品
        const currentItem = this.state.cartItems.find(item => item.productId === productId);
        if (!currentItem) {
            console.error('找不到商品');
            return;
        }

        // 計算新數量
        const newQuantity = Math.max(1, currentItem.cartQuantity + change);

        // 準備發送到伺服器的數據
        const dataToServer = {
            memberId: 2,
            productId: productId,
            quantity: newQuantity
        };
        console.log(dataToServer);
        // 發送 PUT 請求更新資料庫
        await axios.post('http://localhost:8000/shop/cart/update',
            dataToServer,
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        );

        // 更新本地 state
        this.setState(prevState => ({
            cartItems: prevState.cartItems.map(item => {
                if (item.productId === productId) {
                    return { ...item, cartQuantity: newQuantity };
                }
                return item;
            })
        }));
    }

    // 購物車刪除按鈕
    deleteCartItem = async (productId) => {
        const dataToServer = {
            memberId: 2,
            productId: productId,
        };
        console.log(dataToServer);
        // alert('delete??')
        // 發送 DELETE 請求更新資料庫
        await axios.delete('http://localhost:8000/shop', {
            // delete需要使用 params 或 data 選項來發送數據
            data: dataToServer,
            headers: {
                "content-type": "application/json"
            }
        });
        console.log('item has been deleted');
        await this.loadCartItems();
    }



    render() {

        return (
            <div>
                {/* <Header /> */}
                <ShoppingCart
                    items={this.state.cartItems}
                    updateQuantity={this.updateItemQuantity}
                    loadCartItems={this.loadCartItems}
                    deleteItem={this.deleteCartItem}
                />
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
                    <p className="cateName">商品類別</p>
                    <ul id="categories">
                        <li>
                            <a onClick={this.goToFood}>
                                <img src="https://www.pet-pulse.com/petpulse_imgs/petpulse_1692935472" alt="" />
                            </a>
                            <a onClick={this.goToFood}>
                                <p>飼料</p>
                                <img src="https://image.made-in-china.com/202f0j00VWKuQULdYlrk/Hot-Sale-Pet-Supplies-Bulk-Cat-Food-Wholesale-Catfood-2kg.webp" alt="" />
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="https://thekindpet.com/cdn/shop/articles/Why_We_Say_No_To_Nylon_Dog_Toys_And_You_Should_Too.png?v=1683121728"
                                    alt="" />
                            </a>
                            <a>
                                <p>玩具</p>
                                <img src="https://img.freepik.com/premium-photo/pet-care-concept-various-pet-accessories-yellow-background_154515-5788.jpg"
                                    alt="" />
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="https://khpet.com/cdn/shop/files/100540973_Mod_Capsule_Pet_Carrier_and_Shelter_PDP-ATF_1_cb7673f9-3930-4523-ae27-d9b636e3f431_700x700.jpg?v=1717093839"
                                    alt="" />
                            </a>
                            <a>
                                <p>寵物攜帶用品</p>
                                <img src="https://cdn.thewirecutter.com/wp-content/media/2024/07/petcarriers-2048px-5235-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"
                                    alt="" />
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="https://i.etsystatic.com/11167695/r/il/3ba342/2780217509/il_570xN.2780217509_777z.jpg"
                                    alt="" />
                            </a>
                            <a>
                                <p>牽繩</p>
                                <img src="https://springerpets.com/cdn/shop/files/DSC02675_f4ad954c-281b-447e-9372-c778b931688f_1024x1024.jpg?v=1699474376"
                                    alt="" />
                            </a>
                        </li>
                    </ul>
                </div>

                {/* <!-- 熱銷商品卡片 OK --> */}
                <div className="blockTitle titleName bestSellBlock">
                    <p>熱銷商品</p>
                </div>
                <div className="bestsellerProduct" >
                    {this.state.bestSellProducts.map(product => {
                        const isFavorited = this.state.favoriteProducts[product.shid] || false;
                        const quantity = this.state.quantities[product.shid] || 1;
                        const selectedFormatIndex = this.state.selectedFormats[product.shid] || 0;
                        const price = product.prices[selectedFormatIndex];
                        const discount = product.discounts[selectedFormatIndex];
                        const salePrice = Math.round(price * discount);
                        return (
                            <div className="pCard" key={product.shid}>
                                <div className="pImage">
                                    <img src={product.productImgs[selectedFormatIndex]} alt="" />
                                    <button className={`btnFavorite ${isFavorited ? 'favorited' : ''}`}
                                        onClick={() => { this.handleFavoriteClick(product.shid) }}>
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
                                                    onClick={() => this.handleFormatClick(product.shid, index)}>
                                                    {format}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="pNumberCtrl">
                                        <div
                                            className="cutNumber"
                                            onClick={() => { this.handleQuantityChange(product.shid, -1) }}
                                        >
                                            <i className="bi bi-dash"></i>
                                        </div>
                                        <input
                                            className="pNumber" type="number" name="pNumber" min="1" max="99"
                                            value={quantity} readOnly />
                                        <div
                                            className="plusNumber"
                                            onClick={() => { this.handleQuantityChange(product.shid, 1) }}
                                        >
                                            <i className="bi bi-plus"></i>
                                        </div>
                                        <button onClick={() => this.addToCart(product.shid, 'bestSell')} >
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
                    <p className="titleName brandSaleBlock">
                        <span>精選品牌</span>
                        <span>限時特價</span>
                    </p>
                    <div className="saleContainer" ref={this.containerRef}>
                        {this.state.brandSaleProducts.map((product, index) => {
                            const isFavorited = this.state.favoriteProducts[product.shid] || false;
                            const quantity = this.state.quantities[product.shid] || 1;
                            const selectedFormatIndex2 = this.state.selectedFormats2[product.shid] || 0;
                            // console.log(selectedFormatIndex2);
                            const price = product.prices[selectedFormatIndex2];
                            const discount = product.discounts[selectedFormatIndex2];
                            const salePrice = Math.round(price * discount);
                            return (
                                <div className="pCard" key={index}>
                                    <div className="pImage">
                                        <img src={product.productImgs[selectedFormatIndex2]} alt="" />
                                        <button className={`btnFavorite ${isFavorited ? 'favorited' : ''}`}
                                            onClick={() => { this.handleFavoriteClick(product.shid) }}>
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
                                                        onClick={() => this.handleFormatClick2(product.shid, index)}>
                                                        {format}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="pNumberCtrl">
                                            <div
                                                className="cutNumber"
                                                onClick={() => { this.handleQuantityChange(product.shid, -1) }}
                                            >
                                                <i className="bi bi-dash"></i>
                                            </div>
                                            <input
                                                className="pNumber" type="number" name="pNumber" min="1" max="99"
                                                value={quantity} readOnly />
                                            <div
                                                className="plusNumber"
                                                onClick={() => { this.handleQuantityChange(product.shid, 1) }}
                                            >
                                                <i className="bi bi-plus"></i>
                                            </div>
                                            <button onClick={() => this.addToCart(product.shid, 'brandSale')} >
                                                <i className="bi bi-cart-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default ShopHomepage;