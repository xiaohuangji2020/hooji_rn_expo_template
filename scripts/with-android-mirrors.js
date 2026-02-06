const { withProjectBuildGradle } = require("@expo/config-plugins");

const withAliyunMaven = (config) => {
  return withProjectBuildGradle(config, (config) => {
    const buildGradle = config.modResults.contents;

    // 定义要插入的阿里云镜像代码块
    const aliyunRepos = `
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    `;

    // 检查是否已经存在，防止重复添加
    if (buildGradle.includes("maven.aliyun.com")) {
      return config;
    }

    // 正则替换：找到 repositories { 并在其后插入阿里云镜像
    // 这样做的好处是它会同时作用于 buildscript 和 allprojects 块
    const newBuildGradle = buildGradle.replace(/repositories \s?\{/g, `repositories {\n${aliyunRepos}`);

    config.modResults.contents = newBuildGradle;
    return config;
  });
};

module.exports = withAliyunMaven;
