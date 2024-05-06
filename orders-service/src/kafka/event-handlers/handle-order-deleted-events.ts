import { orderDeletedEvent, serializeCloudEvent } from '../../utils/cloudEvents';
import { sendMessage } from '../producers';

// TODO: source from config.ts
const TOPIC = 'order-events-deleted';

const handleOrderDeletedEvents = async (event: any) => {
  const { orderid } = event;
  const cloudEvent = orderDeletedEvent({ orderid });
  const message = serializeCloudEvent(cloudEvent);
  await sendMessage(TOPIC, message);
};

export { handleOrderDeletedEvents };
