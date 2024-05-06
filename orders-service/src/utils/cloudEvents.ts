import { CloudEvent } from 'cloudevents';

import { env } from './envConfig';

function composeCloudEvent(type: string, data: any) {
  const source = env.EVENT_SOURCE;
  const ce = new CloudEvent({ type, source, data, datacontenttype: 'application/json' });
  return ce;
}

const orderCreatedEvent = (data: any): CloudEvent => composeCloudEvent('order.created', data);
const orderUpdatedEvent = (data: any): CloudEvent => composeCloudEvent('order.updated', data);
const orderDeletedEvent = (data: any): CloudEvent => composeCloudEvent('order.deleted', data);

const serializeCloudEvent = (ce: CloudEvent) => ce.toString();

function readCloudEvent(event: any) {
  console.log(event);
  return event.data;
}

export { orderCreatedEvent, orderDeletedEvent, orderUpdatedEvent, readCloudEvent, serializeCloudEvent };
