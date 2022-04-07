import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { useMutation, useQuery } from 'react-query';
import Api from '../../../common/Api/Api';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import { UploadFirebase } from '../../firebase/PromiseUpload';
import { Loading } from '../../Loading/Loading';
import { chosenVideo } from '../../../common/utils/GetDuration';
import { RiDeleteBin6Line } from 'react-icons/ri';
import throat from 'throat'

export const AddCampaing = ({ visible, setVisible }) => {
  const [loading, setloading] = useState(false)
  const [duration, setDuration] = useState(null)
  const [video, setVideo] = useState([]);
  const [planSelected, setplanSelected] = useState(null)
  const [file, setFile] = useState(null)

  const mutation = useMutation(data => {
    return Api.post('/campaign', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {

        modalError({ message: data?.payload.message ? data?.payload.message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "La petición se ha realizado de manera exitosa", reload: true });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })

  const { data: planCampaing } = useQuery('planCampaing', () =>
    Api.get('/plan', { page: 1, number: 10 })
  );
  const { data: dataCompany } = useQuery('dataCompany', () =>
    Api.get('/company?page=1')
  );

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm();


  const onSubmit = async (e) => {
    var items = [];
    setloading(true)
    const result = await Promise.all(video.map(
      throat(1, async (i) => {
        await UploadFirebase({ value: i }).then(async (res) => {
          items = [...items, {
            multimediaName: i.name,
            multimediaUrl: res,
          }]
        }).catch((error) => {
          console.log("Got error");
          console.error(error);
        })

      })
    ))
    mutation.mutate({
      campaign: {
        publicityCampaignName: e.publicityCampaignName,
        publicityCampaignDescription: e.publicityCampaignDescription,
        idcompanyFK: +e.idcompanyFK
      },
      multimedia: items
    })
    setloading(false);
  }

  const deleteItem = (video, name) => {
    return video.filter((item) => item.name !== name)
  }

  const handleDelete = (name) => {
    setVideo(deleteItem(video, name))
  }

  var isVideoPreview = '';

  const onSelect = (e) => {
    setVideo([])
    const idPlan = e.target.value
    const user = planCampaing?.payload?.items?.find(u => u.idpersonPlan == idPlan);
    setplanSelected(user && user)
  }

  useEffect(() => {
    if (file && duration && planSelected) {
      if (duration > planSelected.DurationVideos) {
        message.error('El tiempo del video excede el tiempo permitido por el plan')
        setFile(null)
        setDuration(null)
      } else {
        if (!video.some((e => e.name === file.name))) {
          setVideo([...video, file]);
        }
      }
    }
  }, [duration, file])



  return (
    <Modal
      title=""
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}>
      <div>
        <div>
          {isVideoPreview}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="add-campaing">
        <div className="request-local_grid">
          <InputComponent
            type="text"
            label="Nombre de la campaña"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            error={errors.publicityCampaignName}
            errorMsg="Verifique el campo"
            {...register('publicityCampaignName', { required: true })}
          />
          <InputComponent
            type="text"
            label="Descripción"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            error={errors.publicityCampaignDescription}
            errorMsg="Verifique el campo"
            {...register('publicityCampaignDescription', { required: true })}
          />
        </div>

        <span>Seleccione una empresa</span>
        <div className="input-component2 w-11/12">
          <select  {...register('idcompanyFK', { required: true })} >
            {Array.isArray(dataCompany?.payload?.items) && dataCompany?.payload?.items.map((i) => (
              i.companyState !== 'I' && <option id={i.idcompany} value={i.idcompany}>{i.companyName}</option>
            ))}
          </select>
        </div>

        <span>Seleccionar planes a los que va dirigido </span>
        <div className="input-component2 w-11/12">
          <select defaultValue={null} onChange={(e) => onSelect(e)}>
            {Array.isArray(planCampaing?.payload?.items) && planCampaing?.payload?.items.map((i) => (
              <option value={i.idpersonPlan}>{i.personPlanName}</option>
            ))}
          </select>
        </div>
        <div className='w-11/12 mt-2'>
          {planSelected?.QuantityVideos != video.length ?
            <>
              <span className='mb-10'>
                Subir videos
              </span>
              <div class="image-upload">
                <label className='add-file' for="file-input">
                  Subir
                </label>
                <input
                  className='w-full'
                  id="file-input"
                  type="file"
                  accept="video/*"
                  onChange={(e) => chosenVideo(e, setDuration, setFile, planSelected)}
                />
              </div>
            </>
            : <span style={{ color: "coral" }} >Ha alcanzado el número máximo permitido para este plan </span>}

          <div className='flex flex-col '>
            {
              video.map((item) =>
                <div className='flex w-2/4 items-center' >
                  <span className='item-row' >{item?.name}</span>
                  <RiDeleteBin6Line
                    className='item-row iconDel'
                    onClick={() => handleDelete(item?.name)}
                  />
                </div>)
            }
          </div>
        </div>

        <input type="submit" className="submit" value="Crear" />
      </form>
      <Loading visible={loading || mutation.isLoading} />
    </Modal>
  );
};
