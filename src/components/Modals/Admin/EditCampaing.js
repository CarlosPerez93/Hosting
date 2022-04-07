import React, { useState } from 'react';
import { Modal } from 'antd';
import InputComponent from '../../Inputs/InputComponent2/InputComponent2';
import { useForm } from 'react-hook-form';
import { Upload, message, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BiCloudUpload } from 'react-icons/bi';
import { useQuery } from 'react-query';
import Api from '../../../common/Api/Api';

export const EditCampaing = ({ visible, setVisible, data }) => {
  const [loading, setloading] = useState();
  const [imageUrl, setimageUrl] = useState();

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    console.log('videos', file);
    const isJpgOrPng = file.type === 'video/mp4';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setloading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setimageUrl(imageUrl);
        setloading(false);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <BiCloudUpload className="mx-auto" />}
      <div style={{ marginTop: 8 }}>Subir archivo</div>
    </div>
  );
  const { data: planCampaing } = useQuery('planCampaing', () =>
    Api.get('/plan')
  );
  const { data: dataCompany } = useQuery('dataCompany', () =>
    Api.get('/company')
  );

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm();

  return (
    <Modal
      title=""
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form className="add-campaing">
        <div className="request-local_grid">
          <InputComponent
            type="text"
            label="Nombre de la campaña"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            error={errors.publicityCampaignName}
            errorMsg="Verifique el campo"
            defaultValue={data?.publicityCampaignName}
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
            defaultValue={data?.publicityCampaignDescription}
            {...register('publicityCampaignDescription', { required: true })}
          />
        </div>
        <span>Seleccionar archivos multimedia</span>

        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              className="mx-auto"
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>

        <span>Seleccione una empresa</span>

        <div className="input-component2 w-11/12">
          <select>
            {Array.isArray(dataCompany?.payload) &&  dataCompany?.payload.map((i) => (
              <option value={i.idcompany}>{i.companyName}</option>
            ))}
          </select>
        </div>

        <span>Seleccionar planes a los que va dirigido </span>

        <div className="input-component2 w-11/12">
          <select>
            {Array.isArray(planCampaing?.payload) && planCampaing?.payload.map((i) => (
              <option value={i.idpersonPlan}>{i.personPlanName}</option>
            ))}
          </select>
        </div>

        <span>Seleccionar los niveles a los que va ir dirigido</span>

        <Row className=" w-11/12" justify={'space-between'}>
          <Col>
            <h4>Nivel 1</h4>
            <input name="pets" type="checkbox" />
          </Col>
          <Col>
            <h4>Nivel 2</h4>
            <input name="pets" type="checkbox" />
          </Col>
          <Col>
            <h4>Nivel 3</h4>
            <input name="pets" type="checkbox" />
          </Col>
          <Col>
            <h4>Nivel 4 </h4>
            <input name="pets" type="checkbox" />
          </Col>
          <Col>
            <h4>Nivel 5</h4>
            <input name="pets" type="checkbox" />
          </Col>
          <Col>
            <h4>Nivel 6</h4>
            <input name="pets" type="checkbox" />
          </Col>
          <Col>
            <h4>Nivel 7</h4>
            <input name="pets" type="checkbox" />
          </Col>
        </Row>

        <input type="submit" className="submit" value="Crear" />
      </form>
    </Modal>
  );
};
