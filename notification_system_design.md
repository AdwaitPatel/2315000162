# Stage 1

## REST API Design

### Get Notifications

```http
GET /api/notifications
```

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

Response:

```json
{
  "notifications": [
    {
      "id": "123",
      "type": "Placement",
      "message": "Google Hiring",
      "isRead": false,
      "createdAt": "2026-04-22T17:51:30Z"
    }
  ]
}
```

---

### Mark Notification as Read

```http
PATCH /api/notifications/{id}/read
```

Response:

```json
{
  "message": "Notification marked as read"
}
```

---

### Mark All Notifications as Read

```http
PATCH /api/notifications/read-all
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
POST /api/notifications
```

Request:

```json
{
  "type": "Placement",
  "message": "Amazon Hiring"
}
```

Response:

```json
{
  "message": "Notification created"
}
```

---

### Delete Notification

```http
DELETE /api/notifications/{id}
```

Response:

```json
{
  "message": "Notification deleted"
}
```

---

## Real-Time Notification Mechanism

Use WebSockets (Socket.IO).

Flow:

1. Notification created
2. Saved in DB
3. Event published
4. Connected students receive notification instantly

Benefits:

* Real-time delivery
* Reduced polling
* Better scalability

---
