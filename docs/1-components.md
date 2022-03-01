# Identifying Components

Identifying components and there behavior on mobile and desktop screens.

## Header

`@Mobile`

- Show icons instead of names. At the rightmost show user icon with initials and show user id after in tab versions.
- the modals that took a fixed width in desktop versions generally take full width in mobile ones.

`@Desktop`

The desktop version begins at `1024px`.

Here all icons are back to names and marketwatch get's added.

The max width of container is `1280px`.

Components: All inside `Header` component.

- `HeaderLeft`: consisting of NIFTY 50 and SENSEX
- `HeaderIcon`: consisting of icon.
- `HeaderRight`: consisting of all routes.
- `UserProfile`: shows modal `onClick`. `UserProfileModal` will contain all actions for it.

## Marketwatch

Marketwatch remains consistent throughout desktop layout as it's shown on all pages.

Components: All inside `Marketwatch` component.

- `Input`: with overlay component after API call is made.
- `MarketwatchList`: containing all items based on selected watchlist.
  - `MarketwatchRowItem`: containing row item. On hover shows `MarketwatchRowActionItems`.
- `MarketwatchFooter`: containg all items with api calls and a settings icon.
