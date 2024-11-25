import { useEffect, useState } from "react";
import CartModal from "./CartModal";

function Header(props) {
    const cart = props.cart;
    const cartCount = props.cartCount;

    const [cartOpen, setCartOpen] = useState(false);

    // If we update the cart and the cart length becomes 0 we should close the cart modal if open
    useEffect(() => {
        if (cart.length == 0 && cartOpen) [
            setCartOpen(false)
        ]
    }, [cart, cartOpen, setCartOpen]);

    function updateAmount(index, newAmount) {
        props.updateAmount(index, newAmount);
    }

    return (
        <header id="page-header">
            <div className={`cart ${cartOpen ? 'open' : ''}`}>
                <p className="cart-label" onClick={() => {if (cartCount != 0) setCartOpen(!cartOpen)}}> My Cart ({cartCount})</p>
                {   cartOpen && 
                    cartCount != 0 && 
                    <CartModal 
                        cart={cart}
                        onClose={() => setCartOpen(false)} 
                        updateAmount={updateAmount} 
                    />
                }
            </div>
        </header>
    );
}

export default Header;