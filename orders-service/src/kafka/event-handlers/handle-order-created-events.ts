import { orderCreatedEvent, serializeCloudEvent } from '../../utils/cloudEvents';
import config from '../../utils/kafkaConfig';
import { sendMessage } from '../producers';

const TOPIC = config.topicOrderCreated;

const handleOrderCreatedEvents = async (event: any) => {
  const { orderid } = event;
  const cloudEvent = orderCreatedEvent({ orderid });
  const message = serializeCloudEvent(cloudEvent);
  await sendMessage(TOPIC, message);
};

export { handleOrderCreatedEvents };
