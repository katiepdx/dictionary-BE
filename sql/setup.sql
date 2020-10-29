DROP TABLE IF EXISTS words;

CREATE TABLE words (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  word TEXT NOT NULL,
  word_language TEXT NOT NULL,
  word_translation TEXT,
  word_definition TEXT NOT NULL,
  example_sentence TEXT NOT NULL,
  notes TEXT
);
