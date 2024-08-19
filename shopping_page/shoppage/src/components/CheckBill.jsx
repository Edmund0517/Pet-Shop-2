import React, { Component } from 'react';
import axios from 'axios';
import withRouter from 'react-router-dom';

import '../css/checkBill.css'

class CheckBill extends Component {
    state = {
        cartItems: [],
        totalPrice: 0,
        selectedDeliveryOption: null,
        selectedPaymentOption: null,

        buyerName: '吳康人',
        buyerPhone: '0912345678',
        buyerEmail: 'kangren_wu@actor.com',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        errors: {
            buyerName: '',
            buyerPhone: '',
            buyerEmail: '',
            receiverName: '欄位不能空白',
            receiverPhone: '欄位不能空白',
            receiverAddress: '欄位不能空白',
        },

        showAdditionalInfo: false,
        isOrderContentExpanded: true
    }

    componentDidMount = () => {
        // 載入購物車資料
        this.loadCartItems();
        // this.handleInputChange(e);
    }

    // 載入購物車資料的function
    loadCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8000/shop/cart");
            const dataToRender = response.data.cartItems;
            // console.log(dataToRender);
            const smallPrice = dataToRender.reduce((acc, item) => {
                return acc + (item.price * item.productDiscount * item.cartQuantity);
            }, 0);

            // console.log(smallPrice);

            this.setState({
                cartItems: dataToRender,
                totalPrice: smallPrice
            });
        } catch (error) {
            console.error("Error loading cart items:", error);
        }
    }

    // 再去逛逛的按鈕
    backToShop = () => {
        this.props.history.goBack();
    }

    // 按下一步顯示資訊且隱藏下一步按鈕
    showAdditionalInfo = () => {
        this.setState({
            showAdditionalInfo: true,
            isOrderContentExpanded: false
        });
    }

    // 控制訂單區域展開收合
    toggleOrderContent = () => {
        this.setState(prevState => ({
            isOrderContentExpanded: !prevState.isOrderContentExpanded
        }));
    }

    // 選擇配送方式
    handleDeliveryOptionClick = (option) => {
        this.setState({ selectedDeliveryOption: option });
    };
    // 選擇付款方式
    handlePaymentOptionClick = (option) => {
        this.setState({ selectedPaymentOption: option });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        let errors = { ...this.state.errors };

        switch (name) {
            case 'buyerName':
                const nameRegex = /^[\p{L}\s]+$/u;
                if (value.trim() === '') {
                    errors.buyerName = '欄位不能空白';
                } else if (!nameRegex.test(value)) {
                    errors.buyerName = '姓名只能包含中文字、英文字母和空格';
                } else if (value.trim().length < 2) {
                    errors.buyerName = '姓名至少需要2個字元';
                } else {
                    errors.buyerName = '';
                }
                break;
            case 'buyerPhone':
                const phoneRegex = /^09\d{8}$/;
                if (value.trim() === '') {
                    errors.buyerPhone = '欄位不能空白';
                } else if (!phoneRegex.test(value)) {
                    errors.buyerPhone = '手機格式錯誤';
                } else {
                    errors.buyerPhone = '';
                }
                break;
            case 'buyerEmail':
                const emailRegex = /\S+@\S+\.\S+/;
                if (value.trim() === '') {
                    errors.buyerEmail = '欄位不能空白';
                } else if (!emailRegex.test(value)) {
                    errors.buyerEmail = '請輸入正確的Email格式';
                } else {
                    errors.buyerEmail = '';
                }
                break;
            case 'receiverName':
                const nameRegex2 = /^[\p{L}\s]+$/u;
                if (value.trim() === '') {
                    errors.receiverName = '欄位不能空白';
                } else if (!nameRegex2.test(value)) {
                    errors.receiverName = '姓名只能包含中文字、英文字母和空格';
                } else if (value.trim().length < 2) {
                    errors.receiverName = '姓名至少需要2個字元';
                } else {
                    errors.receiverName = '';
                }
                break;
            case 'receiverPhone':
                const phoneRegex2 = /^09\d{8}$/;
                if (value.trim() === '') {
                    errors.receiverPhone = '欄位不能空白';
                } else if (!phoneRegex2.test(value)) {
                    errors.receiverPhone = '手機格式錯誤';
                } else {
                    errors.receiverPhone = '';
                }
                break;
            case 'receiverAddress':
                if (value.trim() === '') {
                    errors.receiverAddress = '欄位不能空白';
                } else {
                    errors.receiverAddress = '';
                }
                break;
            default:
                break;
        }

        // this.setState({
        //     [name]: value,
        //     errors,
        // });

        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: errors[name]
            }
        }));
    }

    copyBuyerInfo = () => {
        this.setState({
            receiverName: this.state.buyerName,
            receiverPhone: this.state.buyerPhone
        }, () => {
            // 在 setState 的回調函數中手動觸發 handleInputChange
            const nameEvent = { target: { name: 'receiverName', value: this.state.receiverName } };
            const phoneEvent = { target: { name: 'receiverPhone', value: this.state.receiverPhone } };

            this.handleInputChange(nameEvent);
            this.handleInputChange(phoneEvent);
        });
    }

    render() {
        const { selectedDeliveryOption, selectedPaymentOption } = this.state;
        const { errors } = this.state;
        return (
            <>
                <div id="pageTitle">
                    <h1>結帳</h1>
                </div>
                <div
                    id="orderContent"
                // className={`orderContent ${this.state.isOrderContentExpanded ? 'expanded' : ''}`}
                >
                    <button
                        className={`rotateIcon ${this.state.isOrderContentExpanded ? 'expanded' : ''}`}
                        onClick={this.toggleOrderContent}
                    >
                        <i className='bi bi-chevron-down'></i>
                    </button>
                    {this.state.isOrderContentExpanded && (
                        <>
                            <div className='orderTitle'>訂單明細</div>
                            <div id="orderColumnTitle">
                                <div>商品</div>
                                <div>規格</div>
                                <div>數量</div>
                                <div>單價</div>
                                <div>小計</div>
                            </div>
                            <div id="orderList">
                                {this.state.cartItems.map((item, index) => {
                                    return (
                                        <div key={index} className="orderItem">
                                            <div>
                                                <img src={item.productImg} alt="" />
                                                <p>{item.productName}</p>
                                            </div>
                                            <div>{item.format}</div>
                                            <div>{item.cartQuantity}</div>
                                            <div>${item.price * item.productDiscount}</div>
                                            <div>${item.price * item.productDiscount * item.cartQuantity}</div>
                                            {/* <div>
                                                <div id="btnTrash">
                                                    <i className="bi bi-trash3"></i>
                                                </div>
                                            </div> */}
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                    <div id="orderTotal">
                        <div>
                            <span>總計：</span>
                            <span>$</span>
                            <span id="totalPrice">{this.state.totalPrice}</span>
                        </div>
                        {!this.state.showAdditionalInfo && (
                            <>
                                <a onClick={this.backToShop}>再去逛逛</a>
                                <a onClick={this.showAdditionalInfo}>下一步</a>
                            </>
                        )}
                    </div>
                </div>
                {this.state.showAdditionalInfo && (
                    <>
                        <div id="deliverAndPayment" style={{ display: 'block' }}>
                            <div className="wayTitle">
                                配送方式
                                <img src="https://cdn.shopify.com/s/files/1/0644/0094/9484/files/delivery-truck-loading-exporting-v2_beae1ef9-38d5-4aa6-8af8-27ce59b0e86c.gif" alt="" />
                                {!selectedDeliveryOption && (
                                    <span>請選擇配送方式</span>
                                )}
                            </div>
                            <div id="deliverWay">
                                <div
                                    className="convCheck"
                                    onClick={() => this.handleDeliveryOptionClick('超商取貨')}
                                >
                                    <i className={`bi ${selectedDeliveryOption === '超商取貨' ? 'bi-check-circle' : 'bi-circle'}`}></i>
                                    <span>超商取貨</span>
                                </div>
                                <div
                                    className="houseCheck"
                                    onClick={() => this.handleDeliveryOptionClick('宅配到府')}
                                >
                                    <i className={`bi ${selectedDeliveryOption === '宅配到府' ? 'bi-check-circle' : 'bi-circle'}`}></i>
                                    <span>宅配到府</span>
                                </div>
                            </div>
                            <div className="wayTitle">
                                付款方式
                                <img src="https://static.wixstatic.com/media/ce96cf_e9ce98a481ac4be78b6c01382985285d~mv2.gif" alt="" />
                                {!selectedPaymentOption && (
                                    <span>請選擇付款方式</span>
                                )}
                            </div>
                            <div id="paymentWay">
                                <div
                                    className="convCheck"
                                    onClick={() => this.handlePaymentOptionClick('貨到付款')}
                                >
                                    <i className={`bi ${selectedPaymentOption === '貨到付款' ? 'bi-check-circle' : 'bi-circle'}`}></i>
                                    <span>貨到付款</span>
                                </div>
                                <div
                                    className="houseCheck"
                                    onClick={() => this.handlePaymentOptionClick('信用卡付款')}
                                >
                                    <i className={`bi ${selectedPaymentOption === '信用卡付款' ? 'bi-check-circle' : 'bi-circle'}`}></i>
                                    <span>信用卡付款</span>
                                </div>
                            </div>
                        </div>

                        <div id="deliverInfo" style={{ display: 'flex' }}>
                            <div id="buyPerson">
                                <div className="infoTitle">
                                    <span>購買人資料</span>
                                </div>
                                <div className="infoBlockA">
                                    <p className="inputRequired">姓名</p>
                                    <input
                                        type="text"
                                        name='buyerName'
                                        value={this.state.buyerName}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    {errors.buyerName && <span>{errors.buyerName}</span>}
                                    <p className="inputRequired">手機號碼</p>
                                    <input
                                        type="phone"
                                        name="buyerPhone"
                                        value={this.state.buyerPhone}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    {errors.buyerPhone && <span>{errors.buyerPhone}</span>}
                                    <p className="inputRequired">Email</p>
                                    <input
                                        type='email'
                                        name='buyerEmail'
                                        value={this.state.buyerEmail}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    {errors.buyerEmail && <span>{errors.buyerEmail}</span>}
                                </div>
                            </div>
                            <div id="receivePerson">
                                <div className="infoTitle">
                                    <span>收件人資料</span>
                                    <button id="btnCopy" onClick={this.copyBuyerInfo}>複製購買人資料</button>
                                </div>
                                <div className="infoBlockB">
                                    <p className="inputRequired">姓名</p>
                                    <input
                                        type="text"
                                        name="receiverName"
                                        value={this.state.receiverName}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    {errors.receiverName && <span>{errors.receiverName}</span>}
                                    <p className="inputRequired">手機號碼</p>
                                    <input
                                        type="phone"
                                        name="receiverPhone"
                                        value={this.state.receiverPhone}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    {errors.receiverPhone && <span>{errors.receiverPhone}</span>}
                                    <p className="inputRequired">地址</p>
                                    <input
                                        type="text"
                                        name='receiverAddress'
                                        value={this.receiverAddress}
                                        onChange={this.handleInputChange}
                                        required />
                                    {errors.receiverAddress && <span>{errors.receiverAddress}</span>}
                                    <p className="inputNormal">物流備註</p>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div id="finishOrder" style={{ display: 'flex' }}>
                            <a href="">送出訂單</a>
                        </div>
                    </>
                )}
            </>
        );
    }
}
export default CheckBill;