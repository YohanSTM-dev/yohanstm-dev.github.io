# Data Model

**users**
- `uid` string
- `email` string
- `displayName` string
- `photoUrl` string
- `createdAt` timestamp

**goals**
- `id` string
- `title` string
- `description` string
- `type` string: `personal` | `group`
- `creatorId` string
- `participantIds` list string
- `frequency` string: `daily` | `weekly` | `once`
- `deadline` timestamp
- `isCompleted` bool

**goals/{goalId}/progress_logs**
- `goalId` string
- `userId` string
- `date` timestamp (debut de periode: jour/semaine, pour `once` date de validation)
- `status` string: `done` | `skipped`
