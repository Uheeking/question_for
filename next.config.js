const withPlugins = require("next-compose-plugins");
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
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