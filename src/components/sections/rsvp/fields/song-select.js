import React from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Select from 'react-select';
import 'styles/select.scss';

class SongSelect extends React.Component {
  constructor(props) {
    super(props);
    this.textChange = new Subject();

    this.state = {
      value: [],
      options: [],
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.textChange.pipe(
      distinctUntilChanged(),
      filter(input => !!input),
      debounceTime(250),
      switchMap((input) => {
        // Set the loading state.
        this.setState({
          ...this.state,
          loading: true,
        });

        // Query for the songs.
        return ajax({
          url: `/api/spotify/tracks?query=${encodeURIComponent(input)}`,
        }).pipe(
          map(ajaxResponse => ajaxResponse.response),
          catchError(() => []),
        );
      }),
    ).subscribe((search) => {
      // Set the internal state.
      this.setState({
        ...this.state,
        loading: false,
        options: [
          ...search,
        ],
      });
    });
  }

  onInputChange(input) {
    this.textChange.next(input);
    return input;
  }

  handleChange(selected) {
    this.props.onChange(selected);
  }

  render() {
    // manually add the label and wrapper(s) to the field.
    // @see https://github.com/mozilla-services/react-jsonschema-form/issues/951
    return (
      <div>
        <label className="control-label" htmlFor={this.props.idSchema.$id}>{this.props.schema.title}</label>
        <Select
          name={this.props.idSchema.$id}
          value={this.props.formData}
          valueKey="id"
          labelKey="name"
          onChange={this.handleChange}
          required={this.props.required}
          multi
          isLoading={this.state.loading}
          options={this.state.options}
          onInputChange={this.onInputChange}
          filterOption={option => option}
          closeOnSelect={false}
          optionRenderer={(option) => {
            let image;
            if (option.image) {
              image = (
                <img className="align-self-center mr-3 option-image" src={option.image} alt={option.album} />
              );
            }

            return (
              <div className="media">
                {image}
                <div className="media-body">
                  <strong className="mt-0">{option.name}</strong><br />
                  {option.artists.join(', ')} · {option.album}
                </div>
              </div>
            );
          }}
          valueRenderer={value => (
            <div className="media">
              <img className="align-self-center mr-1 value-image" src={value.image} alt={value.album} />
              <div className="media-body">
                {value.name}
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

SongSelect.propTypes = {
  idSchema: PropTypes.shape({
    $id: PropTypes.string.isRequired,
  }).isRequired,
  schema: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  formData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
};

SongSelect.defaultProps = {
  formData: [],
};

export default SongSelect;
