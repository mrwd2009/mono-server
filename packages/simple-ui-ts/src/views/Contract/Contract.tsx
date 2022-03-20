import { FC, memo } from 'react';
import Panel from '../../components/Panel';
import CollapsibleSplitPane from '../../components/CollapsibleSplitPane';

const Contract: FC = () => {
  return (
    <CollapsibleSplitPane
      className="app-ex-min-content-h"
      leftSider={{ content: (
        <Panel tabList={[{ tab: "tab1", key: '1'}, { tab: "tab2", key: '2'}]}>
          left content
        </Panel>
      )}}
      rightSider={{ content: (
        <Panel title="roght">
        right content
      </Panel>
      ) }}
    >
      <Panel title="Main">
        main content
      </Panel>
    </CollapsibleSplitPane>
  );
};

export default memo(Contract);
