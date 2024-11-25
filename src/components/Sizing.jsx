function Sizing(props) {
    const selectedSize = props.selectedSize
    const sizeOptions = props.sizeOptions;
    const onSizeSelect = props.onSizeSelect;

    function handleSizeSelect(size) {
        onSizeSelect(size);
    }

    return (
        <div className="product-sizing">
            <h3 className="sizing-title">
                Size <div id="sizing-carat">*</div> 
                <div id="sizing-selection">
                    {selectedSize ? selectedSize.label : 'Select Size'}
                </div>
            </h3>

            <div className="sizing-options">
                {sizeOptions.map((size) => (
                    <button 
                        className={`size-option ${selectedSize?.id === size.id ? 'selected' : ''}`} 
                        key={size.id}
                        onClick={() => handleSizeSelect(size)}
                    >
                        {size.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Sizing;