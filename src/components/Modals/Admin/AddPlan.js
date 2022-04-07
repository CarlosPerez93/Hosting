import React from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Api from '../../../common/Api/Api';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';

export const AddPlan = ({ visible, setVisible }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  const mutation = useMutation(
    (dataPlan) => {
      return Api.post('/plan', dataPlan);
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
      <form className="add-plan" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          type="text"
          label="Nombre del plan"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.personPlanName}
          errorMsg="Verifique el campo"
          /*         defaultValue={} */
          {...register('personPlanName', { required: true })}
        />
        <InputComponent
          type="number"
          label="Costo"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.personPlanCost}
          errorMsg="Verifique el campo"
          {...register('personPlanCost', { required: true })}
        />
        <InputComponent
          type="number"
          label="Segunos Obligatorio de videos"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.DurationVideos}
          errorMsg="Verifique el campo"
          {...register('DurationVideos', { required: true })}
        />
        <InputComponent
          type="number"
          label="Cantiad de videos "
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.QuantityVideos}
          errorMsg="Verifique el campo"
          {...register('QuantityVideos', { required: true })}
        />
        <InputComponent
          type="number"
          label="Personas Obligatorias"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.QuentityPerson}
          errorMsg="Verifique el campo"
          {...register('QuentityPerson', { required: true })}
        />

        <InputComponent
          type="number"
          label="Número de niveles"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.QuentityPublicityDay}
          errorMsg="Verifique el campo"
          {...register('QuentityPublicityDay', { required: true })}
        />
        <InputComponent
          type="number"
          label="Ganancia nivel"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.profitLevel}
          errorMsg="Verifique el campo"
          {...register('profitLevel', { required: true })}
        />
        <input type="submit" className="submit" value="Crear" />
      </form>
    </Modal>
  );
};
