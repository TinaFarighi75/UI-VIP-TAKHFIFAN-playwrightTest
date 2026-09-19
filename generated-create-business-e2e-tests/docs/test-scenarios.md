# Test Scenarios

## Page structure

- Authenticated user reaches the create-business route.
- Page title, all five section titles, and submit action are visible.

## Owner information

- Full name and valid Iranian mobile can be entered.
- Missing source and full name show required validation.
- Invalid mobile format is rejected.

## General information

- Business name, cashier-machine choice, and rich description accept input.
- Category selector is represented by a reusable React Select component.
- Missing business name, category, and cashier-machine choice show validation.
- Logo and business-image upload controls have reusable wrappers.

## Contact information

- Map action is visible.
- Longitude, latitude, address, and phone fields are enabled and accept values.
- Province, city, area, and district use reusable React Select behavior.

## Service hours

- All-days switch is off by default.
- A disabled day's time fields become enabled after activating that day.

## Financial information

- Real, legal, and foreign business types are available.
- National ID, account owner, account, and Sheba fields accept data.
- Sheba inquiry action is visible.

## Deliberately excluded from automatic execution

- Successful creation, because it mutates shared staging data without a
  confirmed create API contract and cleanup endpoint.
- Duplicate-mobile behavior, because it depends on persistent seeded data.
- File upload success/error behavior, because no approved test assets or upload
  API contract were supplied.
- Map selection, because the modal DOM and map provider behavior were not
  included in the supplied page snapshot.
