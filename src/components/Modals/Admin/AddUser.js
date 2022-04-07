import React, { useState } from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { Row, Col, Button } from 'antd';
import { Steps, Step } from 'react-step-builder';
import { useQuery } from 'react-query';
import { Steps1 } from '../../Steps/Steps1';
import { Steps2 } from '../../Steps/Steps2';
import { Steps3 } from '../../Steps/Steps3';
import { Tabs } from 'antd';
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import { Loading } from '../../Loading/Loading';

const { TabPane } = Tabs;

export const AddUser = ({ visible, setVisible }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm();

  var Departamento;
  var ciudad;
  var dataForm, dataFormEmail;

  const [states, setstates] = useState();

  const handleState = (e) => {
    setstates(e.target.value);
    Departamento = e.target.value;
    refetch();
  };

  const handlecity = (e) => {
    ciudad = e;
    refetchcity();
  };
  const { data: countries } = useQuery(
    'countries',
    () =>
      fetch('https://countriesnow.space/api/v0.1/countries/positions').then(
        (res) => res.json()
      ),
    {
      refetchOnWindowFocus: false
    }
  );

  const { data: state, refetch } = useQuery(
    'state',
    async () =>
      await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: Departamento })
      })
        .then((response) => response.json())
        .catch((err) => err),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  const { data: city, refetch: refetchcity } = useQuery(
    'city',
    async () =>
      await fetch(
        'https://countriesnow.space/api/v0.1/countries/state/cities',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            country: states,
            state: ciudad
          })
        }
      )
        .then((response) => response.json())
        .catch((err) => err),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    status,
    refetch: RegisterFetch
  } = useQuery(
    'register',
    async () =>
      await fetch('https://test-ivo-internacional.herokuapp.com/person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataForm)
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            modalSucces({ message: 'Todo ha salido bien', url: '/' });
          } else {
            modalError({ message: 'Por favor revise sus datos de registro' });
          }

          response.json();
        })
        .catch((err) => err),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  //xxxxxxxxxxxxxxxxxx post para envio de correo XXXXXXXXXXXXXXXXXXX
  const { data: response2, refetch: emialFetch } = useQuery(
    'email',
    async () =>
      await fetch('https://test-ivo-internacional.herokuapp.com/email/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(dataFormEmail)
      })
        .then((response2) => {
          console.log(response2);
          if (response2.ok) {
            modalSucces({ message: 'Todo ha salido bien', url: '/users' });
          } else {
            modalError({ message: 'Por favor revise sus datos' });
          }

          response2.json();
        })
        .catch((err) => err),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  const onSubmit = (data) => {
    dataForm = { ...data, state: Departamento };
    RegisterFetch();
  };

  const onSubmitEmial = (data) => {
    dataFormEmail = { email: data.email, params: { email: data.email, nombre: data.nombre } };
    emialFetch();
  };
  const Navigation = (props) => {
    console.log({ props });
    return (
      <Row align="left">
        {props.current !== props.allSteps.length - 2 && (
          <Col>
            <Button
              className="btn_accent_orange"
              onClick={props.prev}
              style={{ marginRight: 10 }}
            >
              Anterior
            </Button>
          </Col>
        )}
        {props.current !== props.allSteps.length && (
          <Col>
            <Button className="btn_blue" onClick={props.next}>
              Siguiente
            </Button>
          </Col>
        )}
      </Row>
    );  
  };
  const config = {
    navigation: {
      component: Navigation,
      location: 'after'
    }
  };

  return (
    <Modal
      title=""
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Enviar formulario" key="1">
          <form className="add-user" onSubmit={handleSubmit(onSubmitEmial)}>
            <InputComponent
              type="text"
              label="Nombre "
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="email"
              {...register('nombre', { required: true })}
            />
            <InputComponent
              type="email"
              label="Correo Electronico "
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="email"
              {...register('email', { required: true })}
            />
            <input type="submit" className="submit" value="Crear" />
          </form>
        </TabPane>
        <TabPane tab="Llenar formulario" key="2">
          <form className="add-user" onSubmit={handleSubmit(onSubmit)}>
            <Steps config={config}>
              <Step
                component={() => (
                  <Steps1
                    getValues={getValues}
                    errors={errors}
                    register={register}
                  />
                )}
              />
              <Step
                component={() => (
                  <Steps2
                    onchange={handleState}
                    onchange2={handlecity}
                    countries={countries.data}
                    states={state?.data?.states}
                    city={city?.data}
                    getValues={getValues}
                    errors={errors}
                    register={register}
                  />
                )}
              />
              <Step
                component={() => (
                  <Steps3
                    getValues={getValues}
                    errors={errors}
                    register={register}
                  />
                )}
              />
            </Steps>
          </form>
        </TabPane>
      </Tabs>
      <Loading visible={isLoading || isFetching} />
    </Modal>
  );
};
