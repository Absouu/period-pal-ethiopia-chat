
# Period Pal Ethiopia Chat

A comprehensive application for menstrual health education and cycle tracking.

## Database Setup

This application requires a Supabase database with the following tables:

### Cycles Table

The cycles table stores menstrual cycle data for each user. It has been set up in your Supabase database.

### Schema Updates

If you need to add the mood column to your database, run the following SQL:

```sql
ALTER TABLE public.cycles ADD COLUMN mood TEXT;
```

## Features

- Menstrual cycle tracking and prediction
- Period visualization on interactive calendar
- Educational content on menstrual health
- Secure user authentication
- Personalized cycle insights
- Lily Pad integration for period products
- Mood tracking for each cycle
- External learning resources
