import React, { Component } from 'react';
import axios from 'axios';

import '../css/checkBill.css'

class CheckBill extends Component {
    state = {
        buyerName: '',
        buyerPhone: '',
        receiverName: '',
        receiverPhone: '',
        showAdditionalInfo: false,
        isOrderContentExpanded: true
    }

    showAdditionalInfo = () => {
        this.setState({
            showAdditionalInfo: true,
            isOrderContentExpanded: false
        });
    }

    toggleOrderContent = () => {
        this.setState(prevState => ({
            isOrderContentExpanded: !prevState.isOrderContentExpanded
        }));
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    copyBuyerInfo = () => {
        this.setState(prevState => ({
            receiverName: prevState.buyerName,
            receiverPhone: prevState.buyerPhone
        }));
    }

    render() {
        return (
            <>
                <div id="pageTitle">
                    <h1>結帳</h1>
                </div>
                <div id="orderContent">
                    <button onClick={this.toggleOrderContent}>
                        {this.state.isOrderContentExpanded ? '收合訂單內容' : '展開訂單內容'}
                    </button>
                    {this.state.isOrderContentExpanded && (
                        <>
                            <div className='orderTitle'>訂單明細</div>
                            <div id="orderColumnTitle">
                                <div>商品</div>
                                <div>規格</div>
                                <div>數量</div>
                                <div>價格</div>
                                <div>刪除</div>
                            </div>
                            <div id="orderList">
                                <div id="orderItem">
                                    <div>
                                        <img src="https://shoplineimg.com/63c12d63600b0a00b7c2ed0c/664fed38becc6900199e19b7/800x.webp?source_format=jpg" alt="" />
                                        <p>《美喵人生 O'KAT》冷凍乾燥生肉糧｜貓冷凍脫水乾糧</p>
                                    </div>
                                    <div>鮪魚+雞</div>
                                    <div>1</div>
                                    <div>$699</div>
                                    <div>
                                        <div id="btnTrash">
                                            <i className="bi bi-trash3"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div id="orderTotal">
                        <div>
                            <span>總計：</span>
                            <span>$</span>
                            <span id="totalPrice">699</span>
                        </div>
                        {!this.state.showAdditionalInfo && (
                            <>
                                <a href="./category_page.html">再去逛逛</a>
                                <a onClick={this.showAdditionalInfo}>下一步</a>
                            </>
                        )}
                    </div>
                </div>
                {this.state.showAdditionalInfo && (
                    <>
                        <div id="deliverAndPayment" style={{ display: 'block' }}>
                            <div className="wayTitle">配送方式</div>
                            <div id="deliverWay">
                                <div>
                                    {/* <div id="convCheck" className="">
                                        <i className="bi bi-circle"></i>
                                    </div> */}
                                    <label htmlFor="cDelivery">
                                        <input type="radio" name="delivery" id="cDelivery" />
                                        {/* <i className="bi bi-check-circle"></i> */}
                                        <span>超商取貨</span>
                                    </label>
                                </div>
                                <div>
                                    {/* <div id="houseCheck">
                                        <i className="bi bi-circle"></i>
                                    </div> */}
                                    <label htmlFor="hDelivery">
                                        <input type="radio" name="delivery" id="hDelivery" />
                                        <span>宅配到府</span>
                                    </label>
                                </div>
                            </div>
                            <div className="wayTitle">付款方式</div>
                            <div id="paymentWay">
                                <div>
                                    {/* <div id="cashPay" className="">
                                        <i className="bi bi-circle"></i>
                                    </div> */}
                                    <label htmlFor="cashPayment">
                                        <input type="radio" name="payment" id="cashPayment" />
                                        {/* <i className="bi bi-check-circle"></i> */}
                                        <span>貨到付款</span>
                                    </label>
                                </div>
                                <div>
                                    {/* <div id="cardPay">
                                        <i className="bi bi-circle"></i>
                                    </div> */}
                                    <label htmlFor="cardPayment">
                                        <input type="radio" name="payment" id="cardPayment" />
                                        <span>信用卡付款</span>
                                    </label>
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
                                    <p className="inputRequired">手機號碼</p>
                                    <input
                                        type="phone"
                                        name="buyerPhone"
                                        value={this.state.buyerPhone}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    <p className="inputRequired">Email</p>
                                    <input type="text" required />
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
                                    <p className="inputRequired">手機號碼</p>
                                    <input
                                        type="phone"
                                        name="receiverPhone"
                                        value={this.state.receiverPhone}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    <p className="inputRequired">地址</p>
                                    <input type="text" required />
                                    <p className="inputNormal">物流備註</p>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div id="finishOrder" style={{display: 'flex'}}>
                            <a href="">送出訂單</a>
                        </div>
                    </>
                )}
            </>
        );
    }
}
export default CheckBill;