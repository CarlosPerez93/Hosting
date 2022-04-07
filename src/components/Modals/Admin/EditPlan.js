import React from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import  Api  from '../../../common/Api/Api';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import { useMutation } from 'react-query';
import { Loading } from '../../Loading/Loading';

export const EditPlan = ({ visible, setVisible, data }) => {
  const mutation = useMutation(
    (dataPlan) => {
      console.log(data);
      console.log(dataPlan);
      return Api.put('/plan/' + data?.idpersonPlan, dataPlan);
    },
    {
      onSuccess: (dataPlan) => {
        if (dataPlan?.ok === false) {
          modalError({
            message: dataPlan?.payload.message
              ? dataPlan?.payload.message
              : 'Revisa tus datos, por favor'
          });
        } else {
          modalSucces({ message: 'Datos actualizados', reload: true });
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
    console.log('yiusu nnnnnn');
    mutation.mutate({
      personPlanName: e.personPlanName || data?.personPlanName,
      personPlanCost: e.personPlanCost || data?.personPlanCost,
      personPlanDetailLevel:
        e.personPlanDetailLevel || data?.personPlanDetailLevel,
      QuentityPerson: e.QuentityPerson || data?.QuentityPerson,
      QuentityPublicityDay:
        e.QuentityPublicityDay || data?.QuentityPublicityDay,
      profitLevel: e.profitLevel || data?.profitLevel,
      DurationVideos:e.DurationVideos || data?.DurationVideos,
      QuantityVideos:e.QuantityVideos || data?.QuantityVideos,
    });
  };
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
          defaultValue={data?.personPlanName}
          {...register('personPlanName')}
        />
        <InputComponent
          type="number"
          label="Costo"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.personPlanCost}
          errorMsg="Verifique el campo"
          defaultValue={data?.personPlanCost}
          {...register('personPlanCost')}
        />
            <InputComponent
          type="number"
          label="Segunos Obligatorio de videos"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.DurationVideos}
          errorMsg="Verifique el campo"
          defaultValue={data?.DurationVideos}
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
          defaultValue={data?.QuantityVideos}
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
          defaultValue={data?.QuentityPerson}
          {...register('QuentityPerson')}
        />

        <InputComponent
          type="number"
          label="Número de niveles"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.QuentityPublicityDay}
          errorMsg="Verifique el campo"
          defaultValue={data?.QuentityPublicityDay}
          {...register('QuentityPublicityDay')}
        />
        <InputComponent
          type="number"
          label="Ganancia nivel"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.profitLevel}
          errorMsg="Verifique el campo"
          defaultValue={data?.profitLevel}
          {...register('profitLevel')}
        />
        <input type="submit" className="submit" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  );
};
