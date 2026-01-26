const { withProjectBuildGradle } = require('@expo/config-plugins');

// 这个插件会自动修改 android/build.gradle
module.exports = (config) => {
  return withProjectBuildGradle(config, (config) => {
    const aliyunMirrors = `
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'https://maven.aliyun.com/repository/public' }
    `;

    // 找到 repositories 并在里面插入镜像地址
    if (!config.modResults.contents.includes('maven.aliyun.com')) {
      config.modResults.contents = config.modResults.contents.replace(
        /repositories\s*\{/g,
        `repositories {\n${aliyunMirrors}`
      );
    }
    return config;
  });
};