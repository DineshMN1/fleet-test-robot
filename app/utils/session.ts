// utils/session.ts

export function setSessionId(sessionId: string) {
    localStorage.setItem("sessionId", sessionId);
  }
  
  export function getSessionId(): string | null {
    return localStorage.getItem("sessionId");
  }
  
  export function clearSession() {
    localStorage.removeItem("sessionId");
  }
  