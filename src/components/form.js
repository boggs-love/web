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

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      formData: undefined,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      formData: event.formData
    });
  }

  onSubmit(event) {
    this.setState({
      ...this.state,
      disabled: true,
    });
  }

  render() {
    return (
      <SchemaForm
        schema={schema}
        uiSchema={{
          ...uiSchema,
          'ui:disabled': this.state.disabled,
        }}
        widgets={widgets}
        ArrayFieldTemplate={ArrayField}
        formData={this.state.formData}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        disabled={this.state.disabled}
      >
        <input
          type="submit"
          className="btn btn-outline-primary btn-lg btn-block"
          value="Respond"
          disabled={this.state.disabled}
        />
      </SchemaForm>
    );
  }
}

export default Form;
