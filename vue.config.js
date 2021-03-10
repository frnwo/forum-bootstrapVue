// 这个文件里的配置会导出并和其他公共配置合并
module.exports={
  configureWebpack:{
    resolve:{
      //默认已经配置好了，所以不需要再配置文件后缀名的省略
      // extensions:['js','css','json'],

      //给文件夹起别名
      alias:{
        //默认已经配置好了'@'
        // '@':'src',
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        //不需要，因为router只在main.js用了一次
        // 'router':'@/router',
        //也不需要给store起别名，因为到时候所有组件都可以通过this.$store,this.$router取出
      }
    }
  }
}

