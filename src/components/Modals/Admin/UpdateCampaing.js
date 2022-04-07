import React, { useState } from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Api from '../../../common/Api/Api';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import { Loading } from '../../Loading/Loading';

export const UpdateCampaing = ({ visible, setVisible, campaign }) => {
  const mutation = useMutation(
    (data) => {
      console.log('xsxass' + data);
      return Api.put('/campaign/' + campaign?.idpublicityCampaign, data);
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
      campaign: {
        publicityCampaignName:
          e.publicityCampaignName || campaign?.publicityCampaignName,
        publicityCampaignDescription:
          e.publicityCampaignDescription ||
          campaign?.publicityCampaignDescription
      }
    });
  };

  return (
    <Modal
      title="Editar datos de campaña"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="add-campaing">
        <div className="request-local_grid">
          <InputComponent
            type="text"
            label="Nombre de la campaña"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            defaultValue={campaign?.publicityCampaignName}
            error={errors.publicityCampaignName}
            errorMsg="Verifique el campo"
            {...register('publicityCampaignName')}
          />
          <InputComponent
            type="text"
            label="Descripción"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            defaultValue={campaign?.publicityCampaignDescription}
            error={errors.publicityCampaignDescription}
            errorMsg="Verifique el campo"
            {...register('publicityCampaignDescription')}
          />
        </div>
        <input type="submit" className="submit" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  );
};
