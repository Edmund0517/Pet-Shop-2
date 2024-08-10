import React from 'react';
// import axios from 'axios';
import '../css/shoppingCart.css';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false
    };
    this.cartRef = React.createRef();
  }

  handleCartClick = async () => {
    if (!this.state.showCart) {
      document.addEventListener('mousedown', this.handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', this.handleOutsideClick);
    }
    this.setState(prevState => ({
      showCart: !prevState.showCart
    }));
  }

  handleOutsideClick = (event) => {
    if (this.cartRef && !this.cartRef.current.contains(event.target)) {
      this.setState({ showCart: false });
      document.removeEventListener('mousedown', this.handleOutsideClick);
    }
  }

  render() {
    // console.log(11111);
    // console.log(this.props.items);
    return (
      <div>
        <button id='btnCart' className="btnCart" onClick={this.handleCartClick}>購物車</button>
        {this.state.showCart && (
          <div ref={this.cartRef} className="cartPanel">
            <h2 className="cartTitle">購物清單</h2>
            <div className="itemListContainer">
              <ul className="itemList">
                {this.props.items.map((item, index) => {
                  // console.log(222);
                  console.log(item);
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
                            onClick={() => { this.handleQuantityChange() }}
                          >
                            <i className="bi bi-dash"></i>
                          </div>
                          {/* <input
                            className="pNumber" type="number" name="pNumber" min="1" max="99"
                            value={item.cartQuantity} readOnly /> */}
                          <p>{item.cartQuantity}</p>
                          <div
                            className="cartPlusNumber"
                            onClick={() => { this.handleQuantityChange() }}
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
                          <p>${ pPrice * item.cartQuantity }</p>
                          <button>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <button className="checkoutButton">結帳</button>
          </div>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
