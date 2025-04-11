'use client';
import alertNotification from '@/components/alert-notification';

import { useEffect, useState } from 'react';

export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
