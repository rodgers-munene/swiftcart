const { initiateSTKPush } = require("../mpesa/stkPush");

const paymentMethod = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await initiateSTKPush(phone, amount);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ message: "Error initiating STK push" });
  }
};

module.exports = { paymentMethod };
