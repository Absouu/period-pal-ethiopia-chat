
# Period Pal Ethiopia Chat

A comprehensive application for menstrual health education and cycle tracking.

## Database Setup

This application requires a Supabase database with the following tables:

### Cycles Table

The cycles table stores menstrual cycle data for each user. Create it using the SQL commands in `src/migrations/createCyclesTable.sql`.

To set up your database:

1. Connect your Lovable project to Supabase using the green Supabase button in the top right
2. Open the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `src/migrations/createCyclesTable.sql`
4. Run the SQL commands to create the table and security policies

## Features

- Menstrual cycle tracking and prediction
- Period visualization on interactive calendar
- Educational content on menstrual health
- Secure user authentication
- Personalized cycle insights
