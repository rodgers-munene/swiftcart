// user address
export const getUserAddress = async (id, token) => {
    try {
        const res = await fetch(`http://localhost:5001/api/users/${id}/address`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const data = await res.json();

        if(!res.ok){
            console.log("Error fetching address", data.message)
            return {success: false, message: data.message || "Error fetching user address"}
        }

        return {success: true, data}
    } catch (error) {
        console.error("Error fetching user address", error)
        return {success: false, message: error || "Error fetching user address"}
    }
} 