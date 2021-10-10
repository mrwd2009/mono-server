import { useCallback } from 'react';
import noop from 'lodash/noop';
import useMounted from '../../../hooks/useMounted';
import useMergedState from '../../../hooks/useMergedState';

const useEditor = ({ onCreate = noop, onEdit = noop } = {}) => {
  const [state, setState] = useMergedState({
    loading: false,
    visible: false,
    editor: {
      type: 'new',
      value: null,
    },
  });
  const {
    loading,
    visible,
    editor,
  } = state;
  const isMounted = useMounted();

  const openNewEditor = useCallback(() => {
    setState({
      loading: false,
      visible: true,
      editor: {
        type: 'new',
        value: null,
      },
    });
  }, [setState]);
  const openEditingEditor = useCallback((val) => {
    setState({
      loading: false,
      visible: true,
      editor: {
        type: 'edit',
        value: val,
      },
    });
  }, [setState]);
  const closeEditor = useCallback(() => {
    setState({
      loading: false,
      visible: false,
      editor: {
        type: 'new',
        value: null,
      },
    });
  }, [setState]);
  const handleOk = useCallback((values) => {
    setState({
      loading: true,
    });
    let prevStep = null;
    if (editor.type === 'new') {
      prevStep = onCreate(values);
    } else {
      prevStep = onEdit({
        ...editor.value,
        ...values,
      });
    }
    prevStep.then(() => {
      if (isMounted.current) {
        setState({
          loading: false,
          visible: false,
          editor: {
            type: 'edit',
            value: null,
          },
        });
      }
    })
    .catch(() => {
      if (isMounted.current) {
        setState({
          loading: false,
        });
      }
    });
  }, [isMounted, setState, editor, onCreate, onEdit]);

  return {
    loading,
    visible,
    state: editor,
    openNewEditor,
    openEditingEditor,
    closeEditor,
    handleOk,
  };
};

export default useEditor;