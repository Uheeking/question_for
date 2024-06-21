require("dotenv").config();
const withPlugins = require("next-compose-plugins");
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
});

const nextConfig = {
	reactStrictMode: true,
};
module.exports = withPlugins(
	[
		[
			withPWA,
			{
				pwa: {
					dest: "public",
				},
			},
		],
        [
            {
                typescriptLoaderOptions: {
                    transpileOnly: false,
                },
            }
        ],
        // ...
	],
	nextConfig
);