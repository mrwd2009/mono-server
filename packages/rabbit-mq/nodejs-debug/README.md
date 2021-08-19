### Set static ip on ubuntu

```bash
# get ethernet name
ip a
# change config file
vim /etc/netplan/03_enp0s8.yaml
# input yml content
  
```
```yml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s8:
      dhcp4: no
      addresses:
        - 192.168.0.250/24
      gateway4: 192.168.0.1
      nameservers:
        addresses: [192.168.1.1, 192.168.0.1]
```

