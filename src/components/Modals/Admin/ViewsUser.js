import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { useQuery } from 'react-query';
import Api from '../../../common/Api/Api';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { Loading } from '../../Loading/Loading';

export const ViewsUser = ({ visible, setVisible, user }) => {
  const { data, isLoading, isFetching } = useQuery(['ViewsUsers', user], () =>
    Api.get('/person/userall/' + user?.idperson)
  );
  return (
    <>
      <Modal title="" visible={visible} onCancel={() => setVisible(!visible)}>
        <div className="views-user">
          <div className="views-user__item">
            <InputComponent
              type="text"
              label="Nombre"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.name}
              disabled
            />
            <InputComponent
              type="text"
              label="Número de documento"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.identification}
              disabled
            />

            <InputComponent
              type="text"
              label="Correo Electrónico"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.email}
              disabled
            />
            <InputComponent
              type="text"
              label="Fecha de nacimiento"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={
                data && data?.payload[0]?.datePerson.substring(0, 9)
              }
              disabled
            />
          </div>
          <div className="views-user__item">
            <InputComponent
              type="text"
              label="Direccción"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.direction}
              disabled
            />
            <InputComponent
              type="text"
              label="Número de celular"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.phone}
              disabled
            />
            <InputComponent
              type="text"
              label="Nacionalidad"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.nationality}
              disabled
            />
            <InputComponent
              type="text"
              label="Departamento"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.state}
              disabled
            />
          </div>
          <div className="views-user__item">
            <InputComponent
              type="text"
              label="Ciudad"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.municipaly}
              disabled
            />
            <InputComponent
              type="text"
              label="Grado de escolaridad"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.scholarship}
              disabled
            />
            <InputComponent
              type="text"
              label="Profesión"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.profession}
              disabled
            />
            <InputComponent
              type="text"
              label="Estado Civil"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.civilStatus}
              disabled
            />
          </div>
          <div className="views-user__item">
            <InputComponent
              type="text"
              label="Religión"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.religion}
              disabled
            />
            <InputComponent
              type="text"
              label="Tendencia Política"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.politicalTrend}
              disabled
            />
            <InputComponent
              type="text"
              label="Tiene hijos"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.children}
              disabled
            />
            <InputComponent
              type="text"
              label="Tiene mascota"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.pets}
              disabled
            />
          </div>
          <div className="views-user__item">
            <InputComponent
              type="text"
              label="Bebe Alcohol"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.alcohol}
              disabled
            />
            <InputComponent
              type="text"
              label="Fuma"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.smoke}
              disabled
            />
            <InputComponent
              type="text"
              label="Es vegetariano"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.vegan}
              disabled
            />
            <InputComponent
              type="text"
              label="Tiene carro"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.car}
              disabled
            />
          </div>
          <div className="views-user__item">
            <InputComponent
              type="text"
              label="Tiene moto"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.motorcycle}
              disabled
            />
            <InputComponent
              type="text"
              label="vive en casa"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.ownHouse}
              disabled
            />
            <InputComponent
              type="text"
              label="Ingresos por año"
              placeholder=""
              icon="fa fa-user-o"
              className="mb-10"
              defaultValue={data && data?.payload[0]?.income}
              disabled
            />
          </div>
        </div>
      </Modal>
      <Loading visible={isFetching || isLoading} />
    </>
  );
};
