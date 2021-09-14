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