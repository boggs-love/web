import React from 'react';
import SchemaForm from 'react-jsonschema-form';
import RadioWidget from './widgets/radio';
import ArrayField from './fields/array';

const widgets = {
  RadioWidget,
};

const names = {
  firstName: {
    type: 'string',
    title: 'First Name',
  },
  lastName: {
    type: 'string',
    title: 'Last Name',
  },
};

const schema = {
  type: 'object',
  properties: {
    attending: {
      type: 'boolean',
      title: 'Coming to celebrate?',
      enumNames: [
        'Yes',
        'No',
      ],
    },
    ...names,
    email: {
      type: 'string',
      title: 'Email',
    },
    phone: {
      type: 'string',
      title: 'Phone',
    },
    guest: {
      title: 'Additional Guests',
      single: 'Guest',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...names,
        },
      },
    },
    note: {
      title: "Anything else you'd like to say?",
      type: 'string',
    },
  },
};

const uiSchema = {
  attending: {
    'ui:widget': 'radio',
  },
  email: {
    'ui:options': {
      inputType: 'email',
    },
  },
  phone: {
    'ui:options': {
      inputType: 'tel',
    },
  },
  guest: {
    'ui:options': {
      orderable: false,
    },
  },
  note: {
    'ui:widget': 'textarea',
  },
};

const Form = () => (
  <SchemaForm
    schema={schema}
    uiSchema={uiSchema}
    widgets={widgets}
    ArrayFieldTemplate={ArrayField}
  >
    <input
      type="submit"
      className="btn btn-outline-primary btn-lg btn-block"
      value="Respond"
    />
  </SchemaForm>
);

export default Form;
