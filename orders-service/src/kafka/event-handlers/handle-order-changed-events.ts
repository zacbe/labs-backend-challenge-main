import { orderUpdatedEvent, serializeCloudEvent } from '../../utils/cloudEvents';
import { sendMessage } from '../producers';

// TODO: source from config.ts
const TOPIC = 'order-events-changed';

const handleOrderUpdatedEvents = async (event: any) => {
  try {
    const { orderid } = event;
    const cloudEvent = orderUpdatedEvent({ orderid });
    const message = serializeCloudEvent(cloudEvent);

    await sendMessage(TOPIC, message);
  } catch (error) {
    console.error('Error handling order updated event:', error);
  }
};

export { handleOrderUpdatedEvents };
