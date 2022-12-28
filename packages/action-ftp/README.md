# Action FTP

GitHub action to deploy files and directories with different transfer options and support for different protocols such as FTP, FTPS, SFTP.

## Inputs

| Input         	| Description                                                                                                        	| Required 	| Default 	|
|---------------	|--------------------------------------------------------------------------------------------------------------------	|----------	|---------	|
| protocol      	| Protocol for the ftp connection could be either ftp, ftps or sftp                                                  	| no       	| ftp     	|
| passive       	| Passive mode for ftp, default is true                                                                              	| no       	| true    	|
| verbose       	| Verbose mode for ftp, default is false                                                                             	| no       	| false   	|
| **host**      	| The address of the ftp server                                                                                      	| **yes**  	|         	|
| port          	| Port of the ftp server, default is 21                                                                              	| no       	| 21      	|
| **username**  	| Username to use for the ftp server                                                                                 	| **yes**  	|         	|
| password      	| Password or passphrase depending on the auth type (password or ssh key)                                            	| no       	|         	|
| private_key   	| String for the private SSH key when doing SFTP, if the key has a passphrase you must pass it in the password field 	| no       	|         	|
| local_root    	| Local path to use as base for all operations                                                                       	| no       	| .       	|
| remote_root   	| Remote server path to use as base for all operations                                                               	| no       	| .       	|
| **transfers** 	| Array of transfer options that should be transfered to the remote server                                           	| **yes**  	|         	|

## Transfer options
----

The benefit of using this action is that it allows defining custom options for each transfer individually, leading to unique customization that no other action offers. To be able to do that you should define certain properties as stated below.

- **local_path**: This property is a path or pattern that will match a directory or file(s) from the `local_root` property. Anything that matches this is selected as candidate to be uploaded to the `remote_path`.
- **remote_path**: This property is a path that always will be a directory, if it doesn't exists it will be created to be able to place the files in here.
- **overwrite**: The overwrite policy for the files that are going to be uploaded, it can be either `skip`, `newer`, `different` or `always`.
- **permissions**: Array or permissions to apply to the files/folders that are uploaded, this allow granular control over the permissions of the uploads.
  - **path**: Path to apply the permissions to, this can be a file or a directory or a pattern.
  - **type**: Type of path to apply the permissions to, this allows to apply the permissions specifically to `file`, `directory` or `all`.
  - **mode**: The numeric mode to apply to the path, this can be a string or a number.
  - **recursive**: If the permissions should be applied recursively to the path, this is only valid for directories.

## Example workflow
-----