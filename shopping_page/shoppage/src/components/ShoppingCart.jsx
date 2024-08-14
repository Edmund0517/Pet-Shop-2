import React from 'react';
// import axios from 'axios';
import '../css/shoppingCart.css';
import Header from './Header';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cartItems: [...props.items]
    };
    this.cartRef = React.createRef();
  }
  state = {
    quantities: {}
  }

  handleCartClick = async (event) => {
    // 阻止事件冒泡，這樣點擊購物車時不會觸發 handleOutsideClick
    event.stopPropagation();

    if (this.state.showCart) {
      // 如果購物車已經顯示，則關閉它
      this.setState({ showCart: false });
      document.removeEventListener('mousedown', this.handleOutsideClick);
    } else {
      // 如果購物車未顯示，則加載購物車項目並顯示
      await this.props.loadCartItems();

      this.setState({ showCart: true }, () => {
        // 在 setState 的回調中添加事件監聽器，確保狀態已更新
        document.addEventListener('mousedown', this.handleOutsideClick);
      });
    }


    // await this.props.loadCartItems();

    // if (!this.state.showCart) {
    //   document.addEventListener('mousedown', this.handleOutsideClick);
    // } else {
    //   document.removeEventListener('mousedown', this.handleOutsideClick);
    // }
    // this.setState(prevState => ({
    //   showCart: !prevState.showCart
    // }));

  }

  handleOutsideClick = (event) => {
    // 確保點擊的不是購物車圖標本身
    if (this.cartRef && !this.cartRef.current.contains(event.target) &&
      !event.target.closest('.btnCart')) { // 假設購物車圖標有 'cart-icon' 類
      this.setState({ showCart: false });
      document.removeEventListener('mousedown', this.handleOutsideClick);
    }



    // if (this.cartRef && !this.cartRef.current.contains(event.target)) {
    //   this.setState({ showCart: false });
    //   document.removeEventListener('mousedown', this.handleOutsideClick);
    // }
  }


  handleQuantityChange = (productId, change) => {
    this.props.updateQuantity(productId, change);
  }

  handleDeleteItem = (productId) => {
    // console.log(productId);
    this.props.deleteItem(productId);
  }

  componentDidMount = () => {

  }

  goCheckBill = () => {
    window.location = '/shop/CheckBill'
  }

  render() {
    // console.log(11111);
    // console.log(this.props.items);
    return (
      <div>
        <Header cartClick={this.handleCartClick} />
        {/* <button id='btnCart' className="btnCart" onClick={this.handleCartClick}>購物車</button> */}
        {this.state.showCart && (
          <div ref={this.cartRef} className="cartPanel">
            <h2 className="cartTitle">購物清單</h2>
            <div className="itemListContainer">
              <ul className="itemList">
                {this.props.items.length === 0 && (
                  <li className='cartItem emptyCart'><p>還沒選購任何商品唷！</p></li>
                )}
                {this.props.items.map((item, index) => {
                  // console.log(222);
                  // console.log(item);
                  const pPrice = item.price * item.productDiscount;
                  return (
                    <li key={index} className="cartItem">
                      <div className="itemLeft">
                        <div className="imgConrainer">
                          <img src={item.productImg} alt="" className="img" />
                        </div>
                        <div className="cartNumberCtrl">
                          <div
                            className="cartCutNumber"
                            onClick={() => { this.handleQuantityChange(item.productId, -1) }}
                          >
                            <i className="bi bi-dash"></i>
                          </div>
                          {/* <input
                            className="pNumber" type="number" name="pNumber" min="1" max="99"
                            value={item.cartQuantity} readOnly /> */}
                          <p>{item.cartQuantity}</p>
                          <div
                            className="cartPlusNumber"
                            onClick={() => { this.handleQuantityChange(item.productId, 1) }}
                          >
                            <i className="bi bi-plus"></i>
                          </div>

                        </div>
                      </div>
                      <div className='itemRight'>
                        <div>
                          <p>商品名稱：{item.productName}</p>
                          <p>規格：{item.format}</p>
                          <p>單價：{pPrice}</p>
                        </div>
                        <div className='totalPrice'>
                          <p>${pPrice * item.cartQuantity}</p>
                          <button onClick={() => { this.handleDeleteItem(item.productId) }}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <button
              className="checkoutButton"
              onClick={this.goCheckBill}
            >
              結帳
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
