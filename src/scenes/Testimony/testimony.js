import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Button } from 'antd';
import { SeeMultimedia } from '../../components/Modals/Admin/SeeMultimedia';

export const Testimony = () => {
  const [visible, setvisible] = useState(false);
  return (
    <div className="testimony">
      <h3>Testimonios</h3>
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre Usuario</Th>
            <Th>Descripción</Th>
            <Th>Archivo Multimedia</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <div className="tdCustom">Yesica Yustres</div>
            </Td>
            <Td>
              <div className="tdCustom">La aplicación esta muy chevere</div>
            </Td>
            <Td>
              <div className="Icon">
                <Button
                  className="btn_accent_orange"
                  onClick={() => setvisible(!visible)}
                >
                  Ver
                </Button>
              </div>
            </Td>
            <Td>
              <div className="tdCustom">Sin Publicar</div>
            </Td>
            <Td>
              <div className="Icon">
                <Button className="btn_accent_blue">Publicar</Button>
              </div>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <SeeMultimedia visible={visible} setVisible={setvisible} />
    </div>
  );
};
