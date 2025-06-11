const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrder = async (phone, amount) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/mpesa/stkpush`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone,
                amount
            })
        })

        const data = await res.json()
        if(!res.ok){
            console.log("Payment Failed", data.message)
            return {success: false, message: data.message || "Payment Failed"}
        }

        return {success: true, data: data}
    } catch (error) {
        console.error("Payment initiation failed", error)
        return {success: false, message: error}
    }
}