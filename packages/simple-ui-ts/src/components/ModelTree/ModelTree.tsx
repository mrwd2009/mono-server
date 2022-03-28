import React, { PureComponent, ReactNode } from 'react';
import { Tooltip, Dropdown, Menu, Input, Button } from 'antd';
import { DownOutlined, UpOutlined, CloseOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { hierarchy, tree } from 'd3-hierarchy';
import { select } from 'd3-selection';
import { linkHorizontal } from 'd3-shape';
import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { drag } from 'd3-drag';
import 'd3-transition';
import assign from 'lodash/assign';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import map from 'lodash/map';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import isNaN from 'lodash/isNaN';
import toNumber from 'lodash/toNumber';
import forEach from 'lodash/forEach';
import slice from 'lodash/slice';
import maxBy from 'lodash/maxBy';
import util from '../../util';
import { ReactComponent as ContractImg } from '../../assets/images/contract/contract.svg';
import { ReactComponent as GroupImg } from '../../assets/images/contract/group.svg';
import { ReactComponent as ChargeImg } from '../../assets/images/contract/charge.svg';

const { Item } = Menu;

const returnTrue = () => true;

interface Node {
  id: string | number;
  name: string;
  type: string;
  hidden: boolean | number;
  conditional?: boolean;
  draggable?: boolean;
  children: Node[];
}

interface Props {
  dataSource?: Node | null;
  contextMenus?: Array<{
    key: string;
    label: string;
    onClick: (node: any) => void;
    disabled: (data: any) => boolean;
  }>;
  showInternalMenu?: boolean;
  internalMenuStatus?: {
    cutDisabled?: (data: any) => boolean;
    pasteDisabled?: (data: any, extra: any) => boolean;
  };
  height?: number | string;
  width?: number | string;
  minHeight?: number | string;
  defaultOptions?: {
    hasConditionalLink: boolean;
    hasContextMenu: boolean;
    hasRerouteNode: boolean;
  };
  /** Callback for reparent and drop. */
  onDrop?: (event: any) => void | Promise<void>;
  /** Callback for select node. */
  onSelect?: (event: any) => void;
  /** Callback for select node link. */
  onSelectLink?: (event: any) => void;
  /** Function to get node key. */
  nodeKey?: (event: any) => void;
  /** determine whether display node and related link. */
  nodeVisible?: (event: any) => boolean;
  /** add custom class like { 'class a': function } */
  nodeClasses?: any;
  /** Selected node key. */
  selectedKey?: number | string | null;
  /** Node which is displayed on page center at beginning. */
  defaultCenteredKey?: number;
  /** Readonly status. */
  readonly?: boolean;
  /** Only show empty tree, accept external drop. */
  placeholderMode?: boolean;
  /** Add custom toolbar button at top right corner. */
  toolbar?: Array<{
    key: string;
    icon?: ReactNode;
    onClick?: (event: any) => void;
    title: string;
  }>;
  className?: string;
}

class ModelTree extends PureComponent<Props, any> {
  static defaultProps = {
    toolbar: [],
  };

  defaultOptions: any;
  svgRef: any;
  searchInputRef: any;
  root: any;
  nodes: any;
  links: any;
  zoom: any;
  drag: any;
  classMap: any;
  defsIDMap: any;
  nodeTypeMap: any;
  imageMap: any;
  sizeMap: any;
  transition: any;
  extent: any;
  startDrag: any;
  searchText: any;
  searchNodes: any;
  searchCursor: any;
  dragStartPos: any;
  dragDistance: any;
  clickDistance: any;
  dragenterCount: any;
  defaultCenteredTimer: any;

  uidStart = 1;

  constructor(props: Props) {
    super(props);
    const { defaultOptions } = props;
    this.defaultOptions = assign(
      {
        // Remove hover style and click logic, if tree don't have conditional link.
        hasConditionalLink: false,
        // Remove unused contextmenu event, if tree don't need any menu.
        hasContextMenu: true,
        // Remove unused circle element, if tree don't have reroute node.
        hasRerouteNode: true,
      },
      defaultOptions,
    );
    // svg element
    this.svgRef = React.createRef();
    // input element for search function.
    this.searchInputRef = React.createRef();
    // root node return from d3.tree.
    this.root = null;
    // tree nodes
    this.nodes = null;
    // tree links
    this.links = null;
    // translate and scale behavior.
    this.zoom = null;
    // drag behavior.
    this.drag = null;
    // class contants for current component.
    this.classMap = {
      containerClass: 'model-tree-container',
      linkContainerClass: 'model-tree-link-container',
      nodeContainerClass: 'model-tree-node-container',
      selectedClass: 'selected',
      draggingClass: 'dragging',
      zoomingClass: 'zooming',
      draggedClass: 'dragged',
      dropWantedClass: 'drop-wanted',
      hasConditionClass: 'has-condition',
      nodeClass: 'model-tree-node',
      hiddenNodeClass: 'model-tree-node--hidden',
      rerouteNodeClass: 'model-tree-node--reroute',
      cutNodeClass: 'model-tree-node--cut',
      searchNodeClass: 'model-tree-node--search',
      nodeBgClass: 'model-tree-node__bg',
      nodeImageClass: 'model-tree-node__image',
      nodeTextClass: 'model-tree-node__text',
      nodeCircleClass: 'model-tree-node__circle',
      linkClass: 'model-tree-link',
      toolbarClass: 'model-tree-toolbar',
      searchClass: 'model-tree-search',
    };
    // svg element id constants
    this.defsIDMap = {
      // different model tree can't use same id.
      imageClipID: uniqueId('model-tree-image__clip-path'),
    };
    // all node types
    this.nodeTypeMap = {
      root: 'root',
      umcRoot: 'umcRoot',
      pccRoot: 'pccRoot',
      umcSubContractRoot: 'umcSubContractRoot',
      pccSubContractRoot: 'pccSubContractRoot',
      umcChargeRoot: 'umcChargeRoot',
      pccChargeRoot: 'pccChargeRoot',
      subContract: 'subContract',
      reroute: 'reroute',
      charge: 'charge',
    };
    const contractImg = uniqueId('model-tree-contract');
    const groupImg = uniqueId('model-tree-group-group');
    const chargeImg = uniqueId('model-tree-group-charge');
    // image path for all node types.
    this.imageMap = {
      root: contractImg,
      subContract: groupImg,
      charge: chargeImg,
      pccRoot: contractImg,
      pccSubContractRoot: groupImg,
      pccChargeRoot: chargeImg,
      umcRoot: contractImg,
      umcSubContractRoot: groupImg,
      umcChargeRoot: chargeImg,
      rule: chargeImg,
    };
    // current component used size information.
    this.sizeMap = {
      svg: {
        width: '100%', // svg width.
        height: '600', // svg height.
      },
      node: {
        width: 120, // tree node width.
        height: 24, // tree node height.
      },
      image: {
        x: 3, // image element x coordinate.
        y: 3, // image element y coordinate.
        width: 18, // image height.
        height: 18, // image width.
      },
      text: {
        x: 24, // text x coordinate.
        y: 12, // text y coordinate.
        width: 95, // text max width.
      },
      borderRadius: 4, // border radius for node and image.
      link: {
        x: 40, // link x coordinate.
        y: 12, // link y coordinate.
      },
      nodeGap: {
        x: 16, // node horizontal gap size.
        y: 8, // node vertical gap size.
      },
      treeOffset: {
        x: 20, // tree margin left.
        y: 20, // tree margin top.
      },
      searchResultOffset: {
        y: 100, // searched node margin top.
      },
    };
    this.transition = {
      duration: 500, // transition duration ms.
    };
    this.extent = {
      scale: [0.4, 1.8], // tree scale extent.
    };
    // indicate user start drag node.
    this.startDrag = false;

    this.state = {
      tooltip: '', // tooltip content.
      tooltipVisible: false, // control tooltip visible.
      tooltipAlign: {}, // tooltip position offset.
      menuVisible: false, // control context menu visible.
      searchVisible: false, // control search input visible.
      resetVisible: false, // control reset button visible.
      cutNode: null, // node for paste menu.
      contextNode: null, // node which trigger context menu.
    };

    this.searchText = ''; // text to search node.
    this.searchNodes = []; // all searched nodes.
    this.searchCursor = -1; // current searched node index.
    // to prevent d3 drag after user select node.
    this.dragStartPos = {};
    this.dragDistance = 2;

    // prevent click after user drag distance larger than follow value.
    this.clickDistance = 2;

    // used to accumulate native dragenter and dragleave count.
    this.dragenterCount = 0;

    // timer to make default selected node centered
    this.defaultCenteredTimer = null;
  }

  componentDidMount() {
    this.addEssentialElement();
    this.addZoomListener();
    this.setupDrag();
    this.updateModelTreeState();
    this.renderModelTree();

    const { defaultCenteredKey } = this.props;
    const { duration } = this.transition;
    if (defaultCenteredKey) {
      // wait node animation stopped, then change target node position into center.
      this.defaultCenteredTimer = setTimeout(() => {
        this.defaultCenteredTimer = null;
        // Because search function support filtering by node key.
        this.searchText = `${defaultCenteredKey}`;
        this.openSearch();
        // Not display unmatched message.
        this.searchAndScrollNode('down', false);
      }, duration);
    }
  }

  componentWillUnmount() {
    if (this.defaultCenteredTimer) {
      // avoid function to execute after component destroy.
      clearTimeout(this.defaultCenteredTimer);
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { dataSource: prevDataSource, selectedKey: prevSelectedKey } = prevProps;
    const { searchVisible: prevSearchVisible } = prevState;

    const { dataSource, selectedKey } = this.props;
    const { searchVisible } = this.state;
    // focus search input after input display.
    if (searchVisible && searchVisible !== prevSearchVisible && this.searchInputRef.current) {
      this.searchInputRef.current.focus();
    }
    // render tree after dataSource update.
    if (dataSource !== prevDataSource) {
      const prevRoot = this.root;
      this.updateModelTreeState();
      const currentRoot = this.root;
      if (prevRoot && currentRoot && this.getNodeKey(prevRoot) === this.getNodeKey(currentRoot)) {
        // if refresh same model tree, don't reset
        this.renderModelTree(false);
      } else {
        this.renderModelTree();
      }
    }
    // update selected tree node after selectedKey change.
    if (prevSelectedKey !== selectedKey) {
      this.updateSelectedNode();
      this.updateSelectedLink();
    }
  }

  /**
   * Add draggingClass from container(g) element.
   */
  addDraggingClass() {
    const { draggingClass, containerClass } = this.classMap;
    const svg = select(this.svgRef.current);
    svg.select(`.${containerClass}`).classed(draggingClass, true);
  }

  /**
   * Remove draggingClass from container(g) element.
   */
  removeDraggingClass() {
    const { draggingClass, containerClass } = this.classMap;
    const svg = select(this.svgRef.current);
    svg.select(`.${containerClass}`).classed(draggingClass, false);
  }

  /**
   * Remove dropWantedClass from tree node.
   */
  removeDropWantedClass() {
    const { dropWantedClass, nodeClass } = this.classMap;
    const svg = select(this.svgRef.current);
    svg.selectAll(`.${nodeClass}.${dropWantedClass}`).classed(dropWantedClass, false);
  }

  /**
   * svg dragener event.
   */
  handleNativeDragEnter = () => {
    this.dragenterCount += 1;
    this.addDraggingClass();
  };

  /**
   * svg dragleave event.
   * @param {Event} nativeEvent native dragleave event.
   */
  handleNativeDragLeave = () => {
    // reference https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
    // because IE11 event don't have 'relatedTarget', we can't check children.
    this.dragenterCount -= 1;
    if (this.dragenterCount <= 0) {
      this.dragenterCount = 0;
      this.removeDraggingClass();
      this.removeDropWantedClass();
    }
  };

  /**
   * svg dragover event.
   * @param {Event} nativeEvent native dragover event.
   */
  handleNativeDragOver = (nativeEvent: any) => {
    const { nodeClass, dropWantedClass } = this.classMap;
    const { target } = nativeEvent;
    const $target = select(target);
    const $parent = select(target.parentNode);
    // if dragover event trigger on tree node or tree node children.
    if ($target.classed(nodeClass) || $parent.classed(nodeClass)) {
      // if target tree node don't have dropWantedClass, add it.
      if (!$target.classed(dropWantedClass) && !$parent.classed(dropWantedClass)) {
        this.removeDropWantedClass();
        if ($target.classed(nodeClass)) {
          $target.classed(dropWantedClass, true);
        } else {
          $parent.classed(dropWantedClass, true);
        }
      }
    } else {
      this.removeDropWantedClass();
    }
    // calling preventDefault function means dragover event is accepted.
    nativeEvent.preventDefault();
  };

  /**
   * svg dragend event.
   * @param {Event} nativeEvent native dragend event.
   */
  handleNativeDrop = (nativeEvent: any) => {
    const { nodeClass } = this.classMap;
    const { onDrop } = this.props;
    this.removeDraggingClass();
    this.removeDropWantedClass();
    // we assume received 'Text' data format is valid.
    // IE11 only support 'Text' format.
    let source = nativeEvent.dataTransfer.getData('Text');

    if (!source) {
      // Not an accepted drag operation.
      return;
    }

    try {
      source = JSON.parse(source);
    } catch (error) {
      // catch invalid json, return directly.
      return;
    }

    let data = null;
    const { target } = nativeEvent;
    const $target = select(target);
    // target is node.
    if ($target.classed(nodeClass) || select(target.parentNode).classed(nodeClass)) {
      data = $target.datum();
    }

    if (onDrop) {
      const result = onDrop({
        type: 'external',
        source,
        target: data,
      });
      // onDrop maybe asynchronous
      if (result && result.catch) {
        // avoid uncaught error.
        result.catch(noop);
      }
    }
  };

  /**
   * Get tree toolbar element.
   */
  generateToolbar() {
    const { toolbar } = this.props;
    const { resetVisible } = this.state;
    let resetButton = null;

    if (resetVisible) {
      resetButton = (
        <Tooltip title="Reset Position">
          <Button
            icon={<ReloadOutlined />}
            size="small"
            onClick={() => this.resetZoom()}
          />
        </Tooltip>
      );
    }

    return (
      <div className="model-tree-toolbar">
        {this.generateSearchElement()}
        {resetButton}
        {map(toolbar, (item) => (
          <Tooltip
            title={item.title}
            key={item.key}
          >
            <Button
              icon={item.icon}
              size="small"
              onClick={item.onClick}
            />
          </Tooltip>
        ))}
      </div>
    );
  }

  /**
   * Get search element.
   */
  generateSearchElement() {
    const { searchVisible } = this.state;
    const { searchClass } = this.classMap;
    if (!searchVisible) {
      return (
        <Tooltip title="Search">
          <Button
            icon={<SearchOutlined />}
            size="small"
            onClick={this.openSearch}
          />
        </Tooltip>
      );
    }
    const addons = [
      <DownOutlined
        key="down"
        onClick={this.searchNext}
      />,
      <UpOutlined
        key="up"
        onClick={this.searchPrevious}
      />,
      <CloseOutlined
        key="close"
        onClick={this.closeSearch}
      />,
    ];
    return (
      <Input
        placeholder="Search"
        className={searchClass}
        size="small"
        addonAfter={addons}
        allowClear
        defaultValue={this.searchText}
        onPressEnter={this.searchNext}
        onChange={this.handleSearchChange}
        ref={this.searchInputRef}
      />
    );
  }

  /**
   * toggle search input visible.
   * @param {Event} nativeEvent change event.
   */
  handleSearchChange = (nativeEvent: any) => {
    this.searchText = nativeEvent.target.value;
    this.searchCursor = -1;
    this.searchNodes = [];
  };

  /**
   * Highlight searched node.
   * @param {string} direction 'up' or 'down' search direction.
   */
  searchAndScrollNode(direction: any, warning = true) {
    const { nodeClass, searchNodeClass } = this.classMap;
    const { duration } = this.transition;
    const { node: nodeSize, treeOffset, searchResultOffset } = this.sizeMap;
    const nodes = this.getSearchNodes();
    const svg = select(this.svgRef.current);
    // clear searched node class.
    svg.selectAll(`.${searchNodeClass}`).classed(searchNodeClass, false);

    if (nodes.length) {
      // initial search, focus first found node.
      if (this.searchCursor === -1) {
        this.searchCursor = 0;
      } else {
        // search previous node.
        if (direction === 'up') {
          this.searchCursor -= 1;
        } else {
          // search next node.
          this.searchCursor += 1;
        }
        // if we can't find previous node, point to last one.
        if (this.searchCursor < 0) {
          this.searchCursor = nodes.length - 1;
        } else if (this.searchCursor >= nodes.length) {
          // otherwise point to first one.
          this.searchCursor = 0;
        }
      }

      const currentNode = nodes[this.searchCursor];
      // add style to filtered node.
      const currentNodeEle = svg
        .selectAll(`.${nodeClass}`)
        .filter((data: any) => data.data.id === currentNode.data.id)
        .classed(searchNodeClass, true);
      // filtered node translate attribute.
      const nodePos = util.getTranslateAttr(currentNodeEle.node() as any);
      // svg element transform information.
      const transform = zoomTransform(svg.node());

      // get node coordinate on svg coordinate system
      const nodeViewportPos = {
        x: transform.x + (nodePos.x + nodeSize.width / 2 - treeOffset.y) * transform.k + treeOffset.y,
        y: transform.y + (nodePos.y - treeOffset.x) * transform.k + treeOffset.x,
      };
      const svgRect = svg.node().getBoundingClientRect();
      // target position that node need to move.
      const targetPos = {
        x: svgRect.width / 2,
        y: searchResultOffset.y,
      };

      // offset from node current position to target position.
      const xOffset = targetPos.x - nodeViewportPos.x;
      const yOffset = targetPos.y - nodeViewportPos.y;

      // svg transform information if we want to move node to target position.
      const newTransform = zoomIdentity.translate(transform.x + xOffset, transform.y + yOffset).scale(transform.k);

      svg
        .transition()
        .duration(duration / 2)
        .call(this.zoom.transform, newTransform);
    }
    // if we can't find any matched node, show an alert message.
    if (this.searchText && !nodes.length && warning) {
      util.showWarning(`Unable to find "${this.searchText}".`);
    }
  }

  /**
   * Get matched nodes.
   */
  getSearchNodes() {
    if (!this.searchText) {
      return [];
    }
    if (!this.searchNodes.length) {
      const { reroute } = this.nodeTypeMap;
      this.searchNodes = filter(this.nodes, (node) => {
        // reroute node don't have name
        if (node.data.type === reroute) {
          return false;
        }
        const name = (node.data && node.data.name) || '';
        // search text match contract body name
        if (includes(name.toLowerCase(), this.searchText.toLowerCase())) {
          return true;
        }
        // search text match contract body id.
        const bodyID = toNumber(this.searchText);
        if (!isNaN(bodyID)) {
          return this.getNodeKey(node) === bodyID;
        }

        return false;
      });
    }

    return this.searchNodes;
  }

  /**
   * Highlight next matched node.
   */
  searchNext = () => this.searchAndScrollNode('down');

  /**
   * Highlight previous matched node.
   */
  searchPrevious = () => this.searchAndScrollNode('up');

  /**
   * Display search input.
   */
  openSearch = () => {
    this.setState({
      searchVisible: true,
    });
  };

  /**
   * Hide search input.
   */
  closeSearch = () => {
    // clear search text.
    this.handleSearchChange({
      target: {
        value: '',
      },
    });
    // clear matched style.
    this.clearSearchedNode();
    this.setState({
      searchVisible: false,
    });
  };

  /**
   * Clear matched node style.
   */
  clearSearchedNode() {
    const { searchNodeClass } = this.classMap;
    this.searchNodes = [];
    this.searchCursor = -1;
    select(this.svgRef.current).selectAll(`.${searchNodeClass}`).classed(searchNodeClass, false);
  }

  /**
   * Get context menu item.
   */
  generateContextMenu() {
    const { contextNode } = this.state;
    const { contextMenus = [], showInternalMenu = true } = this.props;

    // custom menu
    let disabled;
    const extraMenus = map(contextMenus, (menu: any) => {
      disabled = false;
      if (menu.disabled) {
        disabled = menu.disabled(contextNode);
      }
      return (
        <Item
          key={menu.key}
          onClick={() => menu.onClick(contextNode)}
          disabled={disabled}
        >
          {menu.label}
        </Item>
      );
    });

    let internalMenus: any = [];

    if (showInternalMenu) {
      // internal cut and paste menu.
      internalMenus = [
        <Item
          key="model-tree-cut"
          disabled={this.isCutDisabled()}
          onClick={this.handleCutMenu}
        >
          Cut
        </Item>,
        <Item
          key="model-tree-paste"
          disabled={this.isPasteDisabled()}
          onClick={this.handlePasteMenu}
        >
          Paste
        </Item>,
      ];
    }

    return (
      <Menu onClick={this.hideMenu}>
        {internalMenus}
        {extraMenus}
      </Menu>
    );
  }

  /**
   * Check cut menu disabled status.
   * @return {boolean}
   */
  isCutDisabled = () => {
    const { internalMenuStatus = {} } = this.props;
    const { contextNode } = this.state;

    const { cutDisabled } = internalMenuStatus;

    if (cutDisabled && contextNode) {
      return cutDisabled(contextNode);
    }
    return false;
  };

  /**
   * Cut menu handler.
   */
  handleCutMenu = () => {
    const { contextNode, cutNode } = this.state;
    if (contextNode !== cutNode) {
      this.setState({
        cutNode: contextNode,
      });
      this.markCutDescendants(contextNode);
    }
  };

  /**
   * Add style to cut nodes.
   */
  markCutDescendants(node: any) {
    let ids: any = [];
    forEach(node.descendants(), (child) => {
      ids.push(child.data.id);
    });
    const { nodeClass, cutNodeClass } = this.classMap;
    const nodeElements = select(this.svgRef.current).selectAll(`.${nodeClass}`);

    this.removeNodeCutMarks();
    nodeElements.filter((data: any) => includes(ids, data.data.id)).classed(cutNodeClass, true);
  }

  /**
   * Remove style on cut nodes.
   */
  removeNodeCutMarks() {
    const { cutNodeClass } = this.classMap;
    const svg = select(this.svgRef.current);
    svg.selectAll(`.${cutNodeClass}`).classed(cutNodeClass, false);
  }

  /**
   * Clear cut node.
   */
  clearCutNode() {
    const { cutNode } = this.state;

    if (cutNode) {
      this.setState({
        cutNode: null,
      });
      this.removeNodeCutMarks();
    }
  }

  /**
   * Check paste menu disabled status.
   */
  isPasteDisabled = () => {
    const { internalMenuStatus = {} } = this.props;
    const { cutNode, contextNode } = this.state;

    const { pasteDisabled } = internalMenuStatus;

    if (pasteDisabled && cutNode && contextNode) {
      return pasteDisabled(cutNode, contextNode);
    }

    if (cutNode && contextNode) {
      return includes(cutNode.descendants(), contextNode);
    }

    return true;
  };

  /**
   * Paste menu handler.
   */
  handlePasteMenu = () => {
    this.clearCutNode();
    const { onDrop } = this.props;
    const { cutNode, contextNode } = this.state;
    if (onDrop) {
      const result = onDrop({
        type: 'internal',
        source: cutNode,
        target: contextNode,
      });
      if (result && result.catch) {
        result.catch(noop);
      }
    }
  };

  /**
   * onVisibleChange handler for context menu.
   * @param {boolean} visible
   */
  handleMenuVisible = (visible: boolean) => {
    if (!visible) {
      // hidden menu when user scroll page
      this.hideMenu();
    }
  };

  /**
   * hide context menu.
   */
  hideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  /**
   * hide context menu and node tooltip.
   */
  hideMenuAndTooltip() {
    this.setState({
      tooltipVisible: false,
      menuVisible: false,
    });
  }

  /**
   * Add link and node container;Add image clipPath.
   */
  addEssentialElement() {
    const svg = select(this.svgRef.current);
    const { containerClass, linkContainerClass, nodeContainerClass } = this.classMap;
    const { imageClipID } = this.defsIDMap;
    const { image, borderRadius } = this.sizeMap;
    // clipPath, in order to add border radius for image.
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', imageClipID)
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', image.width)
      .attr('height', image.height)
      .attr('rx', borderRadius)
      .attr('ry', borderRadius);
    // container for links and nodes.
    const container = svg.append('g').classed(containerClass, true);
    // container for links.
    container.append('g').classed(linkContainerClass, true);
    // container for nodes.
    container.append('g').classed(nodeContainerClass, true);
  }

  /**
   * Initialize zoom behavior for tree.
   */
  addZoomListener() {
    const { placeholderMode = false } = this.props;
    // only show an empty tree.
    if (placeholderMode) {
      return;
    }
    const { scale } = this.extent;
    const { containerClass, zoomingClass } = this.classMap;
    const svg = select(this.svgRef.current);
    const container = svg.select(`.${containerClass}`);
    const zoomBehavior = zoom()
      .scaleExtent(scale)
      .on('zoom', (event) => {
        const transform = event.transform.toString();
        container.attr('transform', transform);
        // hide tooltip and context menu during zooming
        this.hideMenuAndTooltip();
        // update reset button visible status.
        this.setState({
          resetVisible: transform !== zoomIdentity.toString(),
        });
      })
      .on('start', (event) => {
        // because during scaling svg text element layout will cost much time
        // so we hide the text element during zooming.
        // On the other hand, we can also solve this problem by change font-family of text
        // But we can't confirm same font-family can work at different browser.
        if (event.sourceEvent && event.sourceEvent.type === 'mousedown') {
          container.classed(zoomingClass, false);
        } else {
          container.classed(zoomingClass, true);
        }
      })
      .on('end', (event) => {
        container.classed(zoomingClass, false);
      });
    svg.call(zoomBehavior).on('dblclick.zoom', null); // remove double click scale behavior.
    this.zoom = zoomBehavior;
  }

  /**
   * native dragstart event handler.
   */
  setupDrag() {
    const self = this;
    const { containerClass } = this.classMap;
    const { readonly = false } = this.props;
    const svg = select(this.svgRef.current);
    const container = svg.select(`.${containerClass}`);
    const dragBehavior = drag()
      .clickDistance(this.clickDistance)
      .container(() => {
        return container.node() as any;
      })
      .filter((event) => {
        // readonly mode can't drag.
        if (readonly) {
          return false;
        }
        const data: any = select(event.target).datum();
        // root node can't drag.
        if (!data.parent) {
          return false;
        }
        // node mark as not draggable
        if (data.data.draggable === false) {
          return false;
        }

        // this is d3 default filter.
        return !event.button;
      })
      .on('start', this.prepareDragStart)
      .on('drag', function (event, data) {
        self.dragNode(this, event, data);
      })
      .on('end', function (event, data) {
        self.endDragNode(this, data);
      });
    this.drag = dragBehavior;
  }

  prepareDragStart = (event: any) => {
    this.dragStartPos = {
      x: event.x,
      y: event.y,
    };
  };

  /**
   * Add dragging style.
   * @param {element} node dragged node.
   * @param {Node} data Node object of dragged node.
   */
  startDragNode = (node: any, data: any) => {
    const { containerClass, draggingClass, draggedClass } = this.classMap;
    const svg = select(this.svgRef.current);
    const container = svg.select(`.${containerClass}`);
    container.classed(draggingClass, true);
    select(node).classed(draggedClass, true);
    // Remove descendants of dragged node.
    this.removeDraggedDescendants(data.descendants());
    // hidden tooltip menu while drag
    this.hideMenuAndTooltip();
  };

  /**
   * Remove dragged node descendants and links.
   * @param {Node[]} children nodes include dragged node.
   */
  removeDraggedDescendants(children: any) {
    const { duration } = this.transition;
    let ids: any = [];
    forEach(children, (child) => ids.push(child.data.id));

    const { containerClass, nodeClass, linkClass } = this.classMap;
    const svg = select(this.svgRef.current);
    const container = svg.select(`.${containerClass}`);
    // keep dragged node existing.
    const removedNodeIds = slice(ids, 1);
    const nodes = container.selectAll(`.${nodeClass}`).filter((data: any) => includes(removedNodeIds, data.data.id));
    // remove all related link.
    const links = container.selectAll(`.${linkClass}`).filter((data: any) => includes(ids, data.target.data.id));

    // node transition end position.
    const [x, y] = this.getOriginPos();
    const linkGenerator = linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);
    const initPath = linkGenerator({ source: { x, y }, target: { x, y } } as any);
    const initTransform = `translate(${y},${x})`;

    nodes
      .lower()
      .transition()
      .duration(duration / 2) // make duration shorter to avoid drop at removed node.
      .attr('transform', initTransform)
      .remove();

    links
      .lower()
      .transition()
      .duration(duration / 2) // make duration shorter to avoid drop at removed node.
      .attr('d', initPath)
      .remove();
  }

  /**
   * d3 drag event handler.
   * @param {element} node dragged node.
   * @param {Node} data data of dragged node.
   */
  dragNode = (node: any, event: any, data: any) => {
    const maxDis = this.dragDistance;
    if (Math.abs(this.dragStartPos.x - event.x) < maxDis && Math.abs(this.dragStartPos.y - event.y) < maxDis) {
      return;
    }
    if (!this.startDrag) {
      // only user move mouse means start.
      this.startDragNode(node, data);
    }
    const treeNode = select(node);
    const { containerClass, dropWantedClass, nodeClass } = this.classMap;
    const svg = select(this.svgRef.current);
    const container = svg.select(`.${containerClass}`);
    const { dx, dy } = event;
    // Because we use data.x as node translate y and data.y as node translate x.
    // And the calculated event.x and event.y depend on data.x and data.y.
    // So we can't use event.x and event.y, we have to calculate new translate according to
    // dx and dy.
    if (dx || dy) {
      const { x, y } = util.getTranslateAttr(node);
      treeNode
        .raise() // let dragged node above other nodes.
        .attr('transform', `translate(${x + dx},${y + dy})`);
      const overlapped = this.getOverlappedNode(node);
      container.selectAll(`.${nodeClass}.${dropWantedClass}`).classed(dropWantedClass, false);
      if (overlapped) {
        // highlight overlapped node.
        select(overlapped.node).classed(dropWantedClass, true);
      }
    }
    this.startDrag = true;
  };

  /**
   * d3 end event handler for drag.
   * @param {element} node dragged node.
   * @param {Node} data data of dragged node.
   */
  endDragNode = (node: any, data: any) => {
    const overlapped = this.getOverlappedNode(node);
    const { containerClass, draggingClass, draggedClass, nodeClass, dropWantedClass } = this.classMap;
    const { onDrop } = this.props;
    const svg = select(this.svgRef.current);
    const container = svg.select(`.${containerClass}`);
    container.classed(draggingClass, false);
    container.selectAll(`.${nodeClass}.${dropWantedClass}`).classed(dropWantedClass, false);
    select(node).classed(draggedClass, false);
    if (this.startDrag) {
      if (overlapped && onDrop) {
        const result = onDrop({
          type: 'internal',
          source: data,
          target: overlapped.data,
        });
        if ((result as any) === false) {
          this.renderModelTree(false);
        } else if (result && result.catch) {
          // Rejected promise means cancel drop operation.
          result.catch(() => this.renderModelTree(false));
        }
        // otherwise do nothing, because drop operation is accepted and data will refresh,
        // then tree will refresh.
      } else {
        this.renderModelTree(false);
      }
    }
    this.startDrag = false;
  };

  /**
   * Reset tree zoom.
   */
  resetZoom = (hard = false) => {
    const { containerClass } = this.classMap;
    const svg = select(this.svgRef.current);
    const container = svg.select(`.${containerClass}`);
    const { duration } = this.transition;
    const transform = container.attr('transform');
    if (transform && transform !== zoomIdentity.toString()) {
      if (hard) {
        // reset immediately
        svg.call(this.zoom.transform, zoomIdentity);
      } else {
        // has an animation.
        svg.transition().duration(duration).call(this.zoom.transform, zoomIdentity);
      }
    }
  };

  // @API called from outside
  resetToOrigin = () => {
    this.resetZoom(true);
  };

  /**
   * Update tree data according to dataSource for render.
   */
  updateModelTreeState() {
    const { dataSource } = this.props;
    // For empty tree.
    if (dataSource === null) {
      this.root = null;
      this.nodes = [];
      this.links = [];
      return;
    }
    const { node: nodeSize, nodeGap, treeOffset } = this.sizeMap;
    const treeLayout = tree()
      .separation(() => 1) // Reduce subtree gap size.
      .nodeSize([nodeSize.height + nodeGap.y, nodeSize.width + nodeGap.x]);

    const data = hierarchy(dataSource);
    const root = treeLayout(data);
    let left = 0;
    // calculate min x.
    root.eachBefore((node) => {
      if (node.x < left) {
        left = node.x;
      }
    });
    // Because we use x as node y coordinate value,
    // so we use treeOffset.y to calculate vertical offset.
    let xOffset = treeOffset.y - left;
    // shift tree layout
    root.eachBefore((node) => {
      node.x += xOffset;
      node.y += treeOffset.x;
    });

    this.root = root;
    this.nodes = root.descendants();
    this.links = root.links();
  }

  /**
   * Get tree origin coordinate.
   * @return {[Number,Number]} coordinate
   */
  getOriginPos() {
    if (this.nodes.length) {
      const [{ x, y }] = this.nodes;
      return [x, y];
    }
    return [0, 0];
  }

  /**
   * Render tree links.
   */
  renderLinks() {
    const svg = select(this.svgRef.current);
    const { nodeVisible = returnTrue } = this.props;
    const { containerClass, linkContainerClass, linkClass, hasConditionClass } = this.classMap;

    const { link: linkSize } = this.sizeMap;
    const { duration } = this.transition;
    const { hasConditionalLink } = this.defaultOptions;

    const container = svg.select(`.${containerClass} .${linkContainerClass}`);

    const linkElements = container.selectAll(`.${linkClass}`);
    const updateLinks: any = linkElements.data(
      this.links,
      (link: any) => `${link.source.data.id}-${link.target.data.id}`,
    );

    const [x, y] = this.getOriginPos();
    const linkGenerator = linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);
    const initPath = linkGenerator({ source: { x, y }, target: { x, y } } as any);

    const enterLinks = updateLinks.enter().append('path').classed(linkClass, true).attr('d', initPath);

    if (hasConditionalLink) {
      enterLinks.on('click', this.selectLink);
    }
    const mergedLinks = enterLinks.merge(updateLinks);

    if (hasConditionalLink) {
      mergedLinks.classed(hasConditionClass, (d: any) => d.target.data.conditional === true);
    }

    mergedLinks
      .style('display', (node: any) => (nodeVisible(node.target) ? null : 'none'))
      // change link position
      .attr('transform', () => `translate(${linkSize.x}, ${linkSize.y})`)
      .transition()
      .duration(duration)
      .attr('d', linkGenerator);

    updateLinks.exit().lower().transition().duration(duration).attr('d', initPath).remove();
  }

  selectLink = (event: any, data: any) => {
    const { onSelectLink = noop, selectedKey } = this.props;
    const currentKey = this.getLinkKey(data);
    if (currentKey === selectedKey) {
      onSelectLink(null);
    } else {
      onSelectLink(currentKey, data);
    }
  };

  /**
   * Render tree nodes.
   */
  renderNodes() {
    const self = this;
    const svg = select(this.svgRef.current);
    const {
      containerClass,
      nodeContainerClass,
      nodeClass,
      hiddenNodeClass,
      rerouteNodeClass,
      nodeBgClass,
      nodeImageClass,
      nodeTextClass,
      nodeCircleClass,
    } = this.classMap;
    const { node: nodeSize, image: imageSize, text: textSize, borderRadius, link: linkSize } = this.sizeMap;
    const { imageClipID } = this.defsIDMap;
    const { duration } = this.transition;
    const { reroute: rerouteType } = this.nodeTypeMap;
    const { hasContextMenu, hasRerouteNode } = this.defaultOptions;
    const { nodeClasses = null, nodeVisible = returnTrue } = this.props;

    const container = svg.select(`.${containerClass} .${nodeContainerClass}`);

    // start to render nodes.
    const nodeElements = container.selectAll(`.${nodeClass}`);
    const updateNodes: any = nodeElements.data(this.nodes, (node: any) => node.data.id);
    const [x, y] = this.getOriginPos();
    const initTransform = `translate(${y},${x})`;
    const enterNodes = updateNodes
      .enter()
      .append('g')
      .classed(nodeClass, true)
      .attr('transform', initTransform)
      .on('click', this.selectNode)
      .on('mouseenter', function (this: any, event: any, d: any) {
        self.handleNodeMouseEnter(this, d);
      })
      .on('mouseleave', function (event: any) {
        self.handleNodeMouseLeave();
      })
      .call(this.drag);
    // optimization for tree, if tree don't have context menu.
    if (hasContextMenu) {
      enterNodes.on('contextmenu', this.handleNodeContextMenu);
    }

    enterNodes
      .append('rect')
      .classed(nodeBgClass, true)
      .attr('rx', borderRadius)
      .attr('ry', borderRadius)
      .attr('width', nodeSize.width)
      .attr('height', nodeSize.height);

    enterNodes
      .append('use')
      .classed(nodeImageClass, true)
      .attr('width', imageSize.width)
      .attr('height', imageSize.height)
      .attr('x', imageSize.x)
      .attr('y', imageSize.y)
      .attr('clip-path', `url(#${imageClipID})`);
    enterNodes.append('text').attr('x', textSize.x).attr('y', textSize.y).classed(nodeTextClass, true);
    // optimization for tree, if tree don't have reroute node.
    if (hasRerouteNode) {
      enterNodes
        .append('circle')
        .classed(nodeCircleClass, true)
        .attr('cx', linkSize.x)
        .attr('cy', linkSize.y)
        .attr('r', 0);
    }

    const mergedNodes = enterNodes.merge(updateNodes);
    if (nodeClasses) {
      // add custom class for each node.
      forEach(nodeClasses, (fn, className) => {
        mergedNodes.classed(className, fn);
      });
    }
    mergedNodes
      .style('display', (node: any) => (nodeVisible(node) ? null : 'none'))
      .classed(hiddenNodeClass, (node: any) => node.data.hidden);

    if (hasRerouteNode) {
      mergedNodes.classed(rerouteNodeClass, (node: any) => node.data.type === rerouteType);
    }
    // The purpose for follow code is to propagate updated data on 'rect' and 'circle'.
    // Otherwise the datum() for 'rect' and 'circle' will return initial data.
    // And our drop operation will have a wrong target node.
    mergedNodes.select('rect');
    mergedNodes.select('circle');

    mergedNodes
      .select('use')
      .attr('href', (node: any) => (this.imageMap[node.data.type] ? `#${this.imageMap[node.data.type]}` : null));

    mergedNodes
      .select('text')
      .text((node: any) => node.data.name)
      .text(function (this: any, node: any) {
        const result = util.measureSvgText(this, node.data.name, textSize.width);
        node.ellipsis = result.ellipsis;
        return result.text;
      })
      .attr('dy', function (this: any) {
        // because IE11 don't support .attr('dominant-baseline', 'central'),
        // so we need to calculate dy by ourself.
        select(this).attr('dy', null); // remove dy firstly.
        const size = this.getBBox();
        return (nodeSize.height - size.height) / 2 - size.y;
      });

    mergedNodes
      .transition()
      .duration(duration)
      .attr('transform', (node: any) => `translate(${node.y},${node.x})`);

    updateNodes.exit().lower().transition().duration(duration).attr('transform', initTransform).remove();
  }

  /**
   * Node select handler.
   * @param {Node} node
   */
  selectNode = (event: any, node: any) => {
    const { onSelect = noop, selectedKey } = this.props;
    if (this.getNodeKey(node) === selectedKey) {
      onSelect(null);
    } else {
      onSelect(node);
    }
  };

  /**
   * Get node key.
   * @param {Node} node
   */
  getNodeKey(node: any) {
    const { nodeKey } = this.props;

    if (nodeKey) {
      return nodeKey(node);
    }
    return node.data.id;
  }

  getLinkKey(data: any) {
    return `${this.getNodeKey(data.source)}-${this.getNodeKey(data.target)}`;
  }

  /**
   * Update style for selected node.
   */
  updateSelectedNode() {
    const { selectedKey } = this.props;
    const svg = select(this.svgRef.current);
    const { nodeClass, selectedClass } = this.classMap;

    // clear selected node style.
    svg.selectAll(`.${nodeClass}.${selectedClass}`).classed(selectedClass, false);

    if (selectedKey === null) {
      return;
    }

    svg
      .selectAll(`.${nodeClass}`)
      .filter((node) => selectedKey === this.getNodeKey(node))
      .classed(selectedClass, true);
  }

  updateSelectedLink() {
    const { hasConditionalLink } = this.defaultOptions;
    if (!hasConditionalLink) {
      return;
    }
    const { linkClass, selectedClass } = this.classMap;
    const { selectedKey } = this.props;
    const svg = select(this.svgRef.current);

    svg.selectAll(`.${linkClass}.${selectedClass}`).classed(selectedClass, false);

    if (!selectedKey) {
      return;
    }
    svg
      .selectAll(`.${linkClass}`)
      .filter((data) => selectedKey === this.getLinkKey(data))
      .classed(selectedClass, true);
  }

  /**
   * mouseenter event handler for node.
   * @param {element} node
   * @param {Node} data
   */
  handleNodeMouseEnter = (node: any, data: any) => {
    // only show tooltip for ellipsis text.
    if (data.ellipsis && !this.startDrag) {
      // move tooltip from svg top to node top position.
      const svgRect = this.svgRef.current.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const offsetX = (nodeRect.left + nodeRect.right) / 2 - (svgRect.left + svgRect.right) / 2;
      const offsetY = nodeRect.top - svgRect.top;
      this.setState({
        tooltip: data.data.name,
        tooltipVisible: true,
        tooltipAlign: {
          offset: [offsetX, offsetY],
        },
      });
    }
  };

  /**
   * mouseleave event for node.
   */
  handleNodeMouseLeave = () => {
    this.setState({
      tooltipVisible: false,
    });
  };

  /**
   * contextmenu event for node.
   * @param node
   */
  handleNodeContextMenu = (event: any, node: any) => {
    const { contextMenus = [], showInternalMenu = true } = this.props;
    // display context menu, if tree have menu to display.
    if (contextMenus.length || showInternalMenu) {
      this.setState({
        menuVisible: true,
        contextNode: node,
      });
    }
  };

  /**
   * Get most wanted node that overlap with dragged node.
   * @param {element} sourceNode dragged node elemnt.
   * @return {{area: Number, data: Node, node: element}} overlapped node.
   */
  getOverlappedNode(sourceNode: any) {
    const {
      node: { width, height },
    } = this.sizeMap;
    const { nodeClass } = this.classMap;
    const svg = select(this.svgRef.current);
    const nodes = svg.selectAll(`.${nodeClass}`);
    const { x: sX, y: sY } = util.getTranslateAttr(sourceNode);
    let overlapped: any = [];
    forEach(nodes.nodes(), (node: any) => {
      // skip if node is sourceNode.
      if (node === sourceNode) {
        return;
      }
      const { x, y } = util.getTranslateAttr(node);
      const overlappedX = Math.abs(x - sX);
      const overlappedY = Math.abs(y - sY);
      // current node overlap dragged node.
      if (overlappedX <= width && overlappedY <= height) {
        const data = select(node).datum();
        let area = 0;
        if (sX >= x && sY <= y) {
          // intersect at bottom right.
          area = (x + width - sX) * (sY + height - y);
        } else if (sX >= x && sY >= y) {
          // intersect at top right.
          area = (x + width - sX) * (y + height - sY);
        } else if (sX <= x && sY <= y) {
          // intersect at bottom left.
          area = (sX + width - x) * (sY + height - y);
        } else {
          // intersect at top left.
          area = (sX + width - x) * (y + height - sY);
        }
        overlapped.push({
          area,
          data,
          node,
        });
      }
    });
    const wantedNode = maxBy(overlapped, (item: any) => item.area);
    if (wantedNode) {
      return wantedNode;
    }
    return null;
  }

  /**
   * Render tree
   */
  renderModelTree(reset = true) {
    if (reset) {
      this.clearSearchedNode();
      this.resetZoom();
    }
    this.clearCutNode();
    this.renderLinks();
    this.renderNodes();
    this.updateSelectedNode();
    this.updateSelectedLink();
  }

  render() {
    const { tooltip, tooltipVisible, tooltipAlign, menuVisible } = this.state;
    const { svg: svgSize } = this.sizeMap;

    let {
      width = svgSize.width,
      height = svgSize.height,
      readonly = false,
      placeholderMode = false,
      className = '',
      minHeight,
    } = this.props;

    if (minHeight) {
      height = '100%';
      className += ' resizable-vertical ';
    }

    const { hasContextMenu } = this.defaultOptions;

    let svgProps = {};

    if (!readonly) {
      assign(svgProps, {
        onDragEnter: this.handleNativeDragEnter,
        onDragLeave: this.handleNativeDragLeave,
        onDragOver: this.handleNativeDragOver,
        onDrop: this.handleNativeDrop,
      });
    }

    let svgElement = (
      <Tooltip
        trigger="hover"
        placement="top"
        title={tooltip}
        align={tooltipAlign}
        visible={tooltipVisible}
      >
        <svg
          width={width}
          height={height}
          ref={this.svgRef}
          {...svgProps}
        >
          <defs>
            <ContractImg id={this.imageMap.root} />
            <GroupImg id={this.imageMap.subContract} />
            <ChargeImg id={this.imageMap.charge} />
          </defs>
        </svg>
      </Tooltip>
    );

    if (hasContextMenu && !readonly && !placeholderMode) {
      const overlay = this.generateContextMenu();
      svgElement = (
        <Dropdown
          visible={menuVisible}
          overlay={overlay}
          trigger={['contextMenu']}
          onVisibleChange={this.handleMenuVisible}
        >
          {svgElement}
        </Dropdown>
      );
    }

    let toolbar = null;
    if (!placeholderMode) {
      toolbar = this.generateToolbar();
    }
    return (
      <div
        className={`model-tree-wrapper ${className}`}
        style={{ minHeight, height: minHeight }}
      >
        {toolbar}
        {svgElement}
      </div>
    );
  }
}

export default ModelTree;
