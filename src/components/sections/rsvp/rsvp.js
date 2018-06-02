import React from 'react';
import PropTypes from 'prop-types';
import Section from 'app/components/sections/section';
import Form from './form';

const RSVP = ({ event, accepted, declined }) => (
  <Section title={event ? `${event} RSVP` : 'RSVP'}>
    <Form event={event} accepted={accepted} declined={declined} />
  </Section>
);

RSVP.propTypes = {
  ...Form.propTypes,
  title: PropTypes.string,
};

RSVP.defaultProps = {
  title: undefined,
};

export default RSVP;
