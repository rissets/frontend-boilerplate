import { useEffect, useState } from 'react';
export function useIsMobile() {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const query = matchMedia('(max-width: 767px)');
    const update = () => setValue(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return value;
}
