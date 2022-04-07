import React, { useState } from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { Row, Col, Button } from 'antd';
import { useMutation, useQuery } from 'react-query';
import Api from '../../../common/Api/Api';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import { Loading } from '../../Loading/Loading';

export const EditUser = ({ visible, setVisible, user }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const mutation = useMutation(data => {
    return Api.put('/person/user/'+user?.idperson, data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {

        modalError({ message: data?.payload.message ? data?.payload.message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "Datos actualizados", reload: true });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })


  const onSubmit = (e) => {
    mutation.mutate(e)
  }

  return (
    <Modal title="" visible={visible} onCancel={() => setVisible(!visible)}>
      <form className="add-plan" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          type="email"
          label="Correo electrónico"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.email}
          errorMsg="Verifique el campo"
          defaultValue={user?.email}
          {...register('email')}
        />
        <InputComponent
          type="number"
          label="Número de teléfono"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.phone}
          errorMsg="Verifique el campo"
          defaultValue={user?.phone}
          {...register('phone')}
        />
        <InputComponent
          type="text"
          label="Dirección"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.direction}
          defaultValue={user?.direction}
          errorMsg="Verifique el campo"
          {...register('direction')}
        />
        <input type="submit" className="submit" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  );
};
