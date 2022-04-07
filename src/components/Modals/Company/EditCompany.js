import React from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import Api from '../../../common/Api/Api';
import { useMutation } from 'react-query';
import { Loading } from '../../Loading/Loading';

export const Editcompany = ({ visible, setVisible, company }) => {
  const mutation = useMutation(
    (data) => {
      return Api.put('/company/' + company?.idcompany, data);
    },
    {
      onSuccess: (data) => {
        if (data?.ok === false) {
          modalError({
            message: data?.payload.message
              ? data?.payload.message
              : 'Revisa tus datos, por favor'
          });
        } else {
          modalSucces({
            message: 'La petición se ha realizado de manera exitosa',
            reload: true
          });
        }
      },
      onError: () => {
        modalError({ message: 'Parece que tenemos problemas' });
      }
    }
  );

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm();

  const onSubmit = async (e) => {
    mutation.mutate({
      companyName: e.companyName || company?.companyName,
      companyNit: e.companyNit || company?.companyNit,
      companyAddress: e.companyAddress || company?.companyAddress
    });
  };

  return (
    <Modal title="" visible={visible} onCancel={() => setVisible(!visible)}>
      <form onSubmit={handleSubmit(onSubmit)} className="add-user">
        <InputComponent
          type="text"
          label="Nombre"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.companyName}
          errorMsg="Verifique el campo"
          defaultValue={company?.companyName}
          {...register('companyName')}
        />
        <InputComponent
          type="number"
          label="Nit"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.companyNit}
          errorMsg="Verifique el campo"
          defaultValue={company?.companyNit}
          {...register('companyNit')}
        />
        <InputComponent
          type="text"
          label="Dirección"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.companyAddress}
          errorMsg="Verifique el campo"
          defaultValue={company?.companyAddress}
          {...register('companyAddress')}
        />
        <InputComponent
          type="text"
          label="Razon Social"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          name="direction"
          {...register('direction')}
        />{' '}
        <InputComponent
          type="text"
          label="Departamento"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          name="direction"
          {...register('direction')}
        />{' '}
        <InputComponent
          type="text"
          label="Ciudad"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          name="direction"
          {...register('direction')}
        />
        <input type="submit" className="submit" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  );
};
