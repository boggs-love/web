import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import SchemaForm from 'react-jsonschema-form';
import RadioWidget from './widgets/radio';
import ArrayField from './fields/array';
/* global fetch */

const widgets = {
  RadioWidget,
};

const names = {
  firstName: {
    type: 'string',
    title: 'First Name',
    maxLength: 255,
  },
  lastName: {
    type: 'string',
    title: 'Last Name',
    maxLength: 255,
  },
};

const schema = {
  type: 'object',
  required: [
    'attending',
    'firstName',
    'lastName',
    'email',
    'phone',
  ],
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
      format: 'email',
      maxLength: 255,
    },
    phone: {
      type: 'string',
      title: 'Phone',
      minLength: 10,
      maxLength: 20,
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
      status: 'ready',
      formData: undefined,
      error: undefined,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onError = this.onError.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      error: undefined,
      status: this.state.status === 'has-errors' ? 'validating' : this.state.status,
      formData: event.formData,
    });
  }

  onError() {
    this.setState({
      ...this.state,
      status: 'has-errors',
      liveValidate: true,
    });
  }

  onSubmit(event) {
    this.setState({
      ...this.state,
      status: 'sending',
      error: undefined,
    });

    // Submit the RSVP
    fetch('/api/rsvp', {
      method: 'POST',
      body: JSON.stringify(event.formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = await response.json();
        throw error;
      }

      this.setState({
        ...this.state,
        status: 'done',
      });

      return response;
    }).catch((error) => {
      this.setState({
        ...this.state,
        status: 'error',
        error,
      });
    });
  }

  onDismiss() {
    this.setState({
      ...this.state,
      formData: undefined,
      status: 'ready',
    });
  }

  render() {
    if (this.state.status === 'done') {
      const { data } = this.state.formData.attending ? this.props.accepted : this.props.declined;

      return (
        <Alert color={this.state.formData.attending ? 'success' : 'info'} toggle={this.onDismiss}>
          <h5 className="alert-heading">{data.meta.title}</h5>
          <div dangerouslySetInnerHTML={{ __html: data.html }} />
        </Alert>
      );
    }

    let error;
    let submitClassName = [
      'btn',
      'btn-block',
      'btn-lg',
    ];

    if (this.state.error || this.state.status === 'has-errors') {
      submitClassName = [
        ...submitClassName,
        'btn-outline-danger',
      ];
    } else {
      submitClassName = [
        ...submitClassName,
        'btn-outline-primary',
      ];
    }

    if (this.state.error && this.state.error.response && this.state.error.response.message) {
      error = (
        <Alert color="danger">
          {this.state.error.response.message}
        </Alert>
      );
    }

    const disabled = this.state.status === 'sending';
    const liveValidate = ['has-errors', 'validating'].includes(this.state.status);

    return (
      <div>
        {error}
        <SchemaForm
          schema={schema}
          className={liveValidate ? 'was-validated' : undefined}
          uiSchema={{
            ...uiSchema,
            'ui:disabled': this.state.disabled,
          }}
          widgets={widgets}
          ArrayFieldTemplate={ArrayField}
          formData={this.state.formData}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onError={this.onError}
          disabled={disabled}
          liveValidate={liveValidate}
          showErrorList={false}
          // A bug in Firefox/Bootstrap shows all the form fields as required on page load.
          noHtml5Validate
        >
          <input
            type="submit"
            className={submitClassName.join(' ')}
            value="Respond"
            disabled={disabled}
          />
        </SchemaForm>
      </div>
    );
  }
}

const contentShape = {
  data: PropTypes.shape({
    meta: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
};

Form.propTypes = {
  accepted: PropTypes.shape(contentShape).isRequired,
  declined: PropTypes.shape(contentShape).isRequired,
};

export default Form;
