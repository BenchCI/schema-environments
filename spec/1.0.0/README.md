# Environments Spec

## Data Structure & File Format

Environments files are required to be saved in `UTF-8` encoding, other encodings are forbidden. Allowed formats are limited to [`JSON`][json] & [`YAML`][yaml].

### File Naming:

Acceptable file name must match the following pattern:

```regex
\.?environments(?:rc)?\.?(?:json|yaml|yml)?
```

###### Example

- `environments.json`
- `.environments.yml`
- `.environmentsrc`

###### YAML Example

> ```yml
> version: 1.0.0
>
> environments:
>   - name: my awesome linux
>     architecture: amd64
>     cpu: 2
>     memory: 16000
>     disk:
>       class: ssd
>       filesystem: tmpfs
>       size: 10000
>     os:
>       name: ubuntu
>       version: "16.04"
>     env:
>       NODE_ENV: production
> ```

###### JSON Example

> ```json
> {
>   "version": "1.0.0",
>   "environments": [
>     {
>       "name": "my awesome linux",
>       "architecture": "amd64",
>       "cpu": 2,
>       "memory": 16000,
>       "disk": {
>         "class": "ssd",
>         "filesystem": "tmpfs",
>         "size": 10000
>       },
>       "os": {
>         "name": "ubuntu",
>         "version": "16.04"
>       },
>       "env": {
>         "NODE_ENV": "production"
>       }
>     }
>   ]
> }
> ```

---

### version

The version of this spec your Environments file uses. Format must follow [semver][].

---

### environments

An array that contains at least one [`environment`](#environment) object.

---

### environment

```json
{
  "name": "my awesome linux",
  "architecture": "amd64",
  "cpu": 2,
  "memory": 16000,
  "disk": {},
  "os": {},
  "env": {
    "FOO": "bar"
  }
}
```

name             | type      | required | default | description                                    
---------------- | --------- | -------- | ------- | -----------------------------------------------
**name**         | `String`  | ✔        | `-`     | Name of the environment                        
**architecture** | `String`  | ✖        | `amd64` | CPU Architecture Identifier _[`amd64`, `i386`]_
**cpu**          | `Integer` | ✖        | `2`     | number of CPU cores                            
**memory**       | `Integer` | ✖        | `100`   | amount of system memory _(in Megabytes)_       
**disk**         | `Object`  | ✖        | `{}`    | a [`disk`](#disk) object                       
**os**           | `Object`  | ✔        | `-`     | an [`os`](#os) object                          
**environment**  | `Map`     | ✖        | `-`     | Environmental variables                        

---

### disk

Disk & Filesystem configuration

```json
{
  "size": 100,
  "class": "ssd",
  "filesystem": "tmpfs"
}
```

name       | Type      | required | default | Description                                           
---------- | --------- | -------- | ------- | ------------------------------------------------------
size       | `Integer` | ✖        | `100`   | Size of disk in _(in Megabytes)_                      
class      | `String`  | ✖        | `ssd`   | Class of disk _[`hdd`, `ssd`, `sshd`]_                
filesystem | `String`  | ✖        | `tmpfs` | disk file system format _([see below](#file-systems))_

#### File Systems

id      | description                
------- | ---------------------------
`apfs`  | Apple File System          
`ext2`  | second extended filesystem 
`ext3`  | third extended filesystem  
`ext4`  | fourth extended filesystem 
`fat16` | File Allocation Table (FAT)
`fat32` | File Allocation Table (FAT)
`ntfs`  | New Technology File System 
`tmpfs` | Temporary file storage     

---

### os

Operating System Configuration

```json
{
  "name": "ubuntu",
  "version": "16.04"
}
```

name    | Type     | required | default | Description             
------- | -------- | -------- | ------- | ------------------------
name    | `String` | ✔        | `-`     | Operating System name   
version | `String` | ✔        | `-`     | Operating System version

---

[json]: https://www.json.org/

[semver]: https://semver.org

[yaml]: http://www.yaml.org/
