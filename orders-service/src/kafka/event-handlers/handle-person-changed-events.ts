import { User } from '../../models';
import { updateUser } from '../../services/userService';
import { readCloudEvent } from '../../utils/cloudEvents';

async function handleChangedEvent(key: Buffer | null, value: Buffer | null) {
  const decodedKey = key ? key.toString() : 'No Key';
  const decodedValue = value ? value.toString() : 'No Value';
  const parsed = JSON.parse(decodedValue);

  console.log(`Processing Changed Event: ${decodedKey}`);

  const cloudEvent = readCloudEvent(parsed);
  if (!cloudEvent || !cloudEvent.personid) {
    console.error(`Invalid cloud event data for key: ${decodedKey}`);
    return;
  }
  try {
    const { personid } = cloudEvent;
    console.info(`Updating user with person ID: ${personid}`);
    await updateUser(personid, User);
  } catch (error) {
    console.error(`Error updating user for key: ${decodedKey}`, error);
  }
}

export { handleChangedEvent };
