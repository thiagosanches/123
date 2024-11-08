# VeraCrypt-Mounter

> [!IMPORTANT]
> Work in progress!

This tool is designed to assist with mounting encrypted disks using VeraCrypt. Imagine the following scenario: you have configured your home server and manually mount the VeraCrypt device, as it's not secure to hard-code the password in an initialization script or bash script for automatic mounting. This is because others with access to your server may be able to view the password you use for VeraCrypt. 

However, it can be inconvenient when your server restarts due to a power outage or for any other reason, requiring you to log in and remount the device manually.

With this tool, you'll still need to perform some manual steps, but it allows you to partially automate the mounting process without hard-coding sensitive information, such as VeraCrypt passwords. Instead, it utilizes AWS SSM parameters to securely store and retrieve the necessary credentials.

Additionally, to further enhance security, the tool requires a Multi-Factor Authentication (MFA) token to retrieve the secret password stored in the AWS SSM parameter. Once authenticated, the tool can fetch the necessary secret and proceed with the mounting process.

![image](https://github.com/user-attachments/assets/dc767590-79e9-411c-9818-777d758e47cc)

## How to use it?

You can follow the steps below:

## Clone the repository

```bash
git clone https://github.com/thiagosanches/veracrypt-mounter.git
cd veracrypt-mounter
```

## Configure the application

Create the following file, named `config.json`, with the structure below:

```json
{
    "device": "/dev/sda1",
    "mountPoint": "/media/external",
    "parameterName": "veracrypt-xxx-volume-ssd-1tb",
    "region": "us-east-1",
    "roleArn": "arn:aws:iam::xxx:role/veracrypt-ssm-reader",
    "mfaDevices": [
        "arn:aws:iam::xxx:mfa/phone1",
        "arn:aws:iam::xxx:mfa/phone2"
    ],
    "runAfter": "cd ~/photoprism && docker compose restart"
}
```
## Update and copy the service file so systemd can manage it!

> [!TIP]
> Please check the path folders there.
> The current values are just examples.

```bash
sudo cp veracrypt-mounter.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start veracrypt-mounter
```
You should be good now 🥳! 
