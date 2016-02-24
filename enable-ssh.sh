# !/bin/sh
mkdir -p "$HOME/.ssh"
echo -e $PRIVATE_SSH_KEY >> $HOME/.ssh/id_rsa
ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no adminuser@kush.softhouselabs.com 'cd ./xyz-cv-api/ && sudo bash build.sh'
