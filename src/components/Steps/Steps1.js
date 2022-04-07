import React from "react";
import InputComponent from "../Inputs/InputComponent/InputComponent";
import { DatePicker, Space } from "antd";
import { dummy } from "../../common/utils/Dummy/DummyRegister";

export const Steps1 = (props) => {
  return (
    <>
      <InputComponent
        type="text"
        label="Nombre completo"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="name"
        value={props?.getValues("name")}
        {...props.register("name", { required: true })}
        defaultValue={props.data?.nombre}
        error={props.errors.name}
        errorMsg="Complete este campo"
      />
      {/*   <InputComponent
        type="text"
        label="Tipo de Documento"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="TpDocumentos"
        value={props?.getValues('TpDocumentos')}
        {...props.register('TpDocumentos', { required: true })}
        error={props.errors.TpDocumentos}
        errorMsg="Complete este campo"
        select
        options={dummy.TpDocumentos}
      /> */}
      <InputComponent
        type="number"
        label="Número de documento"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        value={props?.getValues("identification")}
        name="identification"
        {...props.register("identification", { required: true })}
        error={props.errors.identification}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="number"
        label="Código de Registro"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        value={props?.getValues("registrationCode")}
        name="registrationCode"
        {...props.register("registrationCode", { required: true })}
        error={props.errors.registrationCode}
        errorMsg="Complete este campo"
      />
      {/*       <InputComponent
        type="text"
        label="Identidad sexual"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="sexo"
        value={props?.getValues('sexo')}
        {...props.register('sexo', { required: true })}
        error={props.errors.sexo}
        errorMsg="Complete este campo"
        select
        options={dummy.sexo}
      /> */}
      <InputComponent
        type="email"
        label="Correo Electrónico"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        value={props?.getValues("email")}
        name="email"
        {...props.register("email", { required: true })}
        defaultValue={props.data?.email}
        error={props.errors.email}
        errorMsg="Complete este campo"
      />
      <Space direction="vertical">
        <p>Fecha de nacimiento</p>
        <input
          className="w-11/12"
          type="date"
          name="datePerson"
          error={props.errors.email}
          value={props?.getValues("email")}
          {...props.register("datePerson", { required: true })}
        />
      </Space>
      {/*  <InputComponent
        type="numeber"
        label="Edad"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        value={props?.getValues('edad')}
        name="edad"
        {...props.register('edad', { required: true })}
        error={props.errors.edad}
        errorMsg="Complete este campo"
      /> */}
      <InputComponent
        type="text"
        label="Direccción"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        value={props?.getValues("direction")}
        name="direction"
        {...props.register("direction", { required: true })}
        error={props.errors.direction}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="tel"
        label="Número de celular"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        value={props?.getValues("phone")}
        name="phone"
        {...props.register("phone", { required: true, maxLength: 10 })}
        error={props.errors.phone}
        errorMsg="Complete este campo"
        max="12"
      />
    </>
  );
};
