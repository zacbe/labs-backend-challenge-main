import { orderUpdatedEvent, serializeCloudEvent } from '../../utils/cloudEvents';
import config from '../../utils/kafkaConfig';
import { sendMessage } from '../producers';

const TOPIC = config.topicOrderChanged;

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
