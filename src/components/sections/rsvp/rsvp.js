import React from 'react';
import Section from 'app/components/sections/section';
import Form from './form';

const RSVP = ({ accepted, declined }) => (
  <Section title="RSVP">
    <Form accepted={accepted} declined={declined} />
  </Section>
);

RSVP.propTypes = Form.propTypes;

export default RSVP;
