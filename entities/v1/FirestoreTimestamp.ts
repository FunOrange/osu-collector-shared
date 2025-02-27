export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export function toFirestoreTimestamp(date: Date | string): FirestoreTimestamp {
  return date
    ? {
        _seconds: new Date(date).getTime() / 1000,
        _nanoseconds: new Date(date).getTime() * 1e6,
      }
    : undefined;
}

export function fromFirestoreTimestamp(timestamp: FirestoreTimestamp): string {
  if (!timestamp) return undefined;
  return new Date(timestamp._seconds * 1000).toISOString();
}
