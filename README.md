# Centralized Auth Server

This is an example of headless architecture where the API is slated to act as both a monilithic API and a centralized auth server. With this, you can get all the initial application setup established including getting auth setup. Whenever you want to create a new project, instead of starting anew, you can just add in a new set of queries and config for a new database in the database cluster, and write some new routes, and that's it!

A cool benefit of having your own centralized auth structure is that any account created for a specific app is a valid user for any additional applications extended upon this API.
