/*
  # Create comments table for Star Wars content

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `content_type` (text) - either 'character' or 'movie'
      - `content_id` (text) - the SWAPI ID of the character or movie
      - `user_id` (uuid) - references auth.users
      - `comment` (text) - the comment content
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `comments` table
    - Add policies for:
      - Anyone can read comments
      - Authenticated users can create comments
      - Users can update/delete their own comments
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL CHECK (content_type IN ('character', 'movie')),
  content_id text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read comments
CREATE POLICY "Comments are viewable by everyone"
  ON comments
  FOR SELECT
  USING (true);

-- Allow authenticated users to create comments
CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own comments
CREATE POLICY "Users can update their own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own comments
CREATE POLICY "Users can delete their own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);