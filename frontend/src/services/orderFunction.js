const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getOrders = async (id, token) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/${id}/orders`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()

        if(!res.ok){
            console.log("Error getting orders", data.message)
            return {success: false, message: data.message || "Failed to fetch your orders"}
        }

        return {data, success: true}
    } catch (error) {
        console.error("Failed to fetch your orders! Try again...", error)
        return {data: [], success: false, message: error || "Failed to fetch orders!!"}
    }
}


export const postOrder = async (id, token, paymentMethod) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/${id}/orders`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentMethod })
        })

        const data = await res.json()

        if(!res.ok){
            console.log("Error getting orders", data.message)
            return {success: false, message: data.message || "Failed to fetch your orders"}
        }

        return {data, success: true}
    } catch (error) {
        console.error("Failed to fetch your orders! Try again...", error)
        return {success: false, message: error || "Failed to fetch orders!!"}
    }
}