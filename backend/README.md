# Backend

The backend is an Express application that is running on port 8081. It is
served by the `backend` container, and runs in development mode by default.

This container also watches the host's file system's `./src` folder for
changes, and will automatically rebuild the Lambda's source code when changes
are detected.

Note that the `backend` container's functionality is provided by Serverless,
and there will be a delay between a change being made and Serverless clearing
its internal cache. This means that you may need to restart the container
after making changes to the Lambda's source code.
