# Stage 1

## REST API Design

### Get Notifications

```http
GET /notifications
```
Response:
```json
{
  "notifications": [
    {
      "id": 1,
      "message": "Google Hiring",
      "isRead": false
    }
  ]
}
```

---

### Mark Notification as Read

```http
PATCH /notifications/{id}
```
Response:
```json
{
  "message": "Read successfully"
}
```

---

### Mark All Notifications as Read

```http
PATCH /notifications/read-all
```

Response:

```json
{
  "message": "All notifications marked as read"
}
```

---

### Create Notification

```http
POST /notifications
```

Request:

```json
{
  "message": "Amazon Hiring"
}
```

Response:

```json
{
  "message": "Notification added"
}
```

---

### Delete Notification

```http
DELETE /notifications/{id}
```

Response:

```json
{
  "message": "Deleted"
}
```

---

## Real-Time Notification Mechanism

I would use WebSockets.

Flow:
1. Notification is created
2. Save it in database
3. Send it through WebSocket
4. Student receives it instantly

Advantages:
* Fast delivery
* No need for constant refresh

---

# Stage 2

## Database Choice

PostgreSQL

Reason:
* Easy to use
* Supports SQL
* Good for storing notifications

---

## Schema

### students

```sql
CREATE TABLE students (
    studentID BIGINT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

### notifications

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    studentID BIGINT,
    message TEXT,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP,
    FOREIGN KEY(studentID) REFERENCES students(studentID)
);
```

---

## Scaling Challenges

Some possible issues:
* Too many notifications
* Slow queries
* More users

Possible solutions:
* Add indexes
* Use cache
* Use replicas

---

## Example Queries

Get notifications:
```sql
SELECT * 
FROM notifications
WHERE studentID = ?;
```

Unread notifications:
```sql
SELECT *
FROM notifications
WHERE studentID = ?
AND isRead = FALSE;
```

Mark as read:
```sql
UPDATE notifications
SET isRead = TRUE
WHERE id = ?;
```

---

# Stage 3

## Is Query Correct?

Yes.
```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = FALSE
ORDER BY createdAt DESC;
```

It returns unread notifications for student 1042.

---

## Why Can It Be Slow?

Because there may be millions of rows in the table.

Database may need to check many records.

---

## Index
```sql
CREATE INDEX idx_notification
ON notifications(studentID, isRead);
```

---

## Complexity
Without index:
```text
O(N)
```

With index:

```text
O(log N)
```

---

## Should We Index Everything?

No.
Reasons:
* Takes more space
* Slower inserts
* More maintenance

---

## Placement Notifications in Last 7 Days

```sql
SELECT *
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

---

# Stage 4

## Problem

Every request goes to database.
This can make the system slower.

---

## Solutions

### Cache
Use Redis to store frequently used notifications.
Pros:

* Faster

Cons:

* Extra setup

---

### Pagination

```http
GET /notifications?page=1&limit=20
```

Pros:
* Less data returned
Cons:
* Multiple pages

---

### Read Replica

Pros:
* Handles more reads
Cons:
* More servers needed

---

### WebSockets

Pros:
* Real-time updates
Cons:
* Open connections need to be maintained

---

# Stage 5

## Problems in Current Design
* Slow process
* No retry mechanism
* Email sending can fail
* Everything runs one by one

---

## Better Design
Use:
* Queue
* Worker
* Retry logic

---

## Flow
1. Save notification
2. Put task in queue
3. Worker sends email
4. Worker sends push notification
5. Retry if failed

---

## Should Email and Database Save Be Together?

No.First save in database.Then send email separately.This makes the system faster and more reliable.

---

## Pseudocode
```text
save_notification()
add_to_queue()
return success
```

Worker:
```text
take_task()
send_email()
if failed
    retry
```

---

# Stage 6

## Priority Logic

Priority is calculated using:
Priority Weight:
- Placement = 3
- Result = 2
- Event = 1

Final Score:
score = (typeWeight × 1000) + recencyScore

This ensures: Placement > Result > Event
while newer notifications are ranked higher within the same category.

## Efficient Top 10 Maintenance

Sorting all notifications repeatedly is expensive.

Instead, maintain a Min Heap of size 10.

When a new notification arrives:

1. Calculate score.
2. If heap size < 10, insert.
3. Else compare with heap root.
4. Replace root if new score is higher.

Complexity:
Insert: O(log 10)
Memory: O(10)

This allows efficient maintenance of the top 10 notifications even when millions of notifications arrive.





