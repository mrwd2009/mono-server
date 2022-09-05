import React, {useMemo, useRef, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {get} from "../../_snowpack/pkg/lodash-es.js";
import {
  ActionsColumn,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../_snowpack/pkg/@patternfly/react-table.js";
import styles from "../../_snowpack/pkg/@patternfly/react-styles/css/components/DataList/data-list.js";
export function DraggableTable({
  keyField,
  columns,
  data,
  actions,
  onDragFinish,
  ...props
}) {
  const {t} = useTranslation("authentication");
  const bodyRef = useRef(null);
  const [state, setState] = useState({
    draggedItemId: "",
    draggingToItemIndex: -1,
    dragging: false,
    tempItemOrder: [""]
  });
  const itemOrder = useMemo(() => data.map((d) => get(d, keyField)), [data]);
  const onDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    const draggedItemId = evt.currentTarget.id;
    evt.currentTarget.classList.add(styles.modifiers.ghostRow);
    evt.currentTarget.setAttribute("aria-pressed", "true");
    setState({...state, draggedItemId, dragging: true});
  };
  const moveItem = (arr, i1, toIndex) => {
    const fromIndex = arr.indexOf(i1);
    if (fromIndex === toIndex) {
      return arr;
    }
    const temp = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, temp[0]);
    return arr;
  };
  const move = (itemOrder2) => {
    if (!bodyRef.current)
      return;
    const ulNode = bodyRef.current;
    const nodes = Array.from(ulNode.children);
    if (nodes.map((node) => node.id).every((id, i) => id === itemOrder2[i])) {
      return;
    }
    while (ulNode.firstChild) {
      ulNode.removeChild(ulNode.lastChild);
    }
    itemOrder2.forEach((id) => {
      ulNode.appendChild(nodes.find((n) => n.id === id));
    });
  };
  const onDragCancel = () => {
    Array.from(bodyRef.current?.children || []).forEach((el) => {
      el.classList.remove(styles.modifiers.ghostRow);
      el.setAttribute("aria-pressed", "false");
    });
    setState({
      ...state,
      draggedItemId: "",
      draggingToItemIndex: -1,
      dragging: false
    });
  };
  const onDragLeave = (evt) => {
    if (!isValidDrop(evt)) {
      move(itemOrder);
      setState({...state, draggingToItemIndex: -1});
    }
  };
  const isValidDrop = (evt) => {
    const ulRect = bodyRef.current.getBoundingClientRect();
    return evt.clientX > ulRect.x && evt.clientX < ulRect.x + ulRect.width && evt.clientY > ulRect.y && evt.clientY < ulRect.y + ulRect.height;
  };
  const onDrop = (evt) => {
    if (isValidDrop(evt)) {
      onDragFinish(state.draggedItemId, state.tempItemOrder);
    } else {
      onDragCancel();
    }
  };
  const onDragOver = (evt) => {
    evt.preventDefault();
    const td = evt.target;
    const curListItem = td.closest("tr");
    if (!curListItem || bodyRef.current && !bodyRef.current.contains(curListItem) || curListItem.id === state.draggedItemId) {
      return null;
    } else {
      const dragId = curListItem.id;
      const draggingToItemIndex = Array.from(bodyRef.current?.children || []).findIndex((item) => item.id === dragId);
      if (draggingToItemIndex !== state.draggingToItemIndex) {
        const tempItemOrder = moveItem(itemOrder, state.draggedItemId, draggingToItemIndex);
        move(tempItemOrder);
        setState({
          ...state,
          draggingToItemIndex,
          tempItemOrder
        });
      }
    }
  };
  const onDragEnd = (evt) => {
    const tr = evt.target;
    tr.classList.remove(styles.modifiers.ghostRow);
    tr.setAttribute("aria-pressed", "false");
    setState({
      ...state,
      draggedItemId: "",
      draggingToItemIndex: -1,
      dragging: false
    });
  };
  return /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": "Draggable table",
    className: state.dragging ? styles.modifiers.dragOver : "",
    ...props
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), columns.map((column) => /* @__PURE__ */ React.createElement(Th, {
    key: column.name
  }, t(column.displayKey || column.name))))), /* @__PURE__ */ React.createElement(Tbody, {
    ref: bodyRef,
    onDragOver,
    onDrop: onDragOver,
    onDragLeave
  }, data.map((row) => /* @__PURE__ */ React.createElement(Tr, {
    key: get(row, keyField),
    id: get(row, keyField),
    draggable: true,
    onDrop,
    onDragEnd,
    onDragStart
  }, /* @__PURE__ */ React.createElement(Td, {
    draggableRow: {
      id: `draggable-row-${get(row, "id")}`
    }
  }), columns.map((column) => /* @__PURE__ */ React.createElement(Td, {
    key: `${get(row, "id")}_${column.name}`,
    dataLabel: column.name
  }, column.cellRenderer ? column.cellRenderer(row) : get(row, column.name))), actions && /* @__PURE__ */ React.createElement(Td, {
    isActionCell: true
  }, /* @__PURE__ */ React.createElement(ActionsColumn, {
    items: actions.map(({isActionable, ...action}) => isActionable ? {...action, isDisabled: !isActionable(row)} : action),
    rowData: row
  }))))));
}
