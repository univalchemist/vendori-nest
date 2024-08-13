export enum EventsEnum {
  // QUOTE_CREATED = 'quote.created',
  QUOTE_CHANGED = 'quote.changed', // Update & Create
  QUOTE_TRANSACTED = 'quote.transacted', // it is also update of quote, but specific update like transacted status. In this case we do some specific things.
  QUOTE_PRODUCT_CHANGED = 'quote_product.changed',
  PRODUCT_CHANGED = 'product.changed',
  SESSION_LOGOUT = 'session.logout',
}
