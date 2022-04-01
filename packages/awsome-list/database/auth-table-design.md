### Confirmation
Confirmable is responsible to verify if an account is already confirmed to sign in, and to send emails with confirmation instructions. Confirmation instructions are sent to the user email after creating a record and when manually requested by a new confirmation instruction request.

Confirmable tracks the following columns:

confirmation_token - A unique random token

confirmed_at - A timestamp when the user clicked the confirmation link

confirmation_sent_at - A timestamp when the confirmation_token was generated (not sent)

unconfirmed_email - An email address copied from the email attr. After confirmation

this value is copied to the email attr then cleared

### Trackable
Track information about your user sign in. It tracks the following columns:

sign_in_count - Increased every time a sign in is made (by form, openid, oauth)

current_sign_in_at - A timestamp updated when the user signs in

last_sign_in_at - Holds the timestamp of the previous sign in

current_sign_in_ip - The remote ip updated when the user sign in

last_sign_in_ip - Holds the remote ip of the previous sign in

### Lockable
Handles blocking a user access after a certain number of attempts. Lockable accepts two different strategies to unlock a user after it's blocked: email and time. The former will send an email to the user when the lock happens, containing a link to unlock its account. The second will unlock the user automatically after some configured time (ie 2.hours). It's also possible to set up lockable to use both email and time strategies.

Options
Lockable adds the following options to devise:

* +maximum_attempts+: how many attempts should be accepted before blocking the user.
* +lock_strategy+: lock the user account by :failed_attempts or :none.
* +unlock_strategy+: unlock the user account by :time, :email, :both or :none.
* +unlock_in+: the time you want to lock the user after to lock happens. Only available when unlock_strategy is :time or :both.
* +unlock_keys+: the keys you want to use when locking and unlocking an account