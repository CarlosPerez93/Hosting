import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button, Pagination } from 'antd';
import { Addcompany } from '../../components/Modals/Company/AddCompany';
import { MdDeleteSweep } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { Loading } from '../../components/Loading/Loading';
import { Editcompany } from '../../components/Modals/Company/EditCompany';
import Api from '../../common/Api/Api';
import confirm from 'antd/lib/modal/confirm';
import { modalError } from '../../components/SweetAlert/Error';
import { modalSucces } from '../../components/SweetAlert/Success';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { onChange } from '../../common/utils/setPage';
import InputComponent from '../../components/Inputs/InputComponent2/InputComponent2';

export const Company = () => {
  const [visible, setvisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState();
  const [dataCompany, setdataCompany] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");

  const { data, isLoading } = useQuery(['company', currentPage], () =>
    Api.get('/company', { page: currentPage })
  );

  const handledataCompany = (da) => {
    setdataCompany(da);
    setVisibleEdit(!visibleEdit);
  };

  function showConfirm(id) {
    confirm({
      title: '¿Esta seguro que desea elimiar la empresa?',
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
      return Api.post('/company/delete/' + data);
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
      <div className="tdCustom">{item.companyNit}</div>
    </Td>
    <Td>
      <div className="tdCustom">
        {item.registrationDate.substring(0, 9)}
      </div>
    </Td>
    <Td>
      <div className="Icon">
        <br />
        <br />
        <BiEdit
          onClick={() => handledataCompany(item)}
          className="cursor-pointer"
        />
        <MdDeleteSweep
          onClick={() => showConfirm(item.idcompany)}
          className="cursor-pointer"
        />
      </div>
    </Td>
  </Tr>


  const filterCampaing = (e) => {
    if (data?.payload) {
      let filterData = e.target.value
      const filtered = data.payload?.items.filter(
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
    <div className="users">
      <h3>Empresar</h3>
      <Button
        className="btn_accent_orange"
        onClick={() => setvisible(!visible)}
      >
        Agregar Empresa
      </Button>
      <div className="header_title">
        <InputComponent onChange={(e) => filterCampaing(e)} placeholder="Buscar" />
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre Empresa</Th>
            <Th>Nit</Th>
            <Th>Fecha de Registro</Th>
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
              (item) =>
                item.companyState !== 'I' && (
                  mapData(item))
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
      <Addcompany visible={visible} setVisible={setvisible} />
      <Editcompany
        key={dataCompany?.idpersonPlan}
        company={dataCompany}
        visible={visibleEdit}
        setVisible={setVisibleEdit}
      />
      <Loading visible={isLoading} />
    </div>
  );
};
