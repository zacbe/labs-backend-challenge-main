import { getContacts } from '../libs';

async function updateUser(userId: string, model: any): Promise<void> {
  try {
    const [user, created] = await model.findOrCreate({
      where: { id: userId },
      defaults: { id: userId, synced: false },
    });

    if (created) {
      console.info(`User ${userId} was created`);
    }

    const contacts = await getContacts(userId);
    if (!contacts) {
      console.error(`User ${userId} could not be found in the contacts service`);
      return;
    }

    user.set(contacts);
    await user.save();
  } catch (error: any) {
    console.error(`Error updating user ${userId}: ${error.message}`);
    throw error;
  }
}

export { updateUser };
