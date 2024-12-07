# VeraCrypt-Mounter

This tool is designed to assist with mounting encrypted disks using VeraCrypt. Imagine the following scenario: you have configured your home server and manually mount the VeraCrypt device, as it's not secure to hard-code the password in an initialization script or bash script for automatic mounting. This is because others with access to your server may be able to view the password you use for VeraCrypt. 

![image](https://github.com/user-attachments/assets/dc767590-79e9-411c-9818-777d758e47cc)

With this tool, you'll still need to perform some manual steps, but it allows you to partially automate the mounting process without hard-coding sensitive information. Instead, it utilizes AWS SSM parameters to securely store and retrieve the necessary credentials. This tool requires a Multi-Factor Authentication (MFA) token to retrieve the secret password stored in the AWS SSM parameter. Once authenticated, the tool can fetch the necessary secret and proceed with the mounting process.

You can also configure any command after the mount command, allowing you to restart a Docker container that relies on the volume, for example.

## How to use it?

This project needs to run on the computer that has the necessary capabilities for mounting Veracrypt devices, allowing you to access and mount them remotely from your local network.

You can follow the steps below:

## Clone the repository

```bash
git clone https://github.com/thiagosanches/veracrypt-mounter.git
cd veracrypt-mounter
npm install
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
sudo systemctl enable veracrypt-mounter
sudo systemctl daemon-reload
sudo systemctl start veracrypt-mounter
```
You should be good now 🥳! 

## TODO

- Add the steps to prepare the AWS account to ensure the tool works properly.
