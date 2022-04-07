import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal';


export const SearchProgressUser = ({ open, setOpen, progressData, setSearch }) => {

  const [names, setNames] = useState(null)

  const filterCampaing = (e) => {
    if (e.target.value == "") {
      setNames(null);
    }

    if (progressData) {
      let filterData = e.target.value
      const filtered = progressData?.children.filter(
        item => {
          return (
            item?.name
              .toLowerCase()
              .includes(filterData.toLowerCase())
          );
        }
      );
      setNames(filtered);
    }
  }

  console.log('====names================================');
  console.log(names);
  console.log('====================================');


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      center
      classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}
    >
      <div className="h-200">

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Buscar usuario
          </label>
          <input onChange={(e) => filterCampaing(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nombre de usuario" />
        </div>

        {names !== null &&
          <ul class="w-full text-sm font-medium text-gray-400 bg-white rounded-md border border-gray-200 bg-gray-400 border-gray-600 text-white">
            {names.map(item =>
              <li onClick={() => setSearch(item)} style={{borderBottom:"1px solid white"}} className="cursor-pointer py-2 px-4 w-full rounded-t-lg border-b border-gray-white border-gray-400 text-white">{item.name}</li>

            )}

          </ul>

        }
      </div>
    </Modal>
  )
}
