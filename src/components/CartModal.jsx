import { useEffect, useState } from "react";

function CartModal(props) {
    const cart = props.cart;
    const updateAmount = props.updateAmount;

    // Keep track of the product amounts in the cart input boxes
    const [localAmounts, setLocalAmounts] = useState(
        cart.map((product) => product.amount)
    );


    // If the cart changes, update the local product amounts to reflect this
    useEffect(() => {
        setLocalAmounts(cart.map((product) => product.amount));
    }, [cart]);


    // Commit the product amounts from the cart input boxes into the stored cart
    const commitAmountChange = (index) => {
        const amount = parseInt(localAmounts[index], 10);

        if (!isNaN(amount) && amount >= 0) {
            if (amount == 0) {
                updateAmount(index, amount);
                cart.splice(index, 1);
            } else {
                updateAmount(index, amount);
            }
            
        } else {
            const updatedAmounts = cart.map((product) => product.amount);
            setLocalAmounts(updatedAmounts);
        }
    };

    // Update local product amounts if the input boxes change
    const handleInputChange = (index, value) => {
        const updatedAmounts = [...localAmounts];
        updatedAmounts[index] = value;
        setLocalAmounts(updatedAmounts);
    };

    // Commit local product amounts when enter is pressed while an input box is focused
    const handleKeyDown = (e, index) => {
        if (e.key == "Enter") {
            commitAmountChange(index);
        }
    };

    return(
        <div className="cart-modal">
            <ul className="cart-modal-product-list">
                {cart.map((product, index) => (
                    <li className="cart-modal-item" key={index}>
                            <img className="cart-modal-img" src={product.imageURL}/>
                            <div className="modal-item-details">
                                <h3 className="modal-item-title">{product.title}</h3>
                                <input 
                                    className="modal-item-amount"
                                    type="number"
                                    value={localAmounts[index]}
                                    min={0}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onBlur={() => commitAmountChange(index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                                
                                <span className="modal-item-price">${product.price} ea</span>
                                <p>Size: {product.sizeOptions}</p>
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CartModal;