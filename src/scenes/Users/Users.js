import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button, Pagination } from 'antd';
import { AddUser } from '../../components/Modals/Admin/AddUser';
import { MdDeleteSweep } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { Loading } from '../../components/Loading/Loading';
import Api from '../../common/Api/Api';
import { EditUser } from '../../components/Modals/Admin/EditUser';
import confirm from 'antd/lib/modal/confirm';
import { modalError } from '../../components/SweetAlert/Error';
import { modalSucces } from '../../components/SweetAlert/Success';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FiEye } from 'react-icons/fi';
import { FaNetworkWired } from 'react-icons/fa';
import { ViewsUser } from '../../components/Modals/Admin/ViewsUser';
import { onChange } from '../../common/utils/setPage';
import InputComponent from '../../components/Inputs/InputComponent2/InputComponent2';
import { useHistory } from 'react-router-dom';

export const Users = () => {
  const [visible, setvisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState();
  const [dataUser, setdataUser] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const { data, isLoading } = useQuery(['Users', currentPage], () =>
    Api.get('/person/users', { page: currentPage })
  );
  const history = useHistory()

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const [visibleViewsUser, setvisibleViewsUser] = useState();
  const [searchField, setSearchField] = useState("");

  const handleDataUser = (da) => {
    setdataUser(da);
    setVisibleEdit(!visibleEdit);
  };

  const handleDataViewsUser = (da) => {
    setdataUser(da);
    setvisibleViewsUser(!visibleEdit);
  };

  function showConfirm(id) {
    confirm({
      title: '¿Esta seguro que desea elimiar éste usuario?',
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
      return Api.post('/person/delete/' + data);
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
      <div className="tdCustom">{item.name}</div>
    </Td>
    <Td>
      <div className="tdCustom">{item.email}</div>
    </Td>
    <Td>
      <div className="tdCustom">{item.phone}</div>
    </Td>
    <Td>
      <div className="tdCustom">{item.identification}</div>
    </Td>
    <Td>
      <div className="Icon">
        <br />
        <br />
        <BiEdit
          onClick={() => handleDataUser(item)}
          className="cursor-pointer"
        />
        <MdDeleteSweep
          onClick={() => showConfirm(item.idperson)}
          className="cursor-pointer"
        />
        <FiEye
          onClick={() => handleDataViewsUser(item)}
          className="cursor-pointer"
        />
        <FaNetworkWired
          onClick={() => history.push(`/progressuser/${item?.idperson}/${item?.referenceCode}`)}
          className="cursor-pointer" />
      </div>
    </Td>
  </Tr>

  const filterCampaing = (e) => {
    if (data?.payload) {
      let filterData = e.target.value
      const filtered = data.payload?.items.filter(
        item => {
          return (
            item?.name
              .toLowerCase()
              .includes(filterData.toLowerCase()) ||
            item?.email
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
      <h3>Usuarios</h3>
      <Button
        className="btn_accent_orange"
        onClick={() => setvisible(!visible)}
      >
        Agregar Usuario
      </Button>
      <div className="header_title">
        <InputComponent onChange={(e) => filterCampaing(e)} placeholder="Buscar" />
      </div>
      <div className="users__content">
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre Usuario</Th>
              <Th>Correo</Th>
              <Th>Teléfono</Th>
              <Th>Identificación</Th>
              <Th>Acciónes</Th>
            </Tr>
          </Thead>

          <Tbody>
            {searchField !== "" ? searchField.map(item =>
              item.statePerson !== 'I' &&
              item.nameRole !== 'ADMIN' && (
                mapData(item)
              )) :
              Array.isArray(data?.payload?.items) &&
              data?.payload?.items.map(
                (item, index) =>
                  item.statePerson !== 'I' &&
                  item.nameRole !== 'ADMIN' && (
                    mapData(item)
                  )
              )}
          </Tbody>
        </Table>
      </div>
      <div className="flex justify-center w-full absolute bottom-8 ">
        <Pagination
          onChange={(page) => onChange(page, setcurrentPage)}
          className="pagination"
          defaultCurrent={10}
          total={data?.payload?.pages * 10}
        />
      </div>

      <AddUser visible={visible} setVisible={setvisible} />
      <EditUser
        key={dataUser?.idperson}
        user={dataUser}
        visible={visibleEdit}
        setVisible={setVisibleEdit}
      />

      <ViewsUser
        key={dataUser?.idperson}
        visible={visibleViewsUser}
        setVisible={setvisibleViewsUser}
        user={dataUser}
      />

      <Loading visible={mutation.isLoading || isLoading} />
    </div>
  );
};
