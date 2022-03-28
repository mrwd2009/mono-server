import { PureComponent } from 'react';
import { Checkbox, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import noop from 'lodash/noop';
import map from 'lodash/map';

interface Props {
  /** container class name */
  className?: string;
  /** ability to change value */
  readonly?: boolean;
  /** custom buttons */
  buttons?: Array<{
    type: any;
    key: string;
    icon: any;
    onClick: any;
    title: string;
  }>;
  /** tooltip config for all buttons */
  tooltipProps?: {
    placement: string;
    autoAdjustOverflow: boolean;
  };
  /** help information for user */
  help?: string;
  /** change event handler after user click save button */
  onChange?: any;
  /** input value */
  value?: any;
  children?: any;
  confirm?: boolean;
}

class ConfirmableCheckbox extends PureComponent<Props, any> {
  static defaultProps = {
    confirm: false,
  };

  constructor(props: Props) {
    super(props);
    const { value } = props;
    this.state = {
      inputValue: value,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { value: prevValue } = prevProps;
    const { value } = this.props;
    // reset user input value after original value changed
    if (value !== prevValue) {
      this.setState({
        inputValue: value,
      });
    }
  }

  /**
   * Update temp change
   * @param event
   */
  handleChange = (event: any) => {
    const { confirm } = this.props;
    this.setState(
      {
        inputValue: event.target.checked,
      },
      () => {
        if (!confirm) {
          this.handleSave();
        }
      },
    );
  };

  /**
   * Cancel user change
   */
  handleCancel = () => {
    const { value } = this.props;
    this.setState({
      inputValue: value,
    });
  };

  /**
   * Save user change
   */
  handleSave = () => {
    const { onChange = noop, value } = this.props;
    const { inputValue } = this.state;
    if (value === inputValue) {
      return;
    }
    onChange(inputValue);
  };

  render() {
    const {
      children,
      value,
      help,
      buttons = [],
      readonly,
      className = '',
      tooltipProps,
      confirm,
      ...restProps
    } = this.props;
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
    if (confirm && value !== inputValue) {
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

    return (
      <div className={`contract-confirmable-checkbox ${className}`}>
        <div className="clearfix">
          <div className="contract-confirmable-checkbox__extra">
            {extraBtns}
            {helpEle}
          </div>
        </div>
        <div className="clearfix">
          <div className="contract-confirmable-checkbox__extra">{confirmBtns}</div>
          <div className="contract-confirmable-checkbox__content">
            <Checkbox
              {...restProps}
              disabled={readonly}
              checked={inputValue}
              onChange={this.handleChange}
            >
              {children}
            </Checkbox>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmableCheckbox;
