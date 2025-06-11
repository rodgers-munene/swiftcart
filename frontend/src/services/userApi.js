const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// user address
export const getUserAddress = async (id, token) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/${id}/address`, {
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

export const updateUser = async (id, token, updatableData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/profile/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatableData)
        })

        const data = await res.json()

        if(!res.ok){
            console.log("Error updating user details", data.message)
            return {success: false, message: data.message || "Failed to update user details"}
        }

        return {data: data, success: true}
    } catch (error) {
        console.error("Error updating user details", error)
        return {success: false, message: error|| "Failed to update user details"}
    }
}

// update user address

export const updateUserAddress = async (id, addressId, token, updatableData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/${id}/address/${addressId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatableData)
        })

        const data = await res.json()

        if(!res.ok){
            console.log("Error updating user details", data.message)
            return {success: false, message: data.message || "Failed to update user details"}
        }

        return {data: data, success: true}
    } catch (error) {
        console.error("Error updating user details", error)
        return {success: false, message: error|| "Failed to update user details"}
    }
}