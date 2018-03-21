# Keeper Server

A simple node server for creating, deleting and updating goals in the Keeper app.

## Methods

### get /api/goals
List all the active goals.

Example response:
```
[
  {
    "id": 1,
    "title": "Make 1 billion dollars",
    "cards": [
      1,
      2,
      3,
      4
    ],
    "active": true,
    "createdAt": "2018-03-21T13:07:38.585Z",
    "updatedAt": "2018-03-21T13:54:03.365Z"
  }
]
```

### post /api/goals
Create a new goal.

Example request:
```
{
  title: 'Buy a hotel in Mayfair'
}
```

Example response:
```
{
    "id": 2,
    "title": "Buy a hotel in Mayfair",
    "active": true,
    "updatedAt": "2018-03-21T14:32:13.878Z",
    "createdAt": "2018-03-21T14:32:13.878Z",
    "cards": null
}
```

### put /api/goals/:goalId
Update an existing goal.

Example request:
```
{
  cards: [3,4,5]
}
```

Example response:
```
{
    "id": 2,
    "title": "Buy a hotel in Mayfair",
    "active": true,
    "cards": [
      3,
      4,
      5
    ],
    "updatedAt": "2018-03-21T14:32:13.878Z",
    "createdAt": "2018-03-21T14:32:13.878Z",
}
```

### delete /api/goals/:goalId
Delete an existing goal

Returns a 204 No Content