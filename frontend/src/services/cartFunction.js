const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCart = async ( id, token) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/${id}/cart`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data[0];
    } catch (error) {
        console.log("Error getting cart Products", error);
        return [];
    }
}

export const postCart = async (id, token, product_id, quantity) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/${id}/cart`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id, quantity })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Server returned error:", data); 
      return { success: false, message: data.message || "Error adding product to cart" };
    }

    return { data, success: true, message: "Product added to cart successfully" };

  } catch (error) {
    console.error("Network error:", error); 
    return { success: false, message: error.message || "Error adding product to cart" };
  }
};

export const updateCart = async (id, token, product_id, quantity) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/${id}/cart/${product_id}`, 
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity
        })
      }
    )

    const data = await res.json()

    if(!res.ok){
      console.log("Error updating the cart function", data);
      return {success: false, message: data.message || "Failed to update cart" }
    }

    return {data, success: true, message: "Update cart successful"}
  } catch (error) {
    console.log("Failed to update cart", error)
    return { success: false, message: error || "Error updating cart"}
  }
}

// delete in cart
export const deleteInCart = async (id, token, product_id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/${id}/cart/${product_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    const data = await res.json();

    if(!res.ok){
      console.log("Error deleting product from cart", data)
      return {success: false, message: data.message || "Failed to delete product in cart!!"}
    }

    return {data, success: true, message: "Successfully deleted product form cart"}

  } catch (error) {
    console.error("Failed to delete cart", error);
    return { success: false, message: error || "Error updating cart"};
  }
}
