import { orderCreatedEvent, serializeCloudEvent } from '../../utils/cloudEvents';
import { sendMessage } from '../producers';

// TODO: source from config.ts
const TOPIC = 'order-events-created';

const handleOrderCreatedEvents = async (event: any) => {
  const { orderid } = event;
  const cloudEvent = orderCreatedEvent({ orderid });
  const message = serializeCloudEvent(cloudEvent);
  await sendMessage(TOPIC, message);
};

export { handleOrderCreatedEvents };
