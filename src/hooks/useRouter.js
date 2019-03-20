import { __RouterContext } from 'react-router-dom';
import { useContext } from 'react';

function useRouter() {
  const router = useContext(__RouterContext);
  return router;
}

export default useRouter();
