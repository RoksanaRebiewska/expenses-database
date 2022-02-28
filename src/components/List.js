import { useState } from 'react';

import './List.css';
import Item from './Item';
import FilterForm from './FilterForm';

const List = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const selectedCategoryHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

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
        <ul>{finalData}</ul>
        <p className="sum">
          Sum:&nbsp;
          {filteredData
            .map((price) => price.price)
            .reduce((prevVal, curVal) => {
              return +prevVal + +curVal;
            })}
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
