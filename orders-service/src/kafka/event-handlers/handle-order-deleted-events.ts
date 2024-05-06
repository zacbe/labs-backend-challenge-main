import { orderDeletedEvent, serializeCloudEvent } from '../../utils/cloudEvents';
import config from '../../utils/kafkaConfig';
import { sendMessage } from '../producers';

const TOPIC = config.topicOrderDeleted;

const handleOrderDeletedEvents = async (event: any) => {
  const { orderid } = event;
  const cloudEvent = orderDeletedEvent({ orderid });
  const message = serializeCloudEvent(cloudEvent);
  await sendMessage(TOPIC, message);
};

export { handleOrderDeletedEvents };
