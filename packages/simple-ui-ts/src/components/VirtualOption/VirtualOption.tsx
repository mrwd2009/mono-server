import React, { PureComponent } from 'react';
import { VariableSizeList } from 'react-window';
import {
  Empty,
} from 'antd';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import concat from 'lodash/concat';
import noop from 'lodash/noop';
import forEach from 'lodash/forEach';
import { CheckOutlined } from '@ant-design/icons';
import util from '../../util';

interface Props {
  /** dropdown max height */
  height?: number;
  /** list item */
  dataSource?: Array<{
    id: string | number,
    tag: string,
    label:string,
    value: string | number,
  }>,
  multiple?: boolean;
  /** user selected value */
  selectedValue?: any;
  /** select callback */
  onSelect?: any;
}

class VirtualOption extends PureComponent<Props, any> {
  static checkIconHtml = `
  <i aria-label="icon: check" class="anticon anticon-check">
    <svg 
      viewBox="64 64 896 896" 
      class="" data-icon="check" 
      width="1em" 
      height="1em" 
      fill="currentColor" 
      aria-hidden="true"
    >
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 
    32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 
    50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
    </svg>
  </i>
  `;

  outerContainerRef: any;
  innerContainerRef: any;
  variableListComp: any;
  estimatedItemSize: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      realHeight: 0,
      hasScrollbar: false,
    };
    this.outerContainerRef = React.createRef();
    this.innerContainerRef = React.createRef();
    this.variableListComp = React.createRef();
    this.estimatedItemSize = 32;
  }

  componentDidMount() {
    this.updateHeight();
  }

  componentDidUpdate(prevProps: Props) {
    const {
      dataSource: prevDataSource,
    } = prevProps;
    const {
      dataSource,
    } = this.props;
    this.updateHeight();

    if (dataSource !== prevDataSource && this.variableListComp.current) {
      // if dataSource change, we need to scroll to top.
      this.variableListComp.current.scrollTo(0);
      this.variableListComp.current.resetAfterIndex(0);
    }
  }

  getItemSize = (index: any) => {
    const {
      hasScrollbar,
    } = this.state;

    return this.calculateHeight(index, hasScrollbar);
  };

  getItemElement = ({ index, style }: any) => {
    const {
      dataSource = [],
      multiple = false,
    } = this.props;
    const item = dataSource[index];

    let className = 'virtual-option-item';
    if (this.isItemSelected(item)) {
      className += ' virtual-option-item-selected';
    }
    let icon = null;
    if (multiple) {
      icon = <CheckOutlined />;
    }
    // because onClick doesn't trigger after dropdown hide
    // so we use onMouseDown there.
    return (
      <div
        style={style}
        className={className}
        onMouseDown={event => this.handleItemSelect(index, event)}
      >
        {item.tag ? <span className="tag">{item.tag}</span> : null}
        {item.label}
        {icon}
      </div>
    );
  };

  handleItemSelect = (index: any, event: any) => {
    let {
      dataSource = [],
      onSelect = noop,
      multiple = false,
      selectedValue,
    } = this.props;
    const item = dataSource[index];
    if (multiple) {
      // prevent dropdown menu hide
      event.preventDefault();
      if (includes(selectedValue, item.value)) {
        // if already selected, remove it.
        onSelect(filter(selectedValue, value => value !== item.value));
      } else {
        // otherwise add it
        // avoid undefined or null initial value
        if (selectedValue == null) {
          selectedValue = [];
        }
        onSelect(concat(selectedValue, item.value));
      }
    } else {
      onSelect(item.value);
    }
    // clear cache, because we want to update selected style.
    this.variableListComp.current.resetAfterIndex(index);
  };

  // called by parent to clear size cache and scroll to top.
  resetOption() {
    if (this.variableListComp.current) {
      this.variableListComp.current.scrollTo(0);
      this.variableListComp.current.resetAfterIndex(0);
    }
  }

  isItemSelected(item: any) {
    const {
      selectedValue,
      multiple = false,
    } = this.props;

    if (multiple) {
      return includes(selectedValue, item.value);
    }

    return selectedValue === item.value;
  }


  /**
   * Calculate each list item height
   * @param index
   * @param hasScrollbar
   * @return {number}
   */
  calculateHeight(index: any, hasScrollbar: any) {
    const {
      dataSource,
      multiple = false,
    } = this.props as any;

    if (this.innerContainerRef.current) {
      const item = dataSource[index];
      const container = this.innerContainerRef.current;
      const option = container.querySelector('.virtual-option-item-measure-placeholder');
      // add selected style
      if (this.isItemSelected(item)) {
        option.classList.add('virtual-option-item-selected');
      } else {
        option.classList.remove('virtual-option-item-selected');
      }
      // scrollbar width affect row height calculation.
      if (hasScrollbar) {
        option.style.width = `${this.outerContainerRef.offsetWidth - util.getScrollbarWidth()}px`;
      }
      const tagEle = item.tag ? `<span class='tag'>${item.tag}</span>` : '';
      const iconEle = multiple ? VirtualOption.checkIconHtml : '';
      option.innerHTML = `${tagEle}${item.label}${iconEle}`;
      return option.offsetHeight;
    }
    // default option height.
    return this.estimatedItemSize;
  }

  /**
   * Update dropdown height if provided height large than real dropdown height.
   */
  updateHeight() {
    const {
      height = 250,
      dataSource,
    } = this.props as any;
    const {
      realHeight: prevRealHeight,
    } = this.state;

    const container = this.innerContainerRef.current;
    if (container) {
      // add placholder element to calculate item height.
      if (!container.querySelector('.virtual-option-item-measure-placeholder')) {
        let measureEle = document.createElement('div');
        // IE11 classList.add only support one parameter
        measureEle.classList.add('virtual-option-item');
        measureEle.classList.add('virtual-option-item-measure-placeholder');
        container.appendChild(measureEle);
      }

      let minHeight = 0;
      let hasScrollbar = false;
      forEach(dataSource, (item, index: any) => {
        const size = this.calculateHeight(index, hasScrollbar);
        if (minHeight + size >= height) {
          minHeight = height;
          hasScrollbar = index <= dataSource.length - 1;
          return false;
        }
        minHeight += size;
        return true;
      });
      if (prevRealHeight !== minHeight) {
        // if height larger than min height, use min height as dropdown height.
        this.variableListComp.current.resetAfterIndex(0);
        this.setState({
          realHeight: minHeight,
          hasScrollbar,
        });
      }
    }
  }


  render() {
    const {
      dataSource = [],
      multiple = false,
    } = this.props;
    const {
      realHeight,
    } = this.state;

    if (!dataSource.length) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Data"
        />
      );
    }

    const className = `virtual-option-list-container ${multiple ? 'multiple' : ''}`;

    return (
      <div
        className={className}
        ref={this.outerContainerRef}
      >
        <VariableSizeList
          className="virtual-option-list"
          width="100%"
          height={realHeight}
          itemCount={dataSource.length}
          itemSize={this.getItemSize}
          ref={this.variableListComp}
          innerRef={this.innerContainerRef}
          estimatedItemSize={this.estimatedItemSize}
        >
          {this.getItemElement}
        </VariableSizeList>
      </div>
    );
  }
}

export default VirtualOption;
