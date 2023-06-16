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

### Zip encrypted
```
zip -er ensrc.zip src
```

### Generage rsa keys
https://www.cnblogs.com/cocoajin/p/10510574.html

https://polarssl.org/kb/cryptography/asn1-key-structures-in-der-and-pem/

Reference https://www.digicert.com/kb/ssl-support/openssl-quick-reference-guide.htm
```
# get private key
openssl genrsa -out yourdomain.key 2048

# display private key info
openssl rsa -text -in yourdomain.key -noout
# to pem format
private wudi$ openssl rsa -in modeling.key -text > modeling.pem

# PKCS1 =》 PKCS8
openssl pkcs8 -topk8 -inform PEM -in private.key -outform pem -nocrypt -out pkcs8.key

# get public key
openssl rsa -in yourdomain.key -pubout -out yourdomain_public.key
```

### Generate ecdsa keys
Reference https://www.scottbrady91.com/openssl/creating-elliptical-curve-keys-using-openssl
```
# find your curve
openssl ecparam -list_curves

# generate a private key for a curve
openssl ecparam -name prime256v1 -genkey -noout -out ecdsa-private.pem

# generate corresponding public key
openssl ec -in ecdsa-private.pem -pubout -out ecdsa-public.pem

# optional: create a self-signed certificate
openssl req -new -x509 -key private-key.pem -out cert.pem -days 360

# optional: convert pem to pfx
openssl pkcs12 -export -inkey private-key.pem -in cert.pem -out cert.pfx
```