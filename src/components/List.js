import { useState } from 'react';

import './List.css';
import Item from './Item';
import FilterForm from './FilterForm';

const List = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const selectedCategoryHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  async function removeHandler(id) {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation) {
      await fetch(
        `https://database-1-b4a45-default-rtdb.firebaseio.com/expenses/${id}.json`,
        { method: 'DELETE' }
      );
      props.onRemove();
    } else {
      return;
    }
  }

  const filteredData =
    selectedCategory === 'All'
      ? props.data
      : props.data.filter((item) => item.category === selectedCategory);

  const finalData = filteredData.map((item) => (
    <Item
      category={item.category}
      price={item.price}
      date={item.date}
      key={item.id}
      remove={() => removeHandler(item.id)}
    />
  ));

  let content = <p>No expenses yet</p>;

  if (props.onError) {
    content = <p>{props.onError}</p>;
  }

  if (props.onLoading) {
    content = <p>Loading...</p>;
  }

  if (!props.onError && !props.onLoading && props.data.length > 0) {
    content = (
      <>
        <FilterForm
          onSelectedFilter={selectedCategory}
          onChangingFilter={selectedCategoryHandler}
        />
        <ul>{filteredData.length > 0 ? finalData : <p>No expenses yet</p>}</ul>
        <p className="sum">
          Sum:&nbsp;
          {filteredData.length > 1
            ? filteredData
                .map((price) => price.price)
                .reduce((prevVal, curVal) => {
                  return +prevVal + +curVal;
                })
                .toFixed(2)
            : filteredData.length === 1
            ? filteredData[0].price
            : '0'}
          &nbsp;&#8364;
        </p>
      </>
    );
  }

  return (
    <div className="expenses__container">
      <h2>List of expenses</h2>
      {content}
    </div>
  );
};

export default List;
