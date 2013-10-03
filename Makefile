MOCHA_OPTS= --check-leaks
REPORTER = Spec

CUR_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

test: 
	@NODE_ENV=test $(CUR_DIR)node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)
		
.PHONY: test