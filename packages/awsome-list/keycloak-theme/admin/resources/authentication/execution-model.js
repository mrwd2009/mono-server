export class IndexChange {
  constructor(oldIndex, newIndex) {
    this.oldIndex = oldIndex;
    this.newIndex = newIndex;
  }
}
export class LevelChange extends IndexChange {
  constructor(oldIndex, newIndex, parent) {
    super(oldIndex, newIndex);
    this.parent = parent;
  }
}
export class ExecutionList {
  constructor(list) {
    this.list = list;
    const exList = {
      executionList: [],
      isCollapsed: false
    };
    this.transformToExpandableList(0, exList);
    this.expandableList = exList.executionList;
  }
  transformToExpandableList(currIndex, execution) {
    for (let index = currIndex; index < this.list.length; index++) {
      const ex = this.list[index];
      const level = ex.level || 0;
      const nextRowLevel = this.list[index + 1]?.level || 0;
      const isLeaf = level > nextRowLevel;
      const hasChild = level < nextRowLevel;
      if (isLeaf) {
        execution.executionList?.push(ex);
        return index;
      }
      if (ex.level === level && !hasChild) {
        execution.executionList?.push(ex);
      } else {
        const subLevel = {...ex, executionList: [], isCollapsed: false};
        index = this.transformToExpandableList(index + 1, subLevel);
        execution.executionList?.push(subLevel);
      }
    }
    return this.list.length;
  }
  order(list) {
    let result = [];
    for (const row of list || this.expandableList) {
      result.push(row);
      if (row.executionList && !row.isCollapsed) {
        result = result.concat(this.order(row.executionList));
      }
    }
    return result;
  }
  findExecution(id, list) {
    let found = (list || this.expandableList).find((ex) => ex.id === id);
    if (!found) {
      for (const ex of list || this.expandableList) {
        if (ex.executionList) {
          found = this.findExecution(id, ex.executionList);
          if (found) {
            return found;
          }
        }
      }
    }
    return found;
  }
  getParentNodes(level) {
    for (let index = 0; index < this.list.length; index++) {
      const ex = this.list[index];
      if (index + 1 < this.list.length && this.list[index + 1].level > ex.level && ex.level + 1 === level) {
        return ex;
      }
    }
  }
  getChange(changed, order) {
    const currentOrder = this.order();
    const newLocIndex = order.findIndex((id) => id === changed.id);
    const oldLocation = currentOrder[currentOrder.findIndex((ex) => ex.id === changed.id)];
    const newLocation = currentOrder[newLocIndex];
    if (newLocation.level !== oldLocation.level) {
      if (newLocation.level > 0) {
        const parent = this.getParentNodes(newLocation.level);
        return new LevelChange(parent?.executionList?.length || 0, newLocation.index, parent);
      }
      return new LevelChange(this.expandableList.length, newLocation.index);
    }
    return new IndexChange(oldLocation.index, newLocation.index);
  }
  clone() {
    const newList = new ExecutionList([]);
    newList.list = this.list;
    newList.expandableList = this.expandableList;
    return newList;
  }
}
