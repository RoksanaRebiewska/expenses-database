import { useState, useRef } from 'react';

import './Form.css';

const Form = (props) => {
  const [priceEmptyError, setPriceEmptyError] = useState(false);
  const [dateEmptyError, setDateEmptyError] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  const categoryRef = useRef('');
  const priceRef = useRef('');
  const dateRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();

    setSubmittingForm(true);

    if (
      (dateRef.current.value === '' && priceRef.current.value === '0') ||
      priceRef.current.value === ''
    ) {
      setPriceEmptyError(true);
      setDateEmptyError(true);
      return;
    }

    if (priceRef.current.value === '0' || priceRef.current.value === '') {
      setPriceEmptyError(true);
      return;
    }

    if (dateRef.current.value === '') {
      setDateEmptyError(true);
      return;
    }

    const data = {
      category: categoryRef.current.value,
      price: priceRef.current.value,
      date: dateRef.current.value,
    };

    setSubmittingForm(false);

    props.onAdd(data);

    priceRef.current.value = '';
    dateRef.current.value = '';
  };

  const onPriceChangeHandler = () => {
    setPriceEmptyError(false);
  };

  const onDateChangeHandler = () => {
    setDateEmptyError(false);
  };

  return (
    <div className="add-expense__container">
      <h2>Add your expense</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="category">Category</label>
        <select name="category" ref={categoryRef}>
          <option value="Food">Food</option>
          <option value="Home">Home</option>
          <option value="Others">Others</option>
        </select>
        <label htmlFor="price">Price (in &#8364;)</label>
        <input
          type="number"
          ref={priceRef}
          min="0"
          onChange={onPriceChangeHandler}
        />
        {submittingForm && priceEmptyError ? (
          <p className="error-text">Please set price</p>
        ) : null}
        <label htmlFor="date">Date</label>
        <input
          type="date"
          ref={dateRef}
          min="2021-01-01"
          max="2022-12-31"
          onChange={onDateChangeHandler}
        />
        {submittingForm && dateEmptyError ? (
          <p className="error-text">Please set date</p>
        ) : null}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;
