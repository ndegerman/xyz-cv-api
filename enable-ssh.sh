# !/bin/sh
mkdir -p "$HOME/.ssh"
echo -e $PRIVATE_SSH_KEY >> $HOME/.ssh/id_rsa
