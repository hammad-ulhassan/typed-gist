import { Radio } from 'antd';
import React from 'react';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';

export type BtnGrpPropType = {
  view: string;
  onViewChange: Function
}

function BtnGrp({view, onViewChange}: BtnGrpPropType) {
  return (
    <Radio.Group
      value={view}
      onChange={()=>onViewChange(view)}
      buttonStyle="outline"
    >
      <Radio.Button value="table" type="text">
        <UnorderedListOutlined />
      </Radio.Button>
      <Radio.Button value="card" type="text">
        <AppstoreOutlined />
      </Radio.Button>
    </Radio.Group>
  );
}

export default React.memo(BtnGrp)
