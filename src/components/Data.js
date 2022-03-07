import { useState, useEffect, useCallback } from 'react';

import Form from './Form';
import List from './List';
import './Data.css';

const Data = () => {
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDataHandler = useCallback(async function () {
    try {
      setLoading(true);
      const response = await fetch(
        'https://database-1-b4a45-default-rtdb.firebaseio.com/expenses.json'
      );

      const data = await response.json();
      const expenses = [];
      for (const key in data) {
        expenses.push({
          category: data[key].category,
          price: data[key].price,
          date: data[key].date,
          id: key,
        });
      }
      setItemsData(expenses);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getDataHandler();
  }, [getDataHandler]);

  async function addHandler(data) {
    try {
      const response = await fetch(
        'https://database-1-b4a45-default-rtdb.firebaseio.com/expenses.json',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      await response.json();
      getDataHandler();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <section className="data__container">
        <Form onAdd={addHandler} />
        <List
          data={itemsData}
          onError={error}
          onLoading={loading}
          onRemove={getDataHandler}
        />
      </section>
    </>
  );
};

export default Data;
