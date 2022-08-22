import { useCallback, useContext } from 'react';
import { AppContext } from '@/utils/appContext';

const useLoader = () => {
  const [state, dispatch] = useContext(AppContext);

  const handleUpdateLoader = useCallback((val) => dispatch({ loading: val }), []);

  return [state.loading, handleUpdateLoader];
};

export default useLoader;
