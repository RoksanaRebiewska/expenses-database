import classes from './Item.module.css';

const Item = ({ category, date, price, remove }) => {
  const formatedPrice = `${parseFloat(price).toFixed(2)}`;

  return (
    <li>
      <h3>{category}</h3>
      <p>{date}</p>
      <p>{formatedPrice} &#8364;</p>
      <button onClick={remove}>&#10006;</button>
    </li>
  );
};

export default Item;
