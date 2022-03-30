import { useState, useEffect, useCallback } from 'react';

import Form from '../Form/Form';
import List from '../List/List';
import classes from './Data.module.css';

const Data = () => {
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDataHandler = useCallback(async function () {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_KEY}.json`);

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
  }, []);

  async function addHandler(data) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}.json`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      getDataHandler();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <section className={classes.data__container}>
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
