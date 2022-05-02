import { useMemo, useCallback } from 'react';
import includes from 'lodash/includes';
import useAppSelector from './useAppSelector';
import { selectPermissions } from '../views/Auth/slices';

export const usePermission = () => {
  const permissions = useAppSelector(selectPermissions);

  const hasPermission = useCallback((p: string) => {
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    return includes(permissions, p);
  }, [permissions]);

  const isAdminR = useMemo(() => {
    return hasPermission('Admin.Read');
  }, [hasPermission]);

  const isAdminW = useMemo(() => {
    return hasPermission('Admin.Write');
  }, [hasPermission]);

  const isGeneralR = useMemo(() => {
    return hasPermission('General.Read');
  }, [hasPermission]);

  const isGeneralW = useMemo(() => {
    return hasPermission('General.Write');
  }, [hasPermission]);

  const isAdvancedR = useMemo(() => {
    return hasPermission('Advanced.Read');
  }, [hasPermission]);

  const isAdvancedW = useMemo(() => {
    return hasPermission('Advanced.Write');
  }, [hasPermission]);


  return {
    hasPermission,
    isAdminR,
    isAdminW,
    isAdvancedR,
    isAdvancedW,
    isGeneralR,
    isGeneralW,
  };
};

export default usePermission;
