import React, { useState } from "react";
import InputComponent from "../Inputs/InputComponent/InputComponent";
import { dummy } from "../../common/utils/Dummy/DummyRegister";
import { Select } from 'antd';

const { Option } = Select;
export const Steps2 = (props) => {
  const [aux, setAux] = useState(false);
  const [aux2, setAux2] = useState(false);

  console.log("rrrdaaaaa", props.states);
  const ArrayStates = props.states;

  return (
    <>
      <div className="input-component w-11/12">
        <p>Nacionalidad</p>
        <select
          name="nationality"
          value={props?.getValues("nationality")}
          {...props.register("nationality", { required: true })}
          onChange={props.onchange}
        >
          {props.countries.map((i) => (
            <option value={i.name}>{i.name}</option>
          ))}
        </select>
      </div>

      <div className="input-component w-11/12">
        <p>Departamento</p>
        <Select
         className="w-full my-2 rounded-md border-none"
         placeholder="Seleccionar "
          name="state"
          value={props?.getValues("state")}
          {...props.register("state", { required: true })}
          onChange={props.onchange2}
        >
          {
            props?.states?.map((i) => {
              return (
                <Option key={i.id} value={i.name}>
                  {i.name}
                </Option>
              );
            })}
        </Select>
      </div>  

      <InputComponent
        type="text"
        label="Ciudad"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="municipaly"
        value={props?.getValues("municipaly")}
        {...props.register("municipaly", { required: true })}
        error={props.errors.municipaly}
        errorMsg="Complete este campo"
        select
        options={props.city}
        boris={true}
      />
      <InputComponent
        type="text"
        label="Grado de escolaridad"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="scholarship"
        value={props?.getValues("scholarship")}
        {...props.register("scholarship", { required: true })}
        error={props.errors.scholarship}
        errorMsg="Complete este campo"
        select
        options={dummy.escolaridad}
      />
      <InputComponent
        type="text"
        label="Profesión"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        aux={aux}
        setAux={setAux}
        optionAdd="Otro"
        value={props?.getValues("profession")}
        name="profession"
        {...props.register("profession", { required: true })}
        error={props.errors.profession}
        errorMsg="Complete este campo"
        select
        options={dummy.profesion}
        /*         extendState={props.setProfession}
         */
      />
      {aux == true && (
        <InputComponent
          type="text"
          label="Nueva Profesión"
          placeholder="¿Cual es  su profesión?"
          icon="fa fa-user-o"
          className="mb-10"
          name="newProfesion"
          value={props?.getValues("newProfesion")}
          {...props.register("newProfesion", { required: true })}
          error={props.errors.newProfesion}
          errorMsg="Complete este campo"
        />
      )}

      <InputComponent
        type="text"
        label="Estado Civil"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="civilStatus"
        value={props?.getValues("civilStatus")}
        {...props.register("civilStatus", { required: true })}
        error={props.errors.civilStatus}
        errorMsg="Complete este campo"
        select
        options={dummy.estadocivil}
      />
      <InputComponent
        type="text"
        label="Religión"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="religion"
        aux={aux2}
        setAux={setAux2}
        optionAdd="Otro"
        errorMsg="Complete este campo"
        select
        options={dummy.religon}
      />
      {aux2 == true && (
        <InputComponent
          type="text"
          label="Nueva Religión"
          placeholder="¿Que Religión?"
          icon="fa fa-user-o"
          className="mb-10"
          name="newReligion"
          value={props?.getValues("newReligion")}
          {...props.register("newReligion", { required: true })}
        />
      )}
      <InputComponent
        type="text"
        label="Tendencia Política"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="politicalTrend"
        value={props?.getValues("politicalTrend")}
        {...props.register("politicalTrend", { required: true })}
        error={props.errors.politicalTrend}
        errorMsg="Complete este campo"
        select
        options={dummy.tendenciapolitica}
      />
    </>
  );
};
