import { useEffect, useState } from "react";
import Sizing from "./Sizing";
import Loader from "./Loader";

function Product(props) {
    const id = props.productID;
    const addToCart = props.addToCart;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedSize, setSelectedSize] = useState(null);

    // Retrieve product data from api (id currently not used for the mock api)
    async function getProduct(id) {
        const productURI = "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product";
        
        try {
            const response = await fetch(productURI);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const productJson = await response.json();

            setProduct(productJson);
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    // Get a new product if the product id changes
    useEffect(() => {
        getProduct(id)
    }, [id])

    function handleAddToCart() {
        if (selectedSize) {
            addToCart(product, selectedSize);
        } 
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <p>Something went wrong: {error}</p>
    }

    return (
        <div className="product-container">
            <img src={product.imageURL} alt={product.title} />

                <div className="product-header">
                    <h1 className="product-title">
                        {product.title}
                    </h1>

                    

                    <div className="product-price">
                        <hr className="product-divider"/>
                        ${product.price}
                        <hr className="product-divider"/>
                    </div>

                </div>

                <div className="product-description">
                    {product.description}
                </div>


                <div className="product-to-cart">
                    <Sizing
                        className="product-sizing"
                        selectedSize={selectedSize}
                        sizeOptions={product.sizeOptions}
                        onSizeSelect={setSelectedSize} 
                    />

                    <button className={`product-to-cart-button ${selectedSize == null ? 'error' : ''}`} onClick={() => handleAddToCart()}>
                        Add to Cart
                    </button>
                </div>
            </div>
    );
    
}

export default Product;