/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // config.module.rules.push([
    //   {
    //     test: /\.(ttf|otf|eot|woff|woff2)$/,
    //     use: [
    //       {
    //         loader: "file-loader",
    //         options: {
    //           name: "[name].[ext]",
    //           outputPath: "static/fonts/",
    //           publicPath: "/_next/static/fonts/",
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     test: /\.svg$/,
    //     use: ["@svgr/webpack"],
    //   },
    // ]);

    config.module.rules.push(
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/fonts/",
              publicPath: "/_next/static/fonts/",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      }
    );

    return config;
  },
};

export default nextConfig;
