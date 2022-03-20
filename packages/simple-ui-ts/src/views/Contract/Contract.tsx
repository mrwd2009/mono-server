import { FC, memo } from 'react';
import { Card } from 'antd';
import SplitPane, { Pane } from '../../components/SplitPane';
import CollapsibleSplitPane from '../../components/CollapsibleSplitPane';

const Contract: FC = () => {
  return (
    <CollapsibleSplitPane
      className="app-ex-min-content-h"
      leftSider={{ content: <Card className="w-100" title="title" /> }}
      rightSider={{ content: 'right' }}
    >
      main
    </CollapsibleSplitPane>
  );
  // return (
  //   <SplitPane  className="app-ex-min-content-h">
  //     <Pane initialSize="200px">
  //       <Card
  //         className="w-100"
  //         title="dfsdf"
  //         // tabList={[{ key: 'contract', tab: 'Contract'}, { key: 'resuable', tab: 'Reusable'}]}
  //       />
  //     </Pane>
  //     <Pane>
  //       main
  //     </Pane>
  //     <Pane initialSize="200px">
  //       right
  //     </Pane>
  //   </SplitPane>
  // );
};

export default memo(Contract);
