const handleCheckout = () => {
    const order = {
      user: user, // Numele utilizatorului
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      })),
      totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      shippingAddress: 'Adresa utilizatorului aici', // Adresa de livrare
      paymentMethod: 'Card', // Exemplu de metodă de plată
      orderDate: new Date(),
    };
  
    console.log('Comandă finalizată:', order);
  
    // Aici ai putea trimite obiectul `order` către un server sau o bază de date
  };
  