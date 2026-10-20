function Item({ id, name, imgUrl, price, onAdd, quantity }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={imgUrl} alt={name} loading="lazy" />
        <button onClick={() => onAdd({ id, name, imgUrl, price, quantity })} className="quick-add" aria-label={`Add ${name} to bag`}>+</button>
      </div>
      <div className="product-info">
        <h2>{name}</h2>
        <span className="product-price">R {Number(price).toFixed(2)}</span>
      </div>
    </article>
  );
}

export default Item;
