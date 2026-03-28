const cssnano = require("cssnano");

module.exports = (ctx = {}) => ({
  plugins: [
    require("postcss-import"),
    require("tailwindcss")({
      config: "./tailwind.config.cjs",
    }),
    require("autoprefixer"),
    ...(ctx.env === "production"
      ? [
          cssnano({
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          }),
        ]
      : []),
  ],
});
