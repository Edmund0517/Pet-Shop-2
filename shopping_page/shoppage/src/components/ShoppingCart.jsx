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
                  return (
                    <li key={index} className="cartItem">
                      <div className="itemLeft">
                        <div className="imgConrainer">
                          <img src={item.productImg} alt="" className="img" />
                        </div>
                        
                        <div>
                          {item.cartQuantity}
                        </div>
                      </div>
                      <div className='itemRight'>
                        <div>
                          <p>商品名稱：{item.productName}</p>
                          <p>規格：{item.format}</p>
                          <p>單價：{item.price * item.productDiscount}</p>
                        </div>
                        <div>
                          <p></p>
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

// const styles = {
//   btnCart: {
//     position: 'fixed'
//   },
//   cartPanel: {
//     position: 'absolute',
//     top: '50px',
//     // right: '10px',
//     // width: '400px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     backgroundColor: '#fff',
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//     display: 'flex',
//     flexDirection: 'column',
//     zIndex: '2',
//     position: 'fixed',
//     boxSizing: 'border-box'
//   },
//   cartTitle: {
//     marginTop: 0,
//     marginBottom: '10px',
//   },
//   itemListContainer: {
//     width: 'fit-content',
//     flexGrow: 1,
//     overflowY: 'auto', // 添加垂直滾動
//     overflowX: 'hidden', // 隱藏水平滾動
//     maxHeight: '300px', // 設置最大高度
//     padding: "20px"

//   },
//   itemList: {
//     listStyleType: 'none',
//     padding: 0,
//     margin: 0,
//     width: '100%'
//   },
//   item: {
//     padding: '5px 0',
//     borderBottom: '1px solid #eee',
//     textDecoration: 'none'
//   },
//   imgConrainer: {
//     width: "100px",
//     height: "100px"
//   },
//   img: {
//     objectFit: "cover",
//     width: "100%",
//   },
//   checkoutButton: {
//     marginTop: '10px',
//     padding: '10px',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//     width: '100%'
//   }
// };

export default ShoppingCart;
