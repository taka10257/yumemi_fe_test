/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // MEMO:
  //  pages配下は強制的にbuildされてしまうようなので、テストファイルはルーティングでリダイレクトするようにする
  // 参考:
  //  https://techblg.app/articles/nextjs-routing-exclude/
  //  https://nextjs.org/docs/api-reference/next.config.js/redirects#regex-path-matching
  async redirects() {
    return [
      {
        source: '/(.*)spec',
        destination: '/404',
        permanent: false,
      },
    ]
  },
}
