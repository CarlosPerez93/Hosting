import { Modal } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import AliceCarousel from 'react-alice-carousel';
import ReactPlayer from 'react-player';

import Api from '../../../common/Api/Api';
import { Loading } from '../../Loading/Loading';

export const ViewCampaingMultimedia = ({ visible, setVisible, campaign }) => {
  const { data, isLoading } = useQuery('multimedia', () =>
    Api.get('/multimedia/' + campaign)
  );
  const items = data?.payload?.map((item) => (
    <ReactPlayer
      style={{ marginTop: '20px', margin: 'auto' }}
      controls
      url={item?.multimediaUrl}
    />
  ));

  return (
    <Modal title="" visible={visible} onCancel={() => setVisible(!visible)}>
      <div style={{ width: '60vw' }} className="block ">
        <AliceCarousel mouseTracking items={items} />
      </div>
      <Loading visible={isLoading} />
    </Modal>
  );
};
