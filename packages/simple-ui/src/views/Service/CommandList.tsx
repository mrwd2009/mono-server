import { memo, useState, useRef, useEffect } from 'react';
import { Input, Select, Button } from 'antd';
import filter from 'lodash/filter';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Command {
  key?: number,
  type: string,
  value: string,
}

interface Props {
  value: Array<Command>,
  onChange: (value: Array<Command>) => void,
}

const CommandList = ({ value, onChange }: Props) => {
  const idRef = useRef(1);
  const [list, setList] = useState<Array<Command>>([]);

  const listRef = useRef(list);
  listRef.current = list;
  useEffect(() => {
    if (value) {
      // if outer value is same as inner list, which means it comes from onChange callback
      if (value === listRef.current) {
        return;
      }
      // add missing key
      setList(map(value, (item) => {
        if (!item.key) {
          item.key = idRef.current++;
        }
        return item;
      }));
    }
  }, [value]);

  const addItem = () => {
    const newList = [
      ...list,
      {
        key: idRef.current++,
        type: 'bash',
        value: '',
      }
    ];
    setList(newList);
    onChange?.(newList);
  };

  const updateItem = (key: number, value: { type?: string, value?: string }) => {
    const index = findIndex(list, { key });
    list[index] = {
      ...list[index],
      ...value,
    };
    const newList = [
      ...list,
    ];
    setList(newList);
    onChange?.(newList);
  };

  const removeItem = (key: number) => {
    const newList = filter(list, item=> item.key !== key);
    setList(newList);
    onChange?.(newList);
  };
  return (
    <div>
      {
        map(list, item => {
          const addOnBefore = (
            <Select value={item.type} onChange={type => updateItem(item.key!, { type })}>
              <Option value="git-pull">Git Pull</Option>
              <Option value="bash">Bash</Option>
            </Select>
          );
          return (
            <div key={item.key} className="command-list-item">
              <Input
                className="mb-2"
                addonBefore={addOnBefore}
                value={item.value}
                onChange={event => updateItem(item.key!, { value: event.target.value })}
              />
              <Button onClick={() => removeItem(item.key!)} size="small" shape="circle" danger icon={<CloseOutlined />} />
            </div>
          );
        })
      }
      <Button type="dashed" block icon={<PlusOutlined />} onClick={addItem}>Add Command</Button>
    </div>
  );
};

export default memo(CommandList);