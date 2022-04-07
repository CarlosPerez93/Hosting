import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button, Pagination } from 'antd';
import { AddCampaing } from '../../components/Modals/Admin/AddCampaing';
import { MdDeleteSweep, MdOndemandVideo } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { UpdateCampaing } from '../../components/Modals/Admin/UpdateCampaing';
import Api from '../../common/Api/Api';
import { modalError } from '../../components/SweetAlert/Error';
import { modalSucces } from '../../components/SweetAlert/Success';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import { ViewCampaingMultimedia } from '../../components/Modals/Admin/ViewCampaingMultimedia';
import { onChange } from '../../common/utils/setPage';
import { Loading } from '../../components/Loading/Loading';
import InputComponent from '../../components/Inputs/InputComponent2/InputComponent2';
import { filtereditems } from '../../common/utils/Search';

export const Campaing = () => {
  const [visible, setvisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState();
  const [datacampanig, setdatacampanig] = useState();
  const [visibleMultimedia, setvisibleMultimedia] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const { data, isLoading } = useQuery(['campaign', currentPage], () =>
    Api.get('/campaign', { page: currentPage })
  );
  const [searchField, setSearchField] = useState("");

  const handleDatacampanig = (da) => {
    setdatacampanig(da);
    setVisibleEdit(!visibleEdit);
  };

  const handleMultimedia = (id) => {
    setdatacampanig(id);
    setvisibleMultimedia(!visibleMultimedia);
  };

  function showConfirm(id) {
    confirm({
      title: '¿Esta seguro que desea elimiar la campaña?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Si',
      cancelText: 'No',
      onOk() {
        mutation.mutate(id);
      }
    });
  }

  const mutation = useMutation(
    (data) => {
      return Api.post('/campaign/delete/' + data);
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

  const mapData = (item) => <Tr>
    <Td>
      <div className="tdCustom">{item.companyName}</div>
    </Td>
    <Td>
      <div className="tdCustom">
        {item.publicityCampaignName}
      </div>
    </Td>
    <Td>
      <div className="tdCustom">
        {item.publicityCampaignDescription}
      </div>
    </Td>
    <Td>
      <div className="Icons">
        <br />
        <br />
        <BiEdit
          onClick={() => handleDatacampanig(item)}
          className="cursor-pointer"
        />
        <MdDeleteSweep
          onClick={() => showConfirm(item.idpublicityCampaign)}
          className="cursor-pointer"
        />
        <Button className="btn_accent_blue">Publicar</Button>
        <MdOndemandVideo
          className="cursor-pointer"
          onClick={() =>
            handleMultimedia(item?.idpublicityCampaign)
          }
        />
      </div>
    </Td>
  </Tr>

  const filterCampaing = (e) => {
    if (data?.payload) {
      let filterData = e.target.value
      const filtered = data?.payload?.items.filter(
        item => {
          return (
            item?.companyName
              .toLowerCase()
              .includes(filterData.toLowerCase())
          );
        }
      );
      setSearchField(filtered);
    }
  }

  return (
    <div className="campaing">
      <h3>Campañas</h3>
      <Button
        className="btn_accent_orange"
        onClick={() => setvisible(!visible)}
      >
        Agregar campaña
      </Button>
      <div className="header_title">
        <InputComponent onChange={(e) => filterCampaing(e)} placeholder="Buscar" />
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre Empresa</Th>
            <Th>Nombre Campaña</Th>
            <Th>Descripción</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchField !== "" ? searchField.map(item =>
            item.companyState !== 'I' && (
              mapData(item)
            )) :
            Array.isArray(data?.payload?.items) &&
            data?.payload?.items.map(
              item =>
                item.companyState !== 'I' && (
                  mapData(item)
                )
            )}
        </Tbody>
      </Table>
      <div className="flex justify-center w-full absolute bottom-8 ">
        <Pagination
          onChange={(page) => onChange(page, setcurrentPage)}
          className="pagination"
          defaultCurrent={10}
          total={data?.payload?.pages * 10}
        />
      </div>
      <AddCampaing visible={visible} setVisible={setvisible}  campaing={data}/>
      <UpdateCampaing
        key={datacampanig?.idpersonPlan}
        campaign={datacampanig}
        visible={visibleEdit}
        setVisible={setVisibleEdit}
      />
      <ViewCampaingMultimedia
        key={datacampanig}
        campaign={datacampanig}
        visible={visibleMultimedia}
        setVisible={setvisibleMultimedia}
      />
      <Loading visible={isLoading} />
    </div>
  );
};
