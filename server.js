const childProcess = require('child_process');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.json');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/mount', function (req, res) {
    const bashCommand = `eval $(aws sts assume-role --duration-seconds 900 --role-arn "${config.roleArn}" --role-session-name "veracrypt-mounter-$(date +%s%3N)" --token-code "${req.body.mfaToken}" --serial-number "${req.body.mfaDevice}" | jq '"export AWS_ACCESS_KEY_ID=" + .Credentials.AccessKeyId + "; export AWS_SECRET_ACCESS_KEY=" + .Credentials.SecretAccessKey + "; export AWS_SESSION_TOKEN=" + .Credentials.SessionToken' --raw-output); 
    
    MY_SECRET=$(aws ssm get-parameter --name "${config.parameterName}" --with-decryption --region "${config.region}" | jq '.Parameter.Value' --raw-output)
    veracrypt --text ${config.device} --mount ${config.mountPoint} --password="$MY_SECRET" --non-interactive
    ${config.runAfter}`;

    childProcess.exec(bashCommand, (error, stdout, stderr) => {
        if (stderr || error) {
            const errorMessage = `stderr: ${stderr}<br/><br/>error: ${error}`
            res.status(500).send(errorMessage);
        }
        else
            res.send(`Your VeraCrypt device should now be properly mounted. ${stdout}`);
    })

})

app.listen(3001)
