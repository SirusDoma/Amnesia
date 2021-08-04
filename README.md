# Amnesia #
Become amnesia and forget all your past.

- **Author**: SirusDoma
- **Email**: com@cxo2.me
- **Latest Version**: 1.0

## Summary ##

Did facebook memories remind you how shameless you're in the past?
Cringy posts and comments? shameless pose of your old pictures? Rest assured! Use Amnesia and *poof!* everything's gone.

Written under node.js and powered by [Puppeteer](https://github.com/GoogleChrome/puppeteer) for a single purpose: to forget all those good-for-nothing memories in the past.  

Since Facebook does not provide API / SDK to interact directly to your own posts, comments and photos, the app will crawl your shameless activities manually. You'll also need to provide your email, username and password in the environment file.

## Usage ##

1. Install [Node.JS](https://nodejs.org/)
2. Clone or download this repository
3. Run `npm install` in cloned repository directory
4. Rename `env.sample` into `.env` and fill `EMAIL`, `PROFILEID` (username) and `PASSWORD`
5. Run `node app.js <start year> <end year>`
    For example: `node app.js 2011 2015`

What it'll do:
1. Delete your post
2. Delete your comments
3. Delete your photos
4. Delete your notes
5. Unlike posts / photos you've liked before
6. Might delete everything else

What it **WON'T** do:
1. Delete posts / comments / photos that belongs to your friends
2. Delete your cringe message of your ex and friends
3. Untag you from posts that belongs to your friends
4. Unfriend people
5. Collect any single bit information of your profile

If you got some time, consider make a contribution by creating a PR.  
I'm too lazy to make post filter an such, so your PR will be very appreciated lol

## License ##

This is an open-sourced program licensed under the [MIT License](http://github.com/SirusDoma/Amnesia/blob/master/LICENSE)
