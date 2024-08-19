import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能夠顯示降級後的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同樣可以將錯誤日誌上報給服務器
    console.log('錯誤:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定義降級後的 UI 並渲染
      return <h1>很抱歉，這裡出現了問題。</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;