const axios = require('axios')
const { getAccessToken } = require('./accessToken')

const initiateSTKPush = async (phone, amount) => {
    const accessToken = await getAccessToken()
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(
        process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
    ).toString('base64')

    return axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',{
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: 'Order123',
        TransactionDesc: 'Order Payment'
    },{
        headers: {
            Authorization:  `Bearer ${accessToken}`
        }
    }
)
}

module.exports = { initiateSTKPush }