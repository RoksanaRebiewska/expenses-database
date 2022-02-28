import './Item.css';

const Item = (props) => {
  return (
    <li>
      <h3>{props.category}</h3>
      <p>{props.date}</p>
      <p>{props.price} &#8364;</p>
    </li>
  );
};

export default Item;
