### File Descriptor
`ls /proc/<pid>/fd` get opened fd of process  
`lsof file` Get processes which use current file  
> File structure relationship
> https://users.cs.jmu.edu/bernstdh/web/common/lectures/summary_unix_file-descriptors.php

### create .gz file without deleting raw file recursively
gzip -k -r dir

### crete a new ssh certificate
1. Use `ssh-keygen` to create private key.
2. Copy the public key and append the key to the $HOME/.ssh/authorized_keys file in your home directory on the remote host.

### Login mysql
```
mysql --host=localhost --user=root --password
```

### Restart Apache
```
systemctl restart httpd
```

### Enable SSL on Amazon Linux 2

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html

### Trigger single by keyboard
`Ctrl+D (^D)` means end of file.\
`Ctrl+C` tells the terminal to send a SIGINT to the current foreground process

### Create SSL certificate for local test

```
 openssl genrsa -des3 -passout pass:password1 -out cert.pass.key 2048 && \
    openssl rsa -passin pass:password1 -in cert.pass.key -out cert.key && \
    rm cert.pass.key && \
    openssl req -new -key cert.key -out cert.csr \
        -subj "/C=US/ST=California/L=San Francisco/O=Example/OU=Example/CN=example.com" && \
    openssl x509 -req -days 365 -in cert.csr -signkey cert.key -out cert.crt
```

### Look up ip of domain

```
nslookup database-1.xxxxx.us-west-1.rds.amazonaws.com
```

### Test rds connection
```
nc -zv database-1.xxxxx.us-west-1.rds.amazonaws.com 3306
```