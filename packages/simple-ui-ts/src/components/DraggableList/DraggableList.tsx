import { PureComponent, Fragment } from 'react';
import { Input } from 'antd';
import debounceFn from 'lodash/debounce';
import identity from 'lodash/identity';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { FixedSizeList } from 'react-window';
import EllipsisTooltip from '../EllipsisTooltip';
import ScrollShadow from '../ScrollShadow';

const { Search } = Input;

interface Props {
  dataSource?: Array<{
    key: string;
    type: string;
    label: string;
    timestamp?: string;
  }>;
  onSelect?: (item: { key: string | number; dataType: string | number | undefined } | null, def: any) => void;
  dataType?: string;
  selectedKey?: string | number | null;
  draggable?: boolean;
  search?: boolean;
  onSearch?: (text: any, item: any) => void;
  debounce?: number;
  formatTransferData?: (item: any) => void;
  itemKey?: (item: any) => void;
  searchPrefix?: string;
  maxHeight?: number;
}

interface State {
  searchText?: string;
}

class DraggableList extends PureComponent<Props, State> {
  static defaultProps = {
    onSearch: null,
    debounce: 0,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
    };
    const { debounce, search } = props;

    if (search && debounce) {
      this.handleFilter = debounceFn(this.handleFilter, debounce);
    }
  }

  handleFilter = (value: any) => {
    this.setState({
      searchText: value,
    });
  };

  handleSearch = (value: any) => {
    // clear debounce filter
    if ((this.handleFilter as any).cancel) {
      (this.handleFilter as any).cancel();
    }
    this.setState({
      searchText: value,
    });
  };

  handleChange = (event: any) => {
    const { searchText } = this.state;
    // For clear action
    if (searchText && !event.target.value) {
      // clear debounce filter
      if ((this.handleFilter as any).cancel) {
        (this.handleFilter as any).cancel();
      }
      this.setState({
        searchText: '',
      });
      return;
    }

    // debounce condition
    if ((this.handleFilter as any).cancel) {
      this.handleFilter(event.target.value);
    }
  };

  componentWillUnmount() {
    if ((this.handleFilter as any).cancel) {
      (this.handleFilter as any).cancel();
    }
  }

  selectItem(item: any) {
    const { onSelect, dataType, selectedKey, itemKey } = this.props;
    let { key } = item;
    if (itemKey) {
      key = itemKey(item);
    }
    if (selectedKey === key) {
      onSelect!(null, null);
    } else {
      onSelect!(
        {
          key,
          dataType,
        },
        item,
      );
    }
  }

  render() {
    const {
      dataSource,
      onSelect,
      dataType,
      selectedKey,
      draggable = true,
      search = false,
      onSearch,
      formatTransferData = identity,
      itemKey,
      searchPrefix = null,
      maxHeight: _maxHeight,
    } = this.props;
    const { searchText } = this.state;

    const filteredData = filter(dataSource, (item) => {
      if (onSearch) {
        return onSearch(searchText, item);
      }
      return includes(toLower(item.label), toLower(searchText));
    });

    const getRow = ({ index, style }: any) => {
      const item: any = filteredData[index];
      let { key } = item;
      if (itemKey) {
        key = itemKey(item);
      }
      const itemClass = `contract-draggable-list__item ${item.timestamp ? 'has-timestamp' : ''} ${item.type} ${
        selectedKey === key ? 'selected' : ''
      }`;
      const iconClass = `contract-draggable-list__icon ${item.type}`;
      let liProps: any = {
        className: itemClass,
        key: item.key,
        role: 'presentation',
        draggable,
      };

      // listen click event
      if (onSelect) {
        liProps.onClick = () => this.selectItem(item);
      }

      if (draggable) {
        // set transfer data
        liProps.onDragStart = (event: any) => {
          const formatData = formatTransferData({
            dataType,
            key,
          });
          // IE11 only support 'Text' format.
          event.dataTransfer.setData('Text', JSON.stringify(formatData));
        };
      }

      let timeLabel = null;
      if (item.timestamp) {
        timeLabel = <EllipsisTooltip className="contract-draggable-list__timestamp">{item.timestamp}</EllipsisTooltip>;
      }

      return (
        <div
          className="contract-draggable-list__item-container"
          style={style}
        >
          <div {...liProps}>
            <span className={iconClass} />
            <EllipsisTooltip className="contract-draggable-list__label">{item.label}</EllipsisTooltip>
            {timeLabel}
          </div>
        </div>
      );
    };

    let searchInput = null;
    if (search) {
      searchInput = (
        <Fragment>
          {searchPrefix}
          <Search
            placeholder={'Search'}
            size="small"
            onChange={this.handleChange}
            allowClear
            enterButton
            onSearch={this.handleSearch}
          />
          <div className="mb-2" />
        </Fragment>
      );
    }

    const rowHeight = 34;
    const totalHeight = filteredData.length * rowHeight;
    const maxHeight = _maxHeight || 340;
    const height = totalHeight > maxHeight ? maxHeight : totalHeight;

    return (
      <Fragment>
        {searchInput}
        <ScrollShadow>
          {({ ref, onScroll }) => {
            return (
              <FixedSizeList
                className="contract-draggable-list"
                width="100%"
                height={height}
                itemCount={filteredData.length}
                itemSize={rowHeight}
                outerRef={ref}
                onScroll={onScroll}
              >
                {getRow}
              </FixedSizeList>
            );
          }}
        </ScrollShadow>
      </Fragment>
    );
  }
}

export default DraggableList;
