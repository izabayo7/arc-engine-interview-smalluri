# Frontend

The frontend is a ReactJS application that is running on port 8080. It is
served by the `frontend` container, and runs in development mode by default.

This container also watches the host's file system's `./src` folder for
changes, and will automatically rebuild the UI when changes are detected.
