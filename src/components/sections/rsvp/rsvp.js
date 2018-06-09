import React from 'react';
import PropTypes from 'prop-types';
import Section from 'app/components/sections/section';
import events from 'app/utils/events';
import Form from './form';

const RSVP = ({ type, accepted, declined }) => {
  const event = events.find(e => e.type === type);

  return (
    <Section title={event.title ? `${event.title} RSVP` : 'RSVP'}>
      <Form event={event} type={type} accepted={accepted} declined={declined} />
    </Section>
  );
};

RSVP.propTypes = {
  ...Form.propTypes,
  type: PropTypes.string.isRequired,
};

RSVP.defaultProps = {
  title: undefined,
};

export const query = graphql`
fragment RSVPMarkdown on File {
  data: childMarkdownRemark {
    meta: frontmatter {
      title
    }
    html
  }
}
`;

export default RSVP;
