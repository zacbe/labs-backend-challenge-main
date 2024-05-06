import { handleOrderUpdatedEvents } from './handle-order-changed-events';
import { handleOrderCreatedEvents } from './handle-order-created-events';
import { handleOrderDeletedEvents } from './handle-order-deleted-events';
import { handleChangedEvent } from './handle-person-changed-events';
import { handleCreatedEvent } from './handle-person-created-events';
import { handleDeletedEvent } from './handle-person-deleted-events';

const EventHandlersMap = {
  'personevents-changed': handleChangedEvent,
  'personevents-created': handleCreatedEvent,
  'personevents-deleted': handleDeletedEvent,
};

export {
  EventHandlersMap,
  handleChangedEvent,
  handleCreatedEvent,
  handleDeletedEvent,
  handleOrderCreatedEvents,
  handleOrderDeletedEvents,
  handleOrderUpdatedEvents,
};
