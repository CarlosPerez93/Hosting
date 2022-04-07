import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import InputComponent from "../../components/Inputs/InputComponent/InputComponent";
import { dummy } from "../../common/utils/Dummy/DummyProgressCompany";

export const ProgressCompany = () => {
  const mapData = (item) => (
    <Tr>
      <Td>
        <div className="tdCustom">{item.name_campaing}</div>
      </Td>
      <Td>
        <div className="tdCustom">{item.number_videos}</div>
      </Td>
      <Td>
        <div className="tdCustom">{item.porcentage}</div>
      </Td>
    </Tr>
  );

  return (
    <div className="progressCompany">
      <div className="box">
        <h3>Progreso Empresa</h3>
        <div className="progressCompany_title">
          <InputComponent placeholder="Buscar" />
        </div>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Nombre Campaña</Th>
            <Th>Numero Videos</Th>
            <Th>Porcentaje</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dummy.DummyProgressCompany.map((item) => mapData(item))}

          {/*<Tr>    <Td>
              <div className="tdCustom">Futbol Red</div>
            </Td>
            <Td>
              <div className="tdCustom">Basico</div>
            </Td>
            <Td>
              <div className="tdCustom">250</div>
            </Td>
            <Td>
              <div className="tdCustom">750</div>
            </Td>
            <Td>
              <div className="Icon">
                <Button className="btn_accent_blue">Ver</Button>
              </div>
            </Td> 
          </Tr>*/}
        </Tbody>
      </Table>
    </div>
  );
};
