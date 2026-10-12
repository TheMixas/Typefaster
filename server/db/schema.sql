-- Typefaster schema. Reconstructed from the queries in db/*.js.
-- Idempotent: safe to run on every startup (see db/migrate.js).

CREATE TABLE IF NOT EXISTS users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(50)  NOT NULL UNIQUE,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,           -- bcrypt hash
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    text_theme       VARCHAR(64) NOT NULL,
    is_single_player BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_stats (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    game_id       INT       NOT NULL,
    user_id       INT       NOT NULL,
    user_position INT       NOT NULL,
    user_wpm      FLOAT     NOT NULL,
    user_accuracy FLOAT     NOT NULL DEFAULT 0,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_game_stats_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
    CONSTRAINT fk_game_stats_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_game_stats_user (user_id)
);
