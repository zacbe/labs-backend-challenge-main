// Note: Should created users be persisted to the database?

export function handleCreatedEvent(key: Buffer | null, value: Buffer | null) {
  const decodedKey = key ? key.toString() : 'No Key';
  const decodedValue = value ? value.toString() : 'No Value';
  console.log(`Processing Created Event: ${decodedKey}#${decodedValue}`);
}
