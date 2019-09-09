import React, { useEffect, useContext } from 'react';
import Context from '../contextStore/Context';
import axios from 'axios';

const EventsList = () => {
  const { state, dispatch } = useContext(Context);

  const getEvents = async () => {
    try {
      const res = await axios.get(
        'https://us-central1-techspardha-87928.cloudfunctions.net/api/events/categories'
      );
      dispatch({
        type: 'GET_EVENTCATEGORIES',
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'Error Occured: Try refreshing' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const categories = state.eventCategories ? (
    state.eventCategories.map((category, index) => (
      <div key={index}>{category}</div>
    ))
  ) : (
    <h1>Loading</h1>
  );

  return (
    <>
      <div className='yo horizontal-scroll-wrapper squares'>{categories}</div>
    </>
  );
};

export default EventsList;