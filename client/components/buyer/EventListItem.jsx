import React from 'react';
import { connect } from 'react-redux';

const EventListItem = ({ event }) => (
  <div>
    <p> Query: { event.query } </p>
    <p> Date: { event.date } </p>
    <p> City: { event.city } </p>
  </div>
);

export default EventListItem;
