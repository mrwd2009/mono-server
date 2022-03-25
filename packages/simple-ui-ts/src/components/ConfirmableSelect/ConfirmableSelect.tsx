 import React, { PureComponent } from 'react';
 import copy from 'copy-to-clipboard';
 import {
   Select,
   Tooltip,
   Button,
   Spin,
 } from 'antd';
 import { CopyOutlined, QuestionCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
 import memoizeOne from 'memoize-one';
 import filter from 'lodash/filter';
 import debounce from 'lodash/debounce';
 import identity from 'lodash/identity';
 import noop from 'lodash/noop';
 import isEqual from 'lodash/isEqual';
 import find from 'lodash/find';
 import map from 'lodash/map';
 import util from '../../util';
 import VirtualOption from '../VirtualOption';
 
 interface Props {
  /** container class name */
  className?: string;
  /** ability to change value */
  readonly?: boolean;
  /** custom buttons */
  buttons?: Array<{
    type?: any;
    key: string,
    icon: any,
    onClick: any,
    title: string,
  }>;
  /** tooltip config for all buttons */
  tooltipProps?: {
    placement: string,
    autoAdjustOverflow: boolean,
  };
  /** value whether required */
  required?: boolean;
  /** control title */
  title?: string;
  /** control label */
  label?: string;
  /** help information for user */
  help?: string;
  /** change event handler after user click save button */
  onChange?: (data: any) => void;
  onUpdate?: (data: any, data2: any) => any;
  /** input value */
  value?: any;
  children?: any;
  /** option for virtual dropdown list */
  virtualOption?: {
    /** dropdown list */
    list?: any,
    /** max dropdown height */
    height?: any,
    // return list item or list item value
    selectItem?: any,
  };
  /** whether place dropdown under input */
  autoAlignDropdown?: boolean;
  /** antd select mode option */
  mode?: string;
  /** antd select dropdownRender option */
  dropdownRender?: any;
  /** to filter item label */
  filterLabel?: boolean;
  /** antd select onDropdownVisibleChange prop */
  onDropdownVisibleChange?: any;
  confirm?: boolean;
  allowClear?: boolean;
  allowCopy?: boolean;
  escapeColoredValue?: boolean;
  getPopupContainer?: any;
}
 
 class ConfirmableSelect extends PureComponent<Props, any> {
   static defaultProps = {
    confirm: false,
    allowClear: false,
    allowCopy: false,
  };

   filterLabelList = memoizeOne((dataSource, searchText) => filter(
     dataSource,
     listItem => listItem.label.toLowerCase().includes(searchText.toLowerCase()),
   ));
 
   filterDropdown = debounce((value) => {
     this.setState({
       searchText: value,
       filtering: false,
     });
   }, 500);

   selectRef: any;
   antdSelect: any;
 
   constructor(props: Props) {
     super(props);
     this.state = {
       inputValue: this.getOriginalValue(),
       searchText: '',
       filtering: false,
       selectedItem: null,
       selectTooltipVisible: false,
     };
     this.selectRef = React.createRef();
     this.antdSelect = React.createRef();
   }
 
   componentDidMount() {
     const {
       inputValue,
     } = this.state;
     this.escapeColoredStr(inputValue);
   }
 
   componentDidUpdate(prevProps: Props) {
     const {
       value: prevValue,
     } = prevProps;
     const {
       value,
     } = this.props;
     let {
       inputValue,
     } = this.state;
     // reset user input value after original value changed
     if (value !== prevValue) {
       inputValue = this.getOriginalValue();
       this.setState({
         inputValue,
       });
     }
     this.escapeColoredStr(inputValue);
   }
 
   /**
    * get user input value.
    * @return {*}
    */
   getOriginalValue() {
     const {
       value,
       mode,
     } = this.props;
     if (mode) {
       return value || [];
     }
     return value || '';
   }
 
   handleSearch = (value: any) => {
     this.setState({
       filtering: true,
     });
     this.filterDropdown(value);
   };
 
   /**
    * update temp value.
    * @param value
    */
   handleChange = (value: any) => {
     const {
       onUpdate = identity,
       confirm,
     } = this.props;
     const {
       inputValue,
     } = this.state;
     const updatedVal = onUpdate(value, inputValue) || '';
     this.updateSelectedItem(updatedVal);
     this.setState({
       inputValue: updatedVal,
     }, () => {
       if (!confirm) {
         this.handleSave();
       }
     });
   };
 
   handleDropdownVisible = (open: any) => {
     const {
       onDropdownVisibleChange = noop,
     } = this.props;
     this.setState({
       filtering: false,
     });
     this.filterDropdown.cancel();
     onDropdownVisibleChange(open);
     if (!open) {
       // to avoid dropdown option flash(open then close)
       setTimeout(() => {
         this.setState({
           searchText: '',
         });
       });
     }
   };
 
   /**
    * cancel user modification
    */
   handleCancel = () => {
     this.setState({
       inputValue: this.getOriginalValue(),
       selectedItem: null,
     });
   };
 
   /**
    * save user change
    */
   handleSave = () => {
     const {
       onChange = noop,
       virtualOption,
     } = this.props;
     const {
       inputValue,
       selectedItem,
     } = this.state;
 
     if (isEqual(this.getOriginalValue(), inputValue)) {
       return;
     }
 
     if (virtualOption && virtualOption.selectItem) {
       onChange(selectedItem);
       return;
     }
     onChange(inputValue);
   };
 
   /**
    * get dropdown element for virtual list.
    * @param item
    * @return {*}
    */
   getDropdownRender = (item: any) => {
     const {
       dropdownRender = identity,
       virtualOption: {
         list,
         height,
       },
       filterLabel = false,
     } = this.props as any;
     const {
       inputValue,
       searchText,
       filtering,
     } = this.state;
     if (filtering) {
       // because rc-select call this.forcePopupAlign with each user input character
       // if our dropdown element too complicated, a performance problem will raise
       // so we insert a simple Spin there for rc-trigger -> dom-align
       // to calculate dropdown position.
       return (
         <div className="text-center p-4">
           <Spin tip="Searching" />
         </div>
       );
     }
     let filteredList = list;
     if (filterLabel) {
       // add logic to filter item label
       filteredList = this.filterLabelList(list, searchText);
     }
 
     if (filteredList.length) {
       return dropdownRender(
         <VirtualOption
           selectedValue={inputValue}
           onSelect={this.handleChange}
           dataSource={filteredList}
           height={height}
         />,
       );
     }
     return dropdownRender(item);
   };
 
   handleSTVisibleChange = (visible: any) => {
     if (visible) {
       const valueEle = this.selectRef.current.querySelector('.ant-select-selection-selected-value');
       if (valueEle && valueEle.scrollWidth > valueEle.offsetWidth) {
         this.setState({
           selectTooltipVisible: true,
         });
         return;
       }
     }
     this.setState({
       selectTooltipVisible: false,
     });
   }
 
   escapeColoredStr(inputValue: any) {
    //  const {
    //    mode,
    //    escapeColoredValue = false,
    //  } = this.props;
    //  // only single selection and has ref
    //  if (this.antdSelect.current && !mode && escapeColoredValue) {
    //    // Not change for empty value
    //    if (!inputValue) {
    //      return;
    //    }
    //    const rendered = this.antdSelect.current.rcSelect.topCtrlRef;
    //    if (rendered) {
    //      const valueEle = rendered.querySelector('.ant-select-selection-selected-value');
    //      if (valueEle) {
    //        valueEle.setAttribute('title', '');
    //        valueEle.innerHTML = htmlFromANSIColor(inputValue);
    //      }
    //    }
    //  }
   }
 
   /**
    * record selected virtual list item.
    * @param value
    */
   updateSelectedItem(value: any) {
     const {
       virtualOption,
     } = this.props;
     if (virtualOption) {
       const {
         list,
         selectItem = false,
       } = virtualOption;
       if (!selectItem) {
         return;
       }
       const target = find(list, item => item.value === value);
       this.setState({
         selectedItem: target,
       });
     }
   }
 
   render() {
     let {
       className = '',
       title,
       label,
       help,
       buttons = [],
       required = false,
       children,
       readonly = false,
       tooltipProps,
       mode,
       virtualOption,
       autoAlignDropdown = false,
       filterLabel = false,
       confirm,
       allowClear,
       allowCopy,
       ...restProps
     } = this.props;
     const {
       inputValue,
       selectTooltipVisible,
     } = this.state;
     let copyEle = null;
     if (allowCopy && inputValue) {
       copyEle = (
         <Tooltip {...tooltipProps as any} title="Copy">
           <span
             className="copy"
             onClick={() => {
               if (inputValue) {
                 copy(inputValue);
                 util.showSuccess('Copied');
               }
             }}
           >
             <CopyOutlined />
           </span>
         </Tooltip>
       );
     }
 
     let helpEle = null;
     if (help) {
       helpEle = (
         <Tooltip {...tooltipProps as any} title={help}>
           <span className="help"><QuestionCircleOutlined /></span>
         </Tooltip>
       );
     }
     const extraBtns = map(buttons, btn => (
       <Tooltip {...tooltipProps as any} key={btn.key} title={btn.title}>
         <Button
           shape="circle"
           size="small"
           icon={btn.icon}
           onClick={btn.onClick}
           type={btn.type}
         />
       </Tooltip>
     ));
 
     let confirmBtns: any = [];
     // input value is string or array of string
     if (confirm && !isEqual(this.getOriginalValue(), inputValue)) {
       confirmBtns = [
         <Tooltip title="Cancel" key="cancel">
           <span onClick={this.handleCancel}>
             <CloseOutlined />
           </span>
         </Tooltip>,
         <Tooltip title="Save" key="save">
           <span onClick={this.handleSave}>
             <CheckOutlined />
           </span>
         </Tooltip>,
       ];
     }
 
     let invalidClass = '';
     // input value is empty string or empty array.
     if (required) {
       if (mode) {
         if (!inputValue.length) {
           invalidClass = 'invalid';
         }
       } else if (!inputValue) {
         invalidClass = 'invalid';
       }
     }
     // used to create virtual options.
     if (virtualOption) {
       restProps.dropdownRender = this.getDropdownRender;
       if (filterLabel) {
         (restProps as any).onSearch = this.handleSearch;
         restProps.onDropdownVisibleChange = this.handleDropdownVisible;
       }
     }
 
     // whether auto align dropdown
     if (!autoAlignDropdown) {
       (restProps as any).dropdownAlign = {
         overflow: {
           adjustX: false,
           adjustY: false,
         },
       };
     }
 
     // support label title
     let labelEle = <label>{label}</label>;
     if (title) {
       labelEle = <Tooltip title={title}>{labelEle}</Tooltip>;
     }
 
     return (
       <div className={`contract-confirmable-select ${className}`}>
         <div className="clearfix">
           <div className="contract-confirmable-select__extra">
             {extraBtns}
             {copyEle}
             {helpEle}
           </div>
           <div className="contract-confirmable-select__content">
             {labelEle}
           </div>
         </div>
         <div className="clearfix">
           <div className="contract-confirmable-select__extra">
             {confirmBtns}
           </div>
           <div
             className={`contract-confirmable-select__content ${invalidClass} ${inputValue ? 'has-value' : 'empty'}`}
             ref={this.selectRef}
           >
             <Tooltip
               title={inputValue}
               onVisibleChange={this.handleSTVisibleChange}
               visible={selectTooltipVisible}
             >
               <Select
                 {...restProps}
                 showSearch
                 size="small"
                 value={inputValue}
                 onChange={this.handleChange}
                 allowClear={allowClear}
                 disabled={readonly}
                 mode={mode as any}
                 ref={this.antdSelect}
               >
                 {children}
               </Select>
             </Tooltip>
           </div>
         </div>
       </div>
     );
   }
 }
 
 export default ConfirmableSelect;
 