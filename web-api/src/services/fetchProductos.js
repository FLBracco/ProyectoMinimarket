const token = localStorage.getItem("token");

export const getAll = async() => {
    const res = await fetch(`http://localhost:3000/productos`, {
        method: "GET",
        headers: {
            "content-Type": "application/json",
            "authorization": token
        },
    });
    return res.json();
};

export const getProductosById = async(id) => {
    const res = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    });
    return res.json();
};

export const createProduct = async(newProductData, token) => {
        const res = await fetch(`http://localhost:3000/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify(newProductData)
    });
    return res.json();
};