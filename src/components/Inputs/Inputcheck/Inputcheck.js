import React from 'react';

export const Inputcheck = (props) => {
  return (
      <div className="input-component">
        <p>{props?.label}</p>
        <input name={props.name} type="checkbox" ref={props.onRef} {...props} />
      </div>
  );
};
