import './List.css';
import Item from './Item';

const List = (props) => {
  return (
    <div className="expenses__container">
      <h2>List of expenses</h2>
      {/* {props.onError && <p>{props.onError}</p>} */}
      {props.onError ? (
        <p>{props.onError}</p>
      ) : props.data.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <>
          <ul>
            {props.data.map((item) => (
              <Item
                category={item.category}
                price={item.price}
                date={item.date}
              />
            ))}
          </ul>
          <p className="sum">
            Sum:&nbsp;
            {props.data
              .map((price) => price.price)
              .reduce((prevVal, curVal) => {
                return +prevVal + +curVal;
              })}
            &nbsp;&#8364;
          </p>
        </>
      )}
    </div>
  );
};

export default List;
