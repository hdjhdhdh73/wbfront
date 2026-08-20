  const handleQuantity = (cartID: number, change: number) => {
    const user_id = localStorage.getItem("userId");
    if (!user_id) {
      return
    };
    const product_cart = cart.find((item) => item.id === cartID);
    if (!product_cart) {
      return
    };
    const change_quantity = product_cart.quantity + change;
    if (change_quantity < 1) {
      return
    };
    updateCartItem(cartID, Number(user_id), change_quantity)
      .then(() => {
        setCart((listcart) =>
          listcart.map((item) =>
            item.id === cartID
              ? { ...item, quantity: change_quantity, total_price: item.product_price * change_quantity }
              : item
          )
        );
      })
      .catch((error) => {
        alert((error as Error).message);
      });
  };
