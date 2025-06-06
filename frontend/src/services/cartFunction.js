
export const getCart = async ( id, token) => {
    try {
        const res = await fetch(`http://localhost:5001/api/user/${id}/cart`, {
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
    const res = await fetch(`http://localhost:5001/api/user/${id}/cart`, {
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

    return { success: true, message: "Product added to cart successfully" };

  } catch (error) {
    console.error("Network error:", error); 
    return { success: false, message: error.message || "Error adding product to cart" };
  }
};
