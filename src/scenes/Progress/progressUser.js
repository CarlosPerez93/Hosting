import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button } from 'antd';
import InputComponent from '../../components/Inputs/InputComponent/InputComponent';
import OrganizationChart from "@dabeng/react-orgchart";
import { NodeUser } from '../../components/OrgChart/template';
import { users } from '../../common/utils/Dummy/DummyUsers';
import { useQuery } from 'react-query'
import Api from '../../common/Api/Api'
import { Loading } from '../../components/Loading/Loading';
import { SearchProgressUser } from '../../components/Modals/Admin/SearchProgressUser';
import { useParams } from 'react-router-dom';

export const Progress = () => {
  const { userId, id } = useParams()

  const [open, setOpen] = useState(false)

  const { data, isLoading } = useQuery('progress', () =>
    Api.get(`/progress/${userId}/${id}`)
  );

  return (
    <>
      {
        isLoading ?
          <Loading visible={isLoading} />
          :
          <div className="progressUser">
 {/*            <div className="box">
              <h3>Buscar</h3>
              <div className="cursor-pointer progressCompany_title">
                <InputComponent placeholder="Buscar" />
              </div>
            </div> */}
            <OrganizationChart containerClass="myContainer-chart" chartClass="myChart"
              pan={true} zoom={false} zoomoutLimit={7} zoominLimit={0.5} datasource={data?.payload?.root !== undefined ? data?.payload?.root : users} NodeTemplate={NodeUser} />
          </div>
      }
      {/*       <SearchProgressUser open={open} setOpen={setOpen} setSearch={setSearch} progressData={data?.payload?.root} />
 */}
    </>
  );
};
