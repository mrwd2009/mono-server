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