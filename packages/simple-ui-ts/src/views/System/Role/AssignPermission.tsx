import { FC, memo, useEffect, useState, useRef } from 'react';
import { Spin, Tree } from 'antd';
import ScrollShadow from '../../../components/ScrollShadow';
import HookedModal, { HookedModalInstance } from '../../../components/HookedModal';
import { useLazyGetAssignedPermissionsQuery, useAssignPermissionsMutation} from './services';

interface Props {
  hookedModal: HookedModalInstance;
}

const AssignPermission: FC<Props> = ({ hookedModal }) => {
  const { data, visible } = hookedModal;
  const [fetchList, { isLoading: listLoading, data: list}] = useLazyGetAssignedPermissionsQuery();
  const [assignPermissions, { isLoading }] = useAssignPermissionsMutation();
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<number[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const dataRef = useRef(data);
  dataRef.current = data;
  const fetchListRef = useRef(fetchList);
  fetchListRef.current = fetchList;

  useEffect(() => {
    if (visible) {
      fetchListRef.current(dataRef.current.key)
        .then(({ data }) => {
          setCheckedKeys(data?.checkedKeys || []);
          setExpandedKeys(data?.checkedKeys || []);
          setAutoExpandParent(true);
        });
    }
  }, [visible]);

  return (
    <HookedModal
      title="Assign Permission"
      hookedModal={hookedModal}
      onOk={() => {
        assignPermissions({
          id: data.key,
          permissionIds: checkedKeys,
        }).then(() => {
          hookedModal.changeVisible(false);
        });
      }}
      okButtonProps={{
        loading: isLoading || listLoading,
      }}
    >
      <Spin spinning={listLoading}>
        <ScrollShadow style={{ maxHeight: 600 }}>
          <Tree
            checkable
            autoExpandParent={autoExpandParent}
            expandedKeys={expandedKeys}
            onExpand={keys => {
              setExpandedKeys(keys as number[]);
              setAutoExpandParent(false);
            }}
            onCheck={keys => setCheckedKeys(keys as number[])}
            checkedKeys={checkedKeys}
            treeData={list?.roots || []}
          />
        </ScrollShadow>
      </Spin>
    </HookedModal>
  );
};

export default memo(AssignPermission);
