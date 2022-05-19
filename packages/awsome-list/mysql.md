### Login mysql
```
mysql --host=localhost --user=root --password
```

### Enable sql log
```SQL
# Enable config
SET global general_log = 1;
SET global log_output = 'table';

# Query log
SELECT * FROM mysql.general_log;

# Disable config
SET global general_log = 0;

```

### Create user and grant permissions

Reference: https://phoenixnap.com/kb/how-to-create-new-mysql-user-account-grant-privileges

```
CREATE USER 'username'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON database_name.* TO 'database_user'@'%';
```

### Import sql file
```
mysql -u username -p database_name < file.sql
```