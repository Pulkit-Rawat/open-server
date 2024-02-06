const stripe = require("stripe")(
  "sk_test_51OghlhSJIYgTWACwDaZcE2RIalL3hKVZZVQ7TXODOkt0CQsGC1vV2rJG7FHLuo09lkcVdBKi4edWL64cEr8etueJ000wPvKZgu"
);

module.exports.checkoutActions = {
  createPaymentSession: async (req, res) => {
    let payload = "";
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "iPhone",
              },
              unit_amount: 120000,
            },
            quantity: 2,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:3000/order-summary?payment=1`,
        cancel_url: `http://localhost:3000/products?payment=2`,
      });

      payload = {
        status: true,
        message: "session created",
        url: session.url,
      };

      res.status(200).json(payload);
    } catch (err) {
      payload = {
        status: false,
        error: "unable to create session",
      };
      res.status(200).json(payload);
      console.log(err);
    }
  },
};
