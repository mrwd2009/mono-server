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

### Get database size
```
SELECT table_name AS "Table",
ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "cfex_user_center"
ORDER BY (data_length + index_length) DESC;
```

### Show and delete permissions
```
show grants for mtui;

revoke all on model_dev.* from 'mtui'@'%';
revoke all on model_dev_gateway.* from 'mtui'@'%';

```

### Record executed sql
```
SET global general_log = 1;
SET global log_output = 'table';


SELECT
    *
FROM
    mysql.general_log;
    
SET global general_log = 0;
```