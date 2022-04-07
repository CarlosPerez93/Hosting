import React, { useState } from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent/InputComponent';
import { useForm } from 'react-hook-form';

export const Progress = ({ visible, setVisible }) => {
  const {
    formState: { errors },
    register
  } = useForm();

  return (
    <Modal
      title=""
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form className="progress">
        <InputComponent
          type="text"
          label="Número de vistas"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="name"
          {...register('name')}
        />
        <InputComponent
          type="text"
          label="Tiempo de Publicación"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="name"
          {...register('name')}
        />
        <InputComponent
          type="text"
          label="Vistas Restantes"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="name"
          {...register('name')}
        />
      </form>
    </Modal>
  );
};
