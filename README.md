# VeraCrypt-Mounter

This tool is designed to assist with mounting encrypted disks using VeraCrypt. Imagine the following scenario: you have configured your home server and manually mount the VeraCrypt device, as it's not secure to hard-code the password in an initialization script or bash script for automatic mounting. This is because others with access to your server may be able to view the password you use for VeraCrypt. 

However, it can be inconvenient when your server restarts due to a power outage or for any other reason, requiring you to log in and remount the device manually.

With this tool, you'll still need to perform some manual steps, but it allows you to partially automate the mounting process without hard-coding sensitive information, such as VeraCrypt passwords. Instead, it utilizes AWS SSM parameters to securely store and retrieve the necessary credentials.

Additionally, to further enhance security, the tool requires a Multi-Factor Authentication (MFA) token to retrieve the secret password stored in the AWS SSM parameter. Once authenticated, the tool can fetch the necessary secret and proceed with the mounting process.

![image](https://github.com/user-attachments/assets/dc767590-79e9-411c-9818-777d758e47cc)
