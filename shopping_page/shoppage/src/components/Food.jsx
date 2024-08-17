import React, { Component } from 'react';
import axios from 'axios';
import '../css/category_page.css';
import ShoppingCart from './ShoppingCart';
import Footer from './Footer';

class Food extends Component {
  state = {

    foodProducts: [],
    favoriteProducts: {},

    selectedFormats: {},
    selectedFhids: {},
    selectedFormats2: {},
    selectedFhids2: {},
    quantities: {},

    memberId: 2,
    cartItems: [],


    tags: [],

    brandFilterItems: [],

    filterItems: {
      // dog: false,
    }
  }

  componentDidMount = async() => {
    // 載入商品區
    await this.loadFoodProducts();
    await this.loadFilterItems();

    // 載入filter區
  }

  loadFoodProducts = async () => {
    var result = await axios.get('http://localhost:8000/shop/products');
    var newState = { ...this.state };
    var pData = result.data.products.map((product, index) => {
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
        }
      )
    });
    newState.foodProducts = pData;
    this.setState(newState);
  }

  loadFilterItems = async () => {
    var result = await axios.get('http://localhost:8000/shop/products');
    var newState = { ...this.state };

    var filterBrandData = result.data.brands.map((brandItem) => {
      return (
        {
          'brandName': brandItem.brand,
          'brandId': brandItem.bhId
        }
      )
    })
    
    var filterItemsBrandData = result.data.brands.reduce((acc, brandItem) => {
      acc[brandItem.brand] = false;
      return acc;
    }, {});

    console.log(filterItemsBrandData);
    
    console.log(filterBrandData);
    newState.filterItems = filterItemsBrandData;
    newState.brandFilterItems = filterBrandData;
    this.setState(newState);

    


    // var filterData = result.data.tags.map((Item, index) => {
    //   return (
    //     {
    //       tag,
    //     }
    //   )
    // });
    // newState.foodProducts = pData;
    // this.setState(newState);
  }

  handleFilterChange = (filterName) => {
    // console.log(filterName);
    
    
    this.setState(prevState => ({
      filterItems: {
        ...prevState.filterItems,
        [filterName]: !prevState.filterItems[filterName]
      }
      
    }));
    console.log(this.state.filterItems);
  };

  filterProducts = () => {
    return this.state.foodProducts.filter(product => {
      if (this.state.filterItems.dog) {
        return product.productName.includes('狗') || product.productName.includes('犬');
      }
      return true; // 如果沒有選中任何過濾器，返回所有產品
    });
  };

  // 收藏按鈕
  handleFavoriteClick = (shid) => {
    this.setState(prevState => ({
      favoriteProducts: {
        ...prevState.favoriteProducts,
        [shid]: !prevState.favoriteProducts[shid]
      }
    }));
  }

  // 熱銷商品 - 規格按鈕
  handleFormatClick = (shid, index) => {
    this.setState(prevState => ({
      selectedFormats: {
        ...prevState.selectedFormats,
        [shid]: index
      },
      selectedFhids: {
        ...prevState.selectedFhids,
        [shid]: this.state.foodProducts.find(p => p.shid === shid)?.productIds[index] || [0]
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

  // 加入購物車
  addToCart = async (shid, source) => {
    console.log(shid);
    let product;
    if (source === 'bestSell') {
      product = this.state.foodProducts.find(p => p.shid === shid);
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

  // 載入購物車資料
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
    const filteredProducts = this.filterProducts();
    return (
      <>
        <ShoppingCart
          items={this.state.cartItems}
          updateQuantity={this.updateItemQuantity}
          loadCartItems={this.loadCartItems}
          deleteItem={this.deleteCartItem}
        />
        <div className="contentBlock">
          {/* <!-- 篩選區 --> */}
          <div className="filterBlock">
            <div className="searchBlock">
              <input className="searchBar" type="text" placeholder="輸入您想搜尋的商品" />
              <button className="searchBtn"><i className="fa fa-search"></i></button>
            </div>
            <div className="filter">
              <p className="filterTitle">價格搜尋</p>
              <div className="priceFilter">
                <span>$0</span> － <span>$5000</span>
              </div>
              <input type="range" className="" min="0" max="5000" step="100"
                aria-valuetext="2400 - 2600" aria-label="最低價" value="5000" />
              <p className="filterTitle">篩選條件</p>
              <ul>
                {this.state.brandFilterItems.map((brandItem, index) => {
                  return (
                    <li className='tagItem' key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={this.state.filterItems[brandItem.brandName]}
                          onChange={() => this.handleFilterChange(brandItem.brandName)}
                        />
                        <span>{brandItem.brandName}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          {/* <!-- 商品區 --> */}
          {/* <div className="pBlock"> */}
          <div className="pBlock bestsellerProduct" >
            {this.state.foodProducts.map(product => {
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
          {/* </div> */}
        </div>
        <Footer />
      </>
    );
  }
}

export default Food;