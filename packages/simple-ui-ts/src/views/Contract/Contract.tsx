import { FC, memo } from 'react';
import Panel from '../../components/Panel';
import CollapsibleSplitPane from '../../components/CollapsibleSplitPane';
import ContractList from './ContractList';

const Contract: FC = () => {
  return (
    <CollapsibleSplitPane
      className="app-ex-min-content-h"
      leftSider={{ content: <ContractList /> }}
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
