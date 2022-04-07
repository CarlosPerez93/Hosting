import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { AddPlan } from '../../components/Modals/Admin/AddPlan';
import { MdDeleteSweep } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { Button, Pagination } from 'antd';
import { useQuery } from 'react-query';
import { Loading } from '../../components/Loading/Loading';
import Api from '../../common/Api/Api';
import { EditPlan } from '../../components/Modals/Admin/EditPlan';
import { useMutation } from 'react-query';
import { modalError } from '../../components/SweetAlert/Error';
import { modalSucces } from '../../components/SweetAlert/Success';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { onChange } from '../../common/utils/setPage';
import InputComponent from '../../components/Inputs/InputComponent2/InputComponent2';

export const PlanUser = () => {
  const [visible, setvisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState();
  const [dataPlan, setDataPlan] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const { data, isLoading } = useQuery(['plans', currentPage], () =>
    Api.get('/plan', { page: currentPage, number: 10 })
  );

  const handleDataPlan = (da) => {
    setDataPlan(da);
    setVisibleEdit(!visibleEdit);
  };

  function showConfirm(id) {
    confirm({
      title: '¿Esta seguro que desea elimiar éste plan?',
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
      return Api.post('/plan/delete/' + data);
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


  const mapData = (item, index) => <Tr>

    <Td>
      <div className="tdCustom">{item.personPlanName}</div>
    </Td>
    <Td>
      <div className="tdCustom">{item.personPlanCost}</div>
    </Td>

    <Td>
      <div className="Icon">
        <br />
        <br />
        <BiEdit
          onClick={() => handleDataPlan(item)}
          className="cursor-pointer"
        />
        <MdDeleteSweep
          onClick={() => showConfirm(item.idpersonPlan)}
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
            item?.personPlanName
              .toLowerCase()
              .includes(filterData.toLowerCase())
          );
        }
      );
      setSearchField(filtered);
    }
  }

  return (
    <div className="Planusers">
      <h3>Planes</h3>
      <Button
        className="btn_accent_orange"
        onClick={() => setvisible(!visible)}
      >
        Agregar Plan
      </Button>
      <div className="header_title">
        <InputComponent onChange={(e) => filterCampaing(e)} placeholder="Buscar" />
      </div>
      <div className="Planusers__content">
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre Plan</Th>
              <Th>Costo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchField !== "" ? searchField.map(item =>
              item.personPlanState !== 'I' && (
                mapData(item)
              )) :
              Array.isArray(data?.payload?.items) &&
              data?.payload?.items.map(
                item =>
                  item.personPlanState !== 'I' && (
                    mapData(item)
                  )
              )}
          </Tbody>
        </Table>
      </div>

      <div className="flex justify-center w-full absolute bottom-2 ">
        <Pagination
          onChange={(page) => onChange(page, setcurrentPage)}
          className="pagination"
          defaultCurrent={10}
          total={data?.payload?.pages * 10}
        />
      </div>

      <AddPlan visible={visible} setVisible={setvisible} />
      <EditPlan
        key={dataPlan?.idpersonPlan}
        data={dataPlan}
        visible={visibleEdit}
        setVisible={setVisibleEdit}
      />
      <Loading visible={mutation.isLoading || isLoading} />
    </div>
  );
};
