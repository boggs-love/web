import React from 'react';
import PropTypes from 'prop-types';

const ArrayField = ({
  className,
  title,
  schema,
  items,
  canAdd,
  onAddClick,
}) => {
  let itemDisplay;
  if (items) {
    itemDisplay = items.map((element) => {
      let moveDownDisplay;
      if (element.hasMoveDown) {
        moveDownDisplay = (
          <button
            onClick={element.onReorderClick(
              element.index,
              element.index + 1,
            )}
          >
            Down
          </button>
        );
      }

      let moveUpDisplay;
      if (element.hasMoveUp) {
        moveUpDisplay = (
          <button
            onClick={element.onReorderClick(
              element.index,
              element.index - 1,
            )}
          >
            Up
          </button>
        );
      }

      return (
        <div key={element.index}>
          <label>
            {schema.single} #{element.index + 1}
            <button
              className="btn  btn-link d-inline align-baseline"
              onClick={element.onDropIndexClick(element.index)}
            >
              remove
            </button>
          </label>
          <div className="row">
            <div className="col offset-1">
              {element.children}
            </div>
          </div>
          {moveDownDisplay}
          {moveUpDisplay}
        </div>
      );
    });
  }

  let addDisplay;
  if (canAdd) {
    addDisplay = (
      <button className="btn btn-link d-block p-0" onClick={onAddClick}>
        Add a {schema.single}
      </button>
    );
  }

  return (
    <div className={className}>
      <label>{title}</label>
      {itemDisplay}
      {addDisplay}
    </div>
  );
};

ArrayField.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  schema: PropTypes.shape({
    single: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    hasMoveDown: PropTypes.bool,
    hasMoveUp: PropTypes.bool,
    index: PropTypes.number,
    children: PropTypes.node,
    onReorderClick: PropTypes.func,
    onDropIndexClick: PropTypes.func,
  })),
  canAdd: PropTypes.bool,
  onAddClick: PropTypes.func.isRequired,
};

ArrayField.defaultProps = {
  className: undefined,
  title: undefined,
  items: undefined,
  canAdd: true,
};

export default ArrayField;
