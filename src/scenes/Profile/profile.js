import React, { useState } from 'react';
import InputComponent from '../../components/Inputs/InputComponent/InputComponent';
import { useForm } from 'react-hook-form';
import { Token } from '../../common/Storage/Token';
import { FcCameraAddon } from 'react-icons/fc'
import { modalError } from '../../components/SweetAlert/Error';
import { modalSucces } from '../../components/SweetAlert/Success';
import { useMutation, useQuery } from 'react-query';
import Api from '../../common/Api/Api';
import { Loading } from '../../components/Loading/Loading';
import { message } from 'antd';
import { UploadFirebase } from '../../components/firebase/PromiseUpload';
export const Profile = () => {
  const [image, setImage] = useState({ object: null, url: '' });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState();
  const [state, setState] = useState({
    name: 'React',
    get_img: '',
    imgAtribute: []
  })

  const dataToken = Token.decode();

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm();

  const mutation = useMutation(data => {
    return Api.put('/person/user/' + dataToken.data.idperson, data)
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


  const loadImg = (e) => {
    let value = URL.createObjectURL(e.target.files[0]);
    let obj = e.target.files[0]
    if (obj?.type === "image/png" || obj?.type === "image/jpg" || obj?.type === "image/jpeg") {
      setImage({ object: obj, url: value });
    } else {
      message.error('El formato de la imagen no es correcto')
    }
  }



  const onSubmit = async (data) => {
    console.log(data)
    const values = {
      /*   name: data.name || dataUser?.payload?.name,
        identification: data.identification || dataUser?.payload?.identification,
      */  phone: data.phone || dataUser?.payload?.phone,
      direction: data.direction || dataUser?.payload?.phone,
      email: data.email || dataUser?.payload?.email,

    }
    if (image.url === '') {
      mutation.mutate(values)
    } else {
      setLoading(true);
      return Promise.all([
        UploadFirebase({ value: image.object }).then(async (res) => {
          mutation.mutate({
            ...values,
            image: res
          })
          setLoading(false);
        })
      ])

    }
  }

  const { data: dataUser } = useQuery('dataUSer', () =>
    Api.get('/person/user/' + dataToken.data.idperson),
  );
  console.log(dataUser)


  return (
    <div className="profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        {image.url === '' ?
          <div id="containerImg" className='containerImg'>
            <label for="imgLoad" ><FcCameraAddon className='iconCam1' /></label>

            <input id="imgLoad" type="file" onChange={loadImg} />
          </div> :
          <div className='containerImg1'>
            <img src={image.url} className='imgProfile' />
            <label for="imgLoad" >
              <div className='icon1'>
                <FcCameraAddon className='iconCam' />
              </div>
            </label>
            <input id="imgLoad" type="file" onChange={loadImg} />
          </div>

        }
        {dataUser?.payload && <>
          <InputComponent
            type="text"
            label="Nombre"
            placeholder=""
            icon="fa fa-user-o"
            className="mb-10"
            name="name"
            defaultValue={dataUser?.payload?.name}
            {...register("name")}


          />

          <InputComponent
            type="text"
            label="Número de Identificación o Nit"
            placeholder=""
            icon="fa fa-user-o"
            className="mb-10"
            name="name"
            defaultValue={dataUser?.payload?.identification}
            {...register('identification')}
            disable
          />
          <InputComponent
            type="text"
            label="Teléfono"
            placeholder=""
            icon="fa fa-user-o"
            className="mb-10"
            name="name"
            defaultValue={dataUser?.payload?.phone}
            {...register('phone')}

          />
          <InputComponent
            type="text"
            label="Dirección"
            placeholder=""
            icon="fa fa-user-o"
            className="mb-10"
            name="name"
            defaultValue={dataUser?.payload?.direction}
            {...register('direction')}

          />
          <InputComponent
            type="text"
            label="Correo Electrónico"
            placeholder=""
            icon="fa fa-user-o"
            className="mb-10"
            name="name"
            defaultValue={dataUser?.payload?.email}
            {...register('email')}

          />


        </>

        }

        {/*   <InputComponent
          type="text"
          label="Ciudad"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          name="name"
          defaultValue={dataToken?.data.municipaly}
          {...register('name')}
          
        /> */}

        <input type="submit" className="submit" value="Guardar" />
      </form>
      <Loading visible={mutation.isLoading || loading} />
    </div>

  );
};
