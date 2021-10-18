import { useState, useEffect } from "react";
import "./App.css";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve(true);
    };

    script.onload = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const App = () => {
  const [payment, setPayment] = useState();

  const fetchUser = () => {
    fetch("https://api.klugs.in/api/OrderMgmt/website/TestOrderPlace")
      .then((val) => val.json())

      .then((d) => {
        const userInfo = d.data;
        setPayment(userInfo);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const popupPaymentGateway = async () => {
    await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    const options = {
      key: "rzp_test_ildDCu1qcUXIZt",
      amount: payment.amount,
      currency: payment.currency,
      name: "Test Payment",
      description: "Donate for cause",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      // order_id: payment.id, //from backend
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="App">
      <header>
        <h1>Razorpay Payment Integration</h1>
      </header>
      <section className="payment-Box">
        <button onClick={popupPaymentGateway}>Pay Now</button>
      </section>
    </div>
  );
};

export default App;
