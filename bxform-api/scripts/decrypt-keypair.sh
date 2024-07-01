#!/bin/bash

# This uses gpg to encrypt every file in a directory as separate
# encrypted files

# Usage
# ./encrypt-all.sh "PASSPHRASE"

FILES="./keypair"
PASSPHRASE="$1"

# Check if the password argument is provided
if [[ -z "$PASSPHRASE" ]]; then
  echo "Please provide a PASSPHRASE."
  exit 1
fi

pushd $FILES

for file_name in ./*.enc; do
  enc_name="$file_name"
  enc_file="${enc_name%.enc}"

  echo "⏳ Decrypting... $file_name"

  gpg \
    --decrypt \
    --batch \
    --passphrase "$PASSPHRASE" \
    "$file_name" \
    > "$enc_file"

  echo "✅ Decrypted: $enc_file"
done

popd