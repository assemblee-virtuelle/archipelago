# Resources permissions

New resources created have permissions by default for anonymous users, auuthenticated users, and resource creator.

Default permissions are summarized in the following table:

| Users               | Read permission | Write permission | Control permission
|---------------------|-----------------|------------------|-------------------
| Anonymous users     | true            | false            | false
| Authenticated users | true            | false            | false
| Resource creator    | true            | true             | true

If you want to change these permissions, you can define the following environment variables for the middleware:

- `SEMAPPS_RESOURCESPERMISSIONS_ANON_READ`: false/true for anonymous users read permissions
- `SEMAPPS_RESOURCESPERMISSIONS_ANYUSER_READ`: false/true for authenticated users read permissions
- `SEMAPPS_RESOURCESPERMISSIONS_ANYUSER_WRITE`: false/true for authenticated users write permissions

Resource creator permissions cannot be modified, as well as control permissions.
