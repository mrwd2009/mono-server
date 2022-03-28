import { PureComponent } from 'react';
import { Input, Tooltip, Button, InputNumber } from 'antd';
import { QuestionCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import noop from 'lodash/noop';
import trimStr from 'lodash/trim';
import omit from 'lodash/omit';
import map from 'lodash/map';
import util from '../../util';

interface Props {
  /** container class name */
  className?: string;
  /** ability to change value */
  readonly?: boolean;
  /** custom buttons */
  buttons?: Array<{
    type?: any;
    key: string;
    icon: any;
    onClick: () => void;
    title: string;
  }>;
  /** tooltip config for all buttons */
  tooltipProps?: {
    placement: string;
    autoAdjustOverflow: boolean;
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
  onChange?: (val: any) => void;
  /** input value */
  value?: string | number | null;
  /** input type text or number */
  type?: string;
  /** Whether remove prefix and suffix whitespaces. */
  trim?: boolean;
  /** allowed string length. */
  maxLength?: number;
  /** Allow click save button with empty string */
  allowSaveEmpty?: boolean;
  confirm?: boolean;
}

class ConfirmableInput extends PureComponent<Props, any> {
  static defaultProps = {
    confirm: false,
  };

  saved: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: this.getOriginalValue(),
    };
    this.saved = true;
  }

  componentDidUpdate(prevProps: Props) {
    const { value: prevValue } = prevProps;
    const { value } = this.props;
    // reset user input value after original value changed
    if (value !== prevValue) {
      this.setState({
        inputValue: this.getOriginalValue(),
      });
    }
  }

  /**
   * get user input value.
   * @return {*}
   */
  getOriginalValue() {
    const { value, type = 'text' } = this.props;
    if (type === 'number') {
      if (value === 0) {
        return value;
      }
      return value || null;
    }
    return value || '';
  }

  /**
   * update temp value.
   * @param value
   */
  handleChange = (event: any) => {
    const { type = 'text', maxLength = null } = this.props;
    this.saved = false;
    if (type === 'number') {
      this.setState({
        inputValue: event,
      });
    } else {
      let { value } = event.target;

      if (maxLength !== null && value && value.length > maxLength) {
        value = value.substring(0, maxLength);
      }
      this.setState({
        inputValue: value,
      });
    }
  };

  /**
   * cancel user modification
   */
  handleCancel = () => {
    this.setState({
      inputValue: this.getOriginalValue(),
    });
  };

  /**
   * save user change
   */
  handleSave = () => {
    const { onChange = noop, allowSaveEmpty = true, trim = false, type = 'text' } = this.props;
    let { inputValue } = this.state;

    // already saved by enter button before on blur
    if (this.saved) {
      return;
    }

    this.saved = true;
    if (this.getOriginalValue() === inputValue) {
      return;
    }
    if (!allowSaveEmpty) {
      if (type === 'text' && (!inputValue || (trim && !trimStr(inputValue)))) {
        util.showError('Value is required.');
        return;
      }

      if (type === 'number' && inputValue === null) {
        util.showError('Value is required.');
        return;
      }
    }
    // Remove prefix and suffix whitespaces before save
    if (type === 'text' && trim) {
      inputValue = trimStr(inputValue);
      this.setState({
        inputValue,
      });
    }
    onChange(inputValue);
  };

  // call by parent component to update internal temp value
  updateTempValue(value: any) {
    const { confirm } = this.props;

    this.setState(
      {
        inputValue: value,
      },
      () => {
        this.saved = false;
        if (!confirm) {
          this.handleSave();
        }
      },
    );
  }

  render() {
    let {
      title,
      label,
      help,
      buttons = [],
      required = false,
      readonly,
      className = '',
      tooltipProps,
      type = 'text',
      confirm,
      ...restProps
    } = this.props;

    restProps = omit(restProps, ['trim', 'maxLength', 'allowSaveEmpty']) as any;
    const { inputValue } = this.state;

    let helpEle = null;
    if (help) {
      helpEle = (
        <Tooltip
          {...(tooltipProps as any)}
          title={help}
        >
          <span className="help">
            <QuestionCircleOutlined />
          </span>
        </Tooltip>
      );
    }
    const extraBtns = map(buttons, (btn) => (
      <Tooltip
        {...(tooltipProps as any)}
        key={btn.key}
        title={btn.title}
      >
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

    if (confirm && this.getOriginalValue() !== inputValue) {
      confirmBtns = [
        <Tooltip
          title="Cancel"
          key="cancel"
        >
          <span onClick={this.handleCancel}>
            <CloseOutlined />
          </span>
        </Tooltip>,
        <Tooltip
          title="Save"
          key="save"
        >
          <span onClick={this.handleSave}>
            <CheckOutlined />
          </span>
        </Tooltip>,
      ];
    }

    let invalidClass = '';
    let inputContainerProps = {};

    let inputEle = null;
    let inputProps: any = {};

    if (!confirm) {
      inputProps.onBlur = this.handleSave;
    }

    if (type === 'number') {
      if (required && !inputValue && inputValue !== 0) {
        invalidClass = 'invalid';
      }
      // onPressEnter is not work
      inputEle = (
        <InputNumber
          {...restProps}
          disabled={readonly}
          size="small"
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              this.handleSave();
            }
          }}
          onFocus={() => {
            this.saved = false;
          }}
          {...inputProps}
        />
      );
    } else {
      if (required && !inputValue) {
        invalidClass = 'invalid';
      }
      inputEle = (
        <Input
          {...restProps}
          readOnly={readonly}
          size="small"
          value={inputValue}
          onChange={this.handleChange}
          onPressEnter={this.handleSave}
          onFocus={() => {
            this.saved = false;
          }}
          {...inputProps}
        />
      );
    }

    // support label title
    let labelEle = <label>{label}</label>;
    if (title) {
      labelEle = <Tooltip title={title}>{labelEle}</Tooltip>;
    }

    return (
      <div className={`contract-confirmable-input ${className}`}>
        <div className="clearfix">
          <div className="contract-confirmable-input__extra">
            {extraBtns}
            {helpEle}
          </div>
          <div className="contract-confirmable-input__content">{labelEle}</div>
        </div>
        <div className="clearfix">
          <div className="contract-confirmable-input__extra">{confirmBtns}</div>
          <div
            className={`contract-confirmable-input__content ${invalidClass}`}
            {...inputContainerProps}
          >
            {inputEle}
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmableInput;
