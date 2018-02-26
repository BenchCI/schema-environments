# Environments Spec

## Data Structure & File Format

Environments files are required to be saved in `UTF-8` encoding, other encodings are forbidden. Allowed formats are limited to [`JSON`][json] & [`YAML`][yaml].

Summary of Bench object types:

- [environments.json](#environmentsjson)
  - [environments](#environments)
    - [name](#environment)
    - [architecture](#environment)
    - [cpu](#environment)
    - [memory](#environment)
    - [disk](#disk)
    - [os](#os)
    - [env](#environment)

### File Naming

Acceptable file name must match the following pattern:

```regex
\.?environments(?:rc)?\.?(?:json|yaml|yml)?
```

###### Example

- [`.environmentsrc`](#json-example)
- [`environments.json`](#json-example)
- [`.environments.yml`](#yaml-example)

---

## `environments.json`

```json
{
  "version": "1.0.0",
  "environments": []
}
```

name             | type     | required | default | description                                    
---------------- | -------- | -------- | ------- | -----------------------------------------------
**version**      | `String` | ✔        | `-`     | Spec version. Format must follow [semver][]    
**environments** | `Array`  | ✖        | `-`     | An array of [Environment](#environment) Objects

### Environment

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
**env**          | `Map`     | ✖        | `-`     | Environmental variables                        

### Disk

Disk & Filesystem configuration

```json
{
  "size": 100,
  "class": "ssd",
  "filesystem": "tmpfs"
}
```

name           | type      | required | default | description                                           
-------------- | --------- | -------- | ------- | ------------------------------------------------------
**size**       | `Integer` | ✖        | `100`   | Size of disk in _(in Megabytes)_                      
**class**      | `String`  | ✖        | `ssd`   | Class of disk _[`hdd`, `ssd`, `sshd`]_                
**filesystem** | `String`  | ✖        | `tmpfs` | disk file system format _([see below](#file-systems))_

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

### OS

Operating System Configuration

```json
{
  "name": "ubuntu",
  "version": "16.04"
}
```

name        | type     | required | default | description             
----------- | -------- | -------- | ------- | ------------------------
**name**    | `String` | ✔        | `-`     | Operating System name   
**version** | `String` | ✔        | `-`     | Operating System version

---

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

[json]: https://www.json.org/
[semver]: https://semver.org
[yaml]: http://www.yaml.org/
