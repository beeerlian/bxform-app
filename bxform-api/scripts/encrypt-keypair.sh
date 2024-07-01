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
  if [[ "$file_name" == *.enc ]]; then
    echo "🚫 Removing old enc file... $file_name"
    rm "$file_name"
  fi
done

for file_name in ./*.pem; do
  # Check if the file has the .enc extension and skip it if true
  if [[ "$file_name" == *.enc ]]; then
    continue
  fi

  enc_name="$file_name.enc"

  echo "⏳ Encrypting... $file_name"

  gpg \
    --passphrase "$PASSPHRASE" \
    --batch \
    --output "$file_name.enc" \
    --symmetric \
    --cipher-algo AES256 \
    "$file_name"

  echo "✅ Encrypted: $enc_name"
done

popd