import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import jwtDecode from 'jwt-decode';
import { Steps, Step } from 'react-step-builder';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Steps1 } from '../../../components/Steps/Steps1';
import { Steps2 } from '../../../components/Steps/Steps2';
import { Steps3 } from '../../../components/Steps/Steps3';
import { Loading } from '../../../components/Loading/Loading';
import { modalError } from '../../../components/SweetAlert/Error';
import { modalSucces } from '../../../components/SweetAlert/Success';

export const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm();

  const params = useParams();

  const dataUser = jwtDecode(params.token);

  var Departamento;
  var ciudad;
  var dataForm;

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

  const {
    isLoading,
    isFetching,
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
  const onSubmit = (data) => {
    dataForm = { ...data, state: Departamento };
    RegisterFetch();
  };
  return (
    <>
      <div className="register">
        <div className="register_logo">IVO</div>
        <div className="register_content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Steps config={config}>
              <Step
                component={() => (
                  <Steps1
                    data={dataUser?.data}
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
        </div>
      </div>
      <Loading visible={isLoading || isFetching} />
    </>
  );
};
