// Note: Should deleted users be removed from the database?

export function handleDeletedEvent(key: Buffer | null, value: Buffer | null) {
  const decodedKey = key ? key.toString() : 'No Key';
  const decodedValue = value ? value.toString() : 'No Value';
  console.log(`Processing Deleted Event: ${decodedKey}#${decodedValue}`);
}
