import React from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import { Tabs } from 'antd';
import Api from '../../../common/Api/Api';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import { Loading } from '../../Loading/Loading';
const { TabPane } = Tabs;

export const Addcompany = ({ visible, setVisible }) => {
  const {
    handleSubmit,
    formState: { errors },
    register } = useForm();



  const onSubmit = async (e) => {
    console.log('add company', e);
    mutation.mutate(e)

  };


  const mutation = useMutation(
    (dataPlan) => {
      return Api.post('/person', dataPlan);
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

  return (
    <Modal title="" visible={visible} onCancel={() => setVisible(!visible)}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Enviar formulario" key="1">
          <form onSubmit={handleSubmit(onSubmit)} className="add-user">
            <InputComponent
              type="email"
              label="Correo Electronico "
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="email"
              {...register('email')}
            />
            <input type="submit" className="submit" value="Crear" />
          </form>
        </TabPane>
        <TabPane tab="Llenar formulario" key="2">
          <form onSubmit={handleSubmit(onSubmit)} className="add-user">
            <InputComponent
              type="text"
              label="Razon Social"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              name="direction"
              error={errors.companyName}
              errorMsg="Verifique el campo"
              {...register('companyName', { required: true })}
            />
            <InputComponent
              type="number"
              label="Nit"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              name="direction"
              error={errors.companyNit}
              errorMsg="Verifique el campo"
              {...register('companyNit', { required: true })}
            />

            <InputComponent
              type="text"
              label="Dirección"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              name="direction"
              error={errors.companyAddress}
              errorMsg="Verifique el campo"
              {...register('companyAddress', { required: true })}

            />

            <InputComponent
              type="text"
              label="Descripción"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              name="direction"
              error={errors.descripcion}
              errorMsg="Verifique el campo"
              {...register('descripcion', { required: true })}

            />
            <p className='text-center mb-4 text-'>Representate legal</p>
            <InputComponent
              type="text"
              label="Nombre"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              error={errors.name}
              errorMsg="Verifique el campo"
              {...register('name', { required: true })}
            />
            <InputComponent
              type="number"
              label="N° identificación "
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              error={errors.identification}
              errorMsg="Verifique el campo"
              {...register('identification', { required: true })}
            />
            <InputComponent
              type="email"
              label="Correo electronico"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              error={errors.email}
              errorMsg="Verifique el campo"
              {...register('email', { required: true })}
            />
            <InputComponent
              type="number"
              label="Contacto"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              error={errors.phone}
              errorMsg="Verifique el campo"
              {...register('phone', { required: true })}
            />
            <input type="submit" className="submit" value="Crear" />
          </form>
        </TabPane>
      </Tabs>
      <Loading visible={mutation.isLoading} />
    </Modal>
  );
};
