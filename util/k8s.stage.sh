#!/bin/bash

scp k8s.yml picocluster@pc0:/home/picocluster/Projects/sthinds.io/
ssh picocluster@pc0 'cd Projects/sthinds.io && kubectl apply -f k8s.yml'