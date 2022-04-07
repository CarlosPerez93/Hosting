import React from 'react';
import { useLocalStorage } from '../../Hooks/UseLocalStorage';

const InputComponent = (props) => {
  const [storedName, setStorage] = useLocalStorage();

  const onhandleBlur = (e) => {
    if (props.setAux) {
      e.target.value === props.optionAdd
        ? props.setAux(true)
        : props.setAux(false);
    }
  };

  var Data = props.options,
    MakeItem = function (X) {
      return (
        <>
          <option value={X.name} key={X?.id}>
            {X?.name}
          </option>
          ,{props.new ? <option key={1}>Agregar una dirección</option> : null}
        </>
      );
    };

  return (
    <>
      <div
        className={
          `input-component2 ${props.className} ` +
          (props.error && ' border-red-500')
        }
      >
        <div className="w-11/12 ">
          <p
            className={`mini-texts  m-0 font-semibold  text-gray-500 ${props.labelColor} `}
          >
            {props.label}
          </p>
          {props.select ? (
            props?.setAux ? (
              <>
                <select
                  {...props}
                  name={props.name}
                  className="w-full mt-1 focus:outline-none bg-white"
                  placeholder={props.placeholder}
                  onFocus={props?.onFocus}
                  ref={props.onRef}
                  onChange={(e) => onhandleBlur(e)}
                >
                  {Data.map(MakeItem)}
                </select>
              </>
            ) : (
              <select
                {...props}
                name={props.name}
                className="w-full mt-1 focus:outline-none bg-white"
                placeholder={props.placeholder}
                onFocus={props?.onFocus}
                ref={props.onRef}
              >
                {Data.map(MakeItem)}
              </select>
            )
          ) : props.onChange ? (
            <>
              <input
                name={props.name}
                type={props.type}
                className=""
                placeholder={props.placeholder}
                value={props.value}
                onFocus={props?.onFocus}
                checked={props?.checked}
                ref={props.onRef}
                defaultValue={props?.defaultValue}
                onClick={(e) => onhandleBlur(e)}
                {...props}
              />
            </>
          ) : (
            <input
              name={props.name}
              type={props.type}
              text={props.type}
              checked={props?.checked}
              className=""
              placeholder={props.placeholder}
              defaultValue={props?.defaultValue}
              onFocus={props?.onFocus}
              ref={props.onRef}
              onClick={(e) => onhandleBlur(e)}
              {...props}
            />
          )}
        </div>
        <div className="w-1/12 pt-2">
          {props.icon !== 'none' && (
            <i className={`${props.icon} text-gray-500`}></i>
          )}
        </div>
      </div>
      {props.error && <span className="error-custom w-11/12 ">{props.errorMsg}</span>}
    </>
  );
};

export default InputComponent;
