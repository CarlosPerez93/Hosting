import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button } from 'antd';
import { Progress } from '../../components/Modals/Company/progress';

export const CampaingCompany = () => {
  const [visible, setvisible] = useState(false);
  return (
    <div className="campaingCompany">
      <h3>Campañas</h3>

      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Multimedia</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <div className="tdCustom">Campaña de prueba</div>
            </Td>
            <Td>
              <div className="tdCustom">Esta campaña es de prueba</div>
            </Td>
            <Td>
              <div className="tdCustom">10</div>
            </Td>
            <Td>
              <div className="tdCustom">Publicado</div>
            </Td>
            <Td>
              <Button
                className="btn_accent_blue"
                onClick={() => setvisible(!visible)}
              >
                Progreso
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Progress visible={visible} setVisible={setvisible} />
    </div>
  );
};
