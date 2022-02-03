#!/bin/bash

test() {
	test_server
	test_client
}

#========== Server ==========#

test_server() {
	echo "Running Server Tests"
	test_server_unit
	test_server_integration
	test_server_e2e
}

test_server_unit() {
	echo "Running Server Unit Tests"
	cd ./server
	npm run test:unit
	cd ../
}

test_server_integration() {
	echo "Running Server Integration Tests"
	# TODO:
}

test_server_e2e() {
	echo "Running Server e2e Tests"
	cd ./server 
	npm run test:e2e
	cd ../
}

#========== client ==========#

test_client() {
	echo "Running Client Tests"
	test_client_unit
	test_client_integration
	test_client_e2e
}

test_client_unit() {
	echo "Running Client Unit Tests"
	cd ./client
	react-scripts test --watchAll=false
	cd ../
}

test_client_integration() {
	echo "Running Client Integration Tests"
	# TODO:
}

test_client_e2e() {
	echo "Running Client e2e Tests"
	# TODO:
}

if (( "$#" == 0 ));
then
	test
fi

$1 "${@:2}"