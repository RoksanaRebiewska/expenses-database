import classes from './Item.module.scss';

const Item = (props) => {
  const price = `${parseFloat(props.price).toFixed(2)}`;

  return (
    <li>
      <h3>{props.category}</h3>
      <p>{props.date}</p>
      <p>{price} &#8364;</p>
      <button onClick={props.remove}>&#10006;</button>
    </li>
  );
};

export default Item;
