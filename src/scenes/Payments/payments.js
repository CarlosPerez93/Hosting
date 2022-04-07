import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Button, Tabs } from "antd";
const { TabPane } = Tabs;
export const Payments = () => {
  return (
    <div className="payments">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Pagos" key="1">
          <h3>Estado de Pagos</h3>
          <Table>
            <Thead>
              <Tr>
                <Th>Nombre Usuario</Th>
                <Th>Plan</Th>
                <Th>Nivel</Th>
                <Th>Pin</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <div className="tdCustom">Carlos Torres</div>
                </Td>
                <Td>
                  <div className="tdCustom">Basico</div>
                </Td>
                <Td>
                  <div className="tdCustom">1</div>
                </Td>
                <Td>
                  <div className="tdCustom">2150</div>
                </Td>
                <Td>
                  <div className="tdCustom">Sin Pagar</div>
                </Td>
                <Td>
                  <div className="Icon">
                    <Button className="btn_accent_blue">Ver</Button>
                  </div>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TabPane>
        <TabPane tab="Historial de Pagos" key="2">
          <h3>Historial de pagos</h3>
          <Table>
            <Thead>
              <Tr>
                <Th>Nombre Usuario</Th>
                <Th>Plan</Th>
                <Th>Nivel</Th>
                <Th>Fecha de Pago</Th>
                <Th>Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <div className="tdCustom">Carlos Torres</div>
                </Td>
                <Td>
                  <div className="tdCustom">Basico</div>
                </Td>
                <Td>
                  <div className="tdCustom">1</div>
                </Td>
                <Td>
                  <div className="tdCustom">15/07/2021</div>
                </Td>
                <Td>
                  <div className="tdCustom">Pagado</div>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TabPane>
      </Tabs>
    </div>
  );
};
