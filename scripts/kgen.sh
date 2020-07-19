#!/bin/bash
# generates public private key pair
openssl genrsa -out ../server/private.key 2048
openssl rsa -in ../server/private.key -pubout -out ../server/key.pub
