# ER図

erDiagram
    users {
        INTEGER id PK
        TEXT email
        TEXT password
        TEXT username
        TEXT avatar_url
    }
    todos {
        INTEGER id PK
        INTEGER user_id FK
        TEXT title
        TEXT status
        TEXT checkboxes
    }
    kanban_config {
        INTEGER id PK
        INTEGER user_id FK
        TEXT config
    }
    users ||--o{ todos : creates
    users ||--o| kanban_config : has

    