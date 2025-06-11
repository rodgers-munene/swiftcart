const Order = require('../models/orderModel')

const handleCallback = (req, res) => {
    let status = req.body.Body.stkCallback.ResultCode;
  console.log(status);
  //check if payment was successful or not
  if (status <= 0) {
    let message = {
      ResponseCode: status,
      ResponseDesc: "success",
    };
    //connect to the db
    //storing the payers details from the callBack
    const paidDetails = req.body.Body.stkCallback.CallbackMetadata.Item;

    const mpesaTransactions = {
      payingPhoneNumber : paidDetails[4].Value,
      transationDate:paidDetails[3].Value,
      mpesaReceiptNumber:paidDetails[1].Value,
      paidAmount:paidDetails[0].Value,
      merchantRequestID:req.body.Body.stkCallback.MerchantRequestID,
      checkoutRequestID:req.body.Body.stkCallback.CheckoutRequestID
    };
    //response to safaricom message
    res.send(message);

  } else {
    let message = {
      ResponseCode: status,
      ResponseDesc: "fail",
    };
    //response to safaricom message
    res.send(message);
  }
}

module.exports = { handleCallback }