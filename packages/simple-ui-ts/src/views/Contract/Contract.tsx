import { FC, memo } from 'react';
import CollapsibleSplitPane from '../../components/CollapsibleSplitPane';
import ContractList from './ContractList';
import ContractTree from './ContractTree';
import ContractNode from './ContractNode';
import { useAppSelector } from '../../hooks';
import { selectContractNode } from './slices';

const Contract: FC = () => {
  const contractNode = useAppSelector(selectContractNode);
  return (
    <CollapsibleSplitPane
      className="app-ex-min-content-h"
      leftSider={{ content: <ContractList /> }}
      rightSider={contractNode ? { content: <ContractNode /> } : null}
    >
      <ContractTree />
    </CollapsibleSplitPane>
  );
};

export default memo(Contract);
