import React, { useState } from 'react';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import InputComponent from '../../Inputs/InputComponent/InputComponent';

export const SeeMultimedia = ({ visible, setVisible }) => {
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
      <form className="multimedia">
        <InputComponent
          type="text"
          label="Videos"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          name="direction"
          {...register('direction')}
        />
      </form>
    </Modal>
  );
};
