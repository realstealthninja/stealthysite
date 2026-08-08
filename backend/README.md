# Backend

This backend is written in Java21, using a framework called springboot.
For building the gradle build system is used.

## Database

This project currently uses PostgreSQL as it's database.

### ER diagram

The following is the ER diagram used for the blogging part of the project.

```mermaid
erDiagram
title: ER diagram for blogging
User ||--|{ Blog : posts
User ||--|{ Comment : writes

    Comment }|--|| Blog : on

    User {
        UUID id
        string username
        string firstname
        string lastname
        string email
        string password

        timestamp created_on
        timestamp updated_on

    }

    Blog {
        UUID id
        string title
        string content

        timestamp created_on
        timestamp updated_on
    }

    Comment {
        UUID id
        string content
        timestamp created_on
        timestamp updated_on
    }
```
