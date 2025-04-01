// hooks/useSession.ts

import { useState, useEffect } from "react";
import { getSessionId } from "@/app/utils/session";

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedSessionId = getSessionId();
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  return sessionId;
}
