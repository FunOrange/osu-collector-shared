export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export function toFirestoreTimestamp(date: Date | string): FirestoreTimestamp {
  return {
    _seconds: new Date(date).getTime() / 1000,
    _nanoseconds: new Date(date).getTime() * 1e6,
  };
}
